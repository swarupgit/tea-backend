import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  code: string;

  @IsNotEmpty()
  name: string;

  @IsOptional()
  part_no: string;

  @IsNotEmpty()
  price: string;

  @IsNotEmpty()
  stock: number;

  @IsNotEmpty()
  unit: string;

  @IsOptional()
  location: string;

  @IsOptional()
  category: string;
}
