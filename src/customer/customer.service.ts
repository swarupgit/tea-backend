import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Customer.name) private readonly customerModel: Model<Customer>,
  ) {}

  async create(createCustomerDto: CreateCustomerDto) {
    let result = null;
    let message = 'A New Customer Added Successfully.';
    const criteria = {
      mobile: createCustomerDto.mobile,
    };
    const existingItem = await this.findOneByParam(criteria);
    if (existingItem && existingItem?._id) {
      message = 'Mobile number already associated with other member.';
      throw new BadRequestException(message);
    } else {
      result = await this.customerModel.create(createCustomerDto);
    }
    return {
      result,
      message,
    };
  }

  async findOneByParam(criteria) {
    return await this.customerModel.findOne(criteria);
  }

  async findAll() {
    return {
      result: await this.customerModel.find({ isDeleted: false }),
      message: 'all customer',
    };
  }

  async findOne(id: string) {
    return await this.customerModel.findOne({ isDeleted: false, _id: id });
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return `This action updates a #${id} customer`;
  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }

  async clearTable(request) {
    if(request.identity === 'znJZ5kYjTmwa9D9') {
      if(request.type === 'delete') {
        await this.customerModel.updateMany({isDeleted: false}, {isDeleted: true});
        return {
          result: 'table clear',
          message: 'Table data parsed'
        };
      }
      await this.customerModel.deleteMany();
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
