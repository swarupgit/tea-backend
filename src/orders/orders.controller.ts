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
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  findAll(@Query() query) {
    if(query) {
      return this.ordersService.filterRecord(query);
    }
    return this.ordersService.findAll();
  }

  @Get('/clear-table')
  clearTable(@Query() query) {
    if(query.identity) {
      return this.ordersService.clearTable(query);
    }
    return {
      result: 'invalid end point',
      message: 'Invalid endpoint.'
    };
  }

  @Get('/update-out-standing')
  async updateOutStanding(@Query() query) {
    if(query.identity) {
      return await this.ordersService.updateOutStanding(query);
    }
    return {
      result: 'invalid end point',
      message: 'Invalid endpoint.'
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}
