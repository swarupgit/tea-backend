import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  invoiceNo: string;

  @IsOptional()
  type: string;

  @IsOptional()
  vchNo: string;

  @IsOptional()
  clNo: string;

  @IsOptional()
  netLeafKgs: string;

  @IsOptional()
  qlty: string;

  @IsOptional()
  rateKg: string;

  @IsOptional()
  debitAmount: string;

  @IsOptional()
  creditAmount: string;

  @IsNotEmpty()
  customerId: string;

  @IsOptional()
  note: string;

  @IsOptional()
  isDeleted: boolean;
}
