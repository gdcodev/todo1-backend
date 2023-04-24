import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import mongoose, { Model } from 'mongoose';
import { Category, CategoryDocument } from './schemas/category.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {}
  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const newCategory = new this.categoryModel(createCategoryDto);
      const createdCategory = await newCategory.save();
      return createdCategory;
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll() {
    try {
      const categories = await this.categoryModel.find();
      return categories;
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findOne(id: mongoose.Types.ObjectId) {
    try {
      const category = await this.categoryModel.findById(id);
      if (!category) {
        throw new NotFoundException('Category not found');
      }
      return category;
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(
    id: mongoose.Types.ObjectId,
    updateCategoryDto: UpdateCategoryDto,
  ) {
    try {
      await this.findOne(id);
      const updatedCategory = await this.categoryModel.findByIdAndUpdate(
        id,
        updateCategoryDto,
        {
          new: true,
        },
      );
      return updatedCategory;
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
      const deletedCategory = await this.categoryModel.findByIdAndRemove(id);
      return deletedCategory;
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
}
