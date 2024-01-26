import { IsNotEmpty, MinLength } from 'class-validator';
import { IsEqualTo } from '../../common/decorators/is-equal-to.decorator';

export class PasswordDto {
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsNotEmpty()
  @IsEqualTo('password')
  confirmPassword: string;
}
