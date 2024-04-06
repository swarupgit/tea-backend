import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePaymentDto {
  @IsNotEmpty()
  payNo: string;

  @IsOptional()
  transactionDate: Date;

  @IsNotEmpty()
  openingBalance: string;

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

  @IsNotEmpty()
  payNote: string;

  @IsOptional()
  note: string;

  @IsOptional()
  isDeleted: boolean;
}
