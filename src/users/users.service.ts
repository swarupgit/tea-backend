import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtPayload } from '../auth/jwt-payload';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { PasswordDto } from './dto/password.dto';
import { ProfileDto } from './dto/profile.dto';
import { AuthCredentialsDto } from 'src/auth/dto/auth-credentials.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async findByPayload({ mobile }: JwtPayload): Promise<User> {
    return await this.userModel.findOne({ mobile: mobile });
  }

  async create(createUserDto: CreateUserDto) {
    let user = null;
    let message = 'User created successfully.';
    const criteria = {
      mobile: createUserDto.mobile,
    };
    const existingItem = await this.userModel.findOne(criteria);
    if (existingItem && existingItem?._id) {
      message = 'Mobile no already associated with other user.';
    } else {
      user = await this.userModel.create(createUserDto);
    }

    return {
      message,
      result: user,
    };
  }

  async findUserByCredentials({
    username,
    password,
    role,
  }: AuthCredentialsDto): Promise<User> {
    if (!username && !password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const user = await this.userModel
      .findOne({ mobile: username, active: true })
      .select({ password: true, mobile: true, email: true, role: true });

    role = JSON.parse(role);

    if (!user || !role.includes(user.role)) {
      throw new UnauthorizedException('Invalid user');
    }

    // compare passwords
    const areEqual = await this.correctPassword(user.password, password);

    if (!areEqual) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  async changePassword(passwordDto: PasswordDto, user: User) {
    user.password = passwordDto.password;
    await user.save({ validateBeforeSave: false });

    return { message: 'Password updated successfully' };
  }

  async updateProfile(profileDto: ProfileDto, user: User) {
    user.name = profileDto.name;
    await user.save({ validateBeforeSave: false });

    return { message: 'Profile updated successfully', result: user };
  }

  async correctPassword(
    candidatePassword: string,
    userPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(userPassword, candidatePassword);
  }
}
