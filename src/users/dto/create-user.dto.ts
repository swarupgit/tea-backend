import { IsEmail, IsNotEmpty, IsOptional, Length, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    name: string;

    @IsOptional()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @Length(10)
    mobile: string;

    @IsOptional()
    address: string;

    @IsNotEmpty()
    role: string;

    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(20)
    password: string;
}
