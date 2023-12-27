import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class ProfileDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  name: string;
}
