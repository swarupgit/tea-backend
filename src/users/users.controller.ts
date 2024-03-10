import { Body, Controller, Get, HttpCode, Post, Request } from '@nestjs/common';
import { PasswordDto } from './dto/password.dto';
import { ProfileDto } from './dto/profile.dto';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/my-info')
  findMe(@Request() request) {
    return {
      message: 'User retrieved successfully',
      result: request.user,
    };
  }

  @Public()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @HttpCode(200)
  @Post('/change-password')
  changePassword(@Body() passwordDto: PasswordDto, @Request() request) {
    const { user } = request;
    return this.usersService.changePassword(passwordDto, user);
  }

  @HttpCode(200)
  @Post('/update-profile')
  updateProfile(@Body() profileDto: ProfileDto, @Request() request) {
    const { user } = request;
    return this.usersService.updateProfile(profileDto, user);
  }
}
