import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCustomerDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  mobile: string;

  @IsNotEmpty()
  address: string;

  @IsOptional()
  email: string;

  @IsOptional()
  isDeleted: boolean;
}
