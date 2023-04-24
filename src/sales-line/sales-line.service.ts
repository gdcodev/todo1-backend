import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSalesLineDto } from './dto/create-sales-line.dto';
import { UpdateSalesLineDto } from './dto/update-sales-line.dto';
import mongoose, { Model } from 'mongoose';
import { SalesLine, SalesLineDocument } from './schemas/sales-line.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class SalesLineService {
  constructor(
    @InjectModel(SalesLine.name)
    private salesLineModel: Model<SalesLineDocument>,
  ) {}
  async create(createSalesLineDto: CreateSalesLineDto) {
    try {
      const newSalesLine = new this.salesLineModel(createSalesLineDto);
      const createdSalesLine = await newSalesLine.save();
      return createdSalesLine;
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll() {
    try {
      const salesLine = await this.salesLineModel.find();
      return salesLine;
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findOne(id: mongoose.Types.ObjectId) {
    try {
      const salesLine = await this.salesLineModel.findById(id);
      if (!salesLine) {
        throw new NotFoundException('Sale line not found');
      }
      return salesLine;
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(
    id: mongoose.Types.ObjectId,
    updateSalesLineDto: UpdateSalesLineDto,
  ) {
    try {
      await this.findOne(id);
      const updatedSalesLine = await this.salesLineModel.findByIdAndUpdate(
        id,
        updateSalesLineDto,
        {
          new: true,
        },
      );
      return updatedSalesLine;
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
      const deletedSalesLine = await this.salesLineModel.findByIdAndRemove(id);
      return deletedSalesLine;
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
}
