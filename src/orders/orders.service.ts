import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<Order>,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    let result = null;
    let message = 'A New Order Added Successfully.';
    const criteria = {
      invoiceNo: createOrderDto.invoiceNo,
    };
    const existingItem = await this.findOneByParam(criteria);
    if (existingItem && existingItem?._id) {
      message = 'Duplicate invoice number.';
      throw new BadRequestException(message);
    } else {
      result = await this.orderModel.create(createOrderDto);
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

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }

  async filterRecord(request) {
    let filter = { isDeleted: false };
    if(request.from && request.to) {
      filter['transactionDate'] = { $gte: new Date(request.from), $lte: new Date(new Date(request.to).setUTCHours(23,59,59,999)) };
    }
    else {        
      if(request.from && request.from.length) {
        filter['transactionDate'] = { $gte: new Date(request.from) };
      }
      if(request.to && request.to.length) {
        filter['transactionDate'] = { $lte: new Date(request.to) };
      }
    }
    if(request.customer && request.customer.length) {
      filter['customerId'] = { $eq: request.customer };
    }
    console.log(filter, request)
    return {
      result: await this.orderModel.find(filter),
      message: 'filtered customer',
    };
  }

}
