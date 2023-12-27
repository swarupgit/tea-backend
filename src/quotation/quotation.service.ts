import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateQuotationDto } from './dto/create-quotation.dto';
import { UpdateQuotationDto } from './dto/update-quotation.dto';
import { Quotation } from './entities/quotation.entity';

@Injectable()
export class QuotationService {
  constructor(
    @InjectModel(Quotation.name)
    private readonly quotationModel: Model<Quotation>,
  ) {}

  async create(createQuotationDto: CreateQuotationDto) {
    return await this.quotationModel.create(createQuotationDto);
  }

  async findAll() {
    return await this.quotationModel.find({ isDeleted: false });
  }

  async findOne(id: string) {
    return await this.quotationModel.findOne({ isDeleted: false, _id: id });
  }

  update(id: number, updateQuotationDto: UpdateQuotationDto) {
    return `This action updates a #${id} quotation`;
  }

  remove(id: number) {
    return `This action removes a #${id} quotation`;
  }
}
