import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePaymentDto {
  @IsNotEmpty()
  payNo: string;

  @IsOptional()
  transactionDate: Date;

  @IsNotEmpty()
  name: string;

  @IsOptional()
  payType: string;

  @IsOptional()
  debitAmount: string;

  @IsOptional()
  creditAmount: string;

  @IsNotEmpty()
  payBy: string;

  @IsOptional()
  note: string;

  @IsOptional()
  isDeleted: boolean;
}
