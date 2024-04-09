import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePaymentDto {
  @IsNotEmpty()
  payNo: string;

  @IsOptional()
  transactionDate: Date;

  @IsOptional()
  openingBalance: string;

  @IsNotEmpty()
  name: string;

  @IsOptional()
  payType: string;

  @IsOptional()
  debitAmount: string;

  @IsOptional()
  creditAmount: string;

  @IsOptional()
  payBy: string;

  @IsOptional()
  payNote: string;

  @IsOptional()
  note: string;

  @IsOptional()
  isDeleted: boolean;
}
