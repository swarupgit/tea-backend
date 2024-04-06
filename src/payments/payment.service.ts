import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Payment } from './entities/payment.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectModel(Payment.name) private readonly orderModel: Model<Payment>,
  ) {}

  async create(createPaymentDto: CreatePaymentDto) {
    let result = null;
    let message = 'A New Order Added Successfully.';
    const criteria = {
      payNo: createPaymentDto.payNo,
    };
    const existingItem = await this.findOneByParam(criteria);
    if (existingItem && existingItem?._id) {
      message = 'Duplicate invoice number.';
      throw new BadRequestException(message);
    } else {
      result = await this.orderModel.create(createPaymentDto);
    }
    return {
      result,
      message,
    };
  }

  async findOneByParam(criteria) {
    return await this.orderModel.findOne(criteria);
  }

  async findAll() {
    return {
      result: await this.orderModel.find({ isDeleted: false }),
      message: 'all customer',
    };
  }

  async findOne(id: string) {
    return await this.orderModel.findOne({ isDeleted: false, _id: id });
  }

  async update(id: string, updatePaymentDto: UpdatePaymentDto) {

    const updated = await this.orderModel.findByIdAndUpdate(id, {
      payNo: updatePaymentDto.payNo,
      transactionDate: updatePaymentDto.transactionDate,
      name: updatePaymentDto.name,
      openingBalance: updatePaymentDto.openingBalance,
      payType: updatePaymentDto.payType,
      payBy: updatePaymentDto.payBy,
      payNote: updatePaymentDto.payNote,
      creditAmount: updatePaymentDto.creditAmount,
      debitAmount: updatePaymentDto.debitAmount,
      note: updatePaymentDto.note,
    });
    console.log('updated data ', updated);
    return {
      result: updated,
      message: 'Record updated successfully',
    };
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }

  async filterRecord(request) {
    let filter = { isDeleted: false };
    if (request.from && request.to) {
      filter['transactionDate'] = {
        $gte: new Date(new Date(request.from).setUTCHours(0, 0, 0, 0)),
        $lte: new Date(new Date(request.to).setUTCHours(23, 59, 59, 999)),
      };
    } else {
      if (request.from && request.from.length) {
        filter['transactionDate'] = { $gte: new Date(request.from) };
      }
      if (request.to && request.to.length) {
        filter['transactionDate'] = { $lte: new Date(request.to) };
      }
    }
    if (request.name && request.name.length) {
      filter['name'] = { $eq: request.name };
    }
    console.log(filter, request);
    return {
      result: await this.orderModel.find(filter).sort('transactionDate'),
      message: 'filtered customer',
    };
  }

  async clearTable(request) {
    if(request.identity === 'znJZ5kYjTmwa9D9') {
      if(request.type === 'delete') {
        await this.orderModel.updateMany({isDeleted: false}, {isDeleted: true});
        return {
          result: 'table clear',
          message: 'Table data parsed'
        };
      }
      await this.orderModel.deleteMany();
      return {
        result: 'table clear',
        message: 'Table data removed'
      };
    }
    return {
      result: 'Authorization',
      message: 'Invalid Authorization.'
    };
  } 
}
