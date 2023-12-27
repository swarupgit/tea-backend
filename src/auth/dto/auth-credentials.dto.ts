import { IsNotEmpty, IsOptional } from 'class-validator';

export class AuthCredentialsDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

  @IsOptional()
  role: string;
}
