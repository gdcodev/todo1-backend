import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Sale, SaleDocument } from './schemas/sale.schema';

@Injectable()
export class SalesService {
  constructor(@InjectModel(Sale.name) private saleModel: Model<SaleDocument>) {}
  async create(createSaleDto: CreateSaleDto) {
    try {
      const newSale = new this.saleModel(createSaleDto);
      const createdSale = await newSale.save();
      return createdSale;
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll() {
    try {
      const sales = await this.saleModel.find();
      return sales;
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findOne(id: mongoose.Types.ObjectId) {
    try {
      const sale = await this.saleModel.findById(id);
      if (!sale) {
        throw new NotFoundException('Sale not found');
      }
      return sale;
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(id: mongoose.Types.ObjectId, updateSaleDto: UpdateSaleDto) {
    try {
      await this.findOne(id);
      const updatedSale = await this.saleModel.findByIdAndUpdate(
        id,
        updateSaleDto,
        {
          new: true,
        },
      );
      return updatedSale;
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async remove(id: mongoose.Types.ObjectId) {
    try {
      await this.findOne(id);
      const deletedSale = await this.saleModel.findByIdAndRemove(id);
      return deletedSale;
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
}
