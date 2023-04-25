import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePurchasesLineDto } from './dto/create-purchases-line.dto';
import { UpdatePurchasesLineDto } from './dto/update-purchases-line.dto';
import mongoose, { Model } from 'mongoose';
import {
  PurchasesLine,
  PurchaseLineDocument,
} from './schemas/purchases-line.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PurchasesLineService {
  constructor(
    @InjectModel(PurchasesLine.name)
    private purchasesLineModel: Model<PurchaseLineDocument>,
  ) {}
  async create(createPurchasesLineDto: CreatePurchasesLineDto) {
    try {
      const newPurchasesLine = new this.purchasesLineModel(
        createPurchasesLineDto,
      );
      const createdSalesLine = await newPurchasesLine.save();
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
      const purchasesLine = await this.purchasesLineModel.find();
      return purchasesLine;
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findOne(id: mongoose.Types.ObjectId) {
    try {
      const purchasesLine = await this.purchasesLineModel.findById(id);
      if (!purchasesLine) {
        throw new NotFoundException('Purchase line not found');
      }
      return purchasesLine;
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(
    id: mongoose.Types.ObjectId,
    updatePurchasesLineDto: UpdatePurchasesLineDto,
  ) {
    try {
      await this.findOne(id);
      const updatedPurchasesLine =
        await this.purchasesLineModel.findByIdAndUpdate(
          id,
          updatePurchasesLineDto,
          {
            new: true,
          },
        );
      return updatedPurchasesLine;
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
      const deletedPurchasesLine =
        await this.purchasesLineModel.findByIdAndRemove(id);
      return deletedPurchasesLine;
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
}
