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
