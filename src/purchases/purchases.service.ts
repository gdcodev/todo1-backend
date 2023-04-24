import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import mongoose, { Model } from 'mongoose';
import { Purchase, PurchaseDocument } from './schemas/purchase.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PurchasesService {
  constructor(
    @InjectModel(Purchase.name)
    private purchaseModel: Model<PurchaseDocument>,
  ) {}
  async create(createPurchaseDto: CreatePurchaseDto) {
    try {
      const newPurchase = new this.purchaseModel(createPurchaseDto);
      const createdPurchase = await newPurchase.save();
      return createdPurchase;
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll() {
    try {
      const purchases = await this.purchaseModel.find();
      return purchases;
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findOne(id: mongoose.Types.ObjectId) {
    try {
      const purchase = await this.purchaseModel.findById(id);
      if (!purchase) {
        throw new NotFoundException('Purchase not found');
      }
      return purchase;
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(
    id: mongoose.Types.ObjectId,
    updatePurchaseDto: UpdatePurchaseDto,
  ) {
    try {
      await this.findOne(id);
      const updatedPurchase = await this.purchaseModel.findByIdAndUpdate(
        id,
        updatePurchaseDto,
        {
          new: true,
        },
      );
      return updatedPurchase;
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
      const deletedPurchase = await this.purchaseModel.findByIdAndRemove(id);
      return deletedPurchase;
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
}
