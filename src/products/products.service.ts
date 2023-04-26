import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './schemas/product.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}
  async create(createProductDto: CreateProductDto) {
    try {
      const newProduct = new this.productModel(createProductDto);
      const createdProduct = await newProduct.save();
      return createdProduct;
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll() {
    try {
      const products = await this.productModel
        .find({ stock: { $gt: 0 } })
        .populate('category');
      return products;
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findOne(id: mongoose.Types.ObjectId) {
    try {
      const product = await this.productModel.findById(id).populate('category');
      if (!product) {
        throw new NotFoundException('Product not found');
      }
      return product;
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(
    id: mongoose.Types.ObjectId,
    updateProductDto: UpdateProductDto,
  ) {
    try {
      await this.findOne(id);
      const updatedProduct = await this.productModel.findByIdAndUpdate(
        id,
        updateProductDto,
        {
          new: true,
        },
      );
      return updatedProduct;
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
      const deletedProduct = await this.productModel.findByIdAndRemove(id);
      return deletedProduct;
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async updateStock(id: mongoose.Types.ObjectId, updateProductDto: any) {
    try {
      const { id, amount } = updateProductDto;
      const product = await this.findOne(id);
      const updatedStock = product.stock - Number.parseFloat(amount);

      const updatedProduct = await this.productModel.findByIdAndUpdate(
        id,
        { stock: updatedStock },
        {
          new: true,
        },
      );
      return updatedProduct;
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
}
