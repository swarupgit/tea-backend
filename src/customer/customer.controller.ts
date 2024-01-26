import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerService.create(createCustomerDto);
  }

  @Get()
  findAll() {
    return this.customerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerService.findOne(id);
  }

  @Post('/update-customer')
  updateCustomer(@Body() customerDto: UpdateCustomerDto, @Request() request) {
    const { customer } = request;
    return this.customerService.update(customerDto, customer);
  }

  @Post('/delete-customer')
  deleteCustomer(@Body() customerDto: UpdateCustomerDto, @Request() request) {
    const { customer } = request;
    return this.customerService.remove(customer);
  }
}
