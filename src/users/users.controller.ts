import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { PasswordDto } from './dto/password.dto';
import { ProfileDto } from './dto/profile.dto';
import { UsersService } from './users.service';

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

  @Post('/change-password')
  changePassword(@Body() passwordDto: PasswordDto, @Request() request) {
    const { user } = request;
    return this.usersService.changePassword(passwordDto, user);
  }

  @Post('/update-profile')
  updateProfile(@Body() profileDto: ProfileDto, @Request() request) {
    const { user } = request;
    return this.usersService.updateProfile(profileDto, user);
  }
}
