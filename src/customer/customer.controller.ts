import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  Query,
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

  @Get('/clear-table')
  clearTable(@Query() query) {
    if(query.identity) {
      return this.customerService.clearTable(query);
    }
    return {
      result: 'invalid end point',
      message: 'Invalid endpoint.'
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() customerDto: UpdateCustomerDto) {
    return this.customerService.updateCustomer(id, customerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerService.removeCustomer(id);
  }
}
