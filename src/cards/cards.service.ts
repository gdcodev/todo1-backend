import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Card, CardDocument } from './schemas/card.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CardsService {
  constructor(@InjectModel(Card.name) private cardModel: Model<CardDocument>) {}
  async create(createCardDto: CreateCardDto) {
    try {
      const { numberHash, ...rest } = createCardDto;
      const newNumberHash = await bcrypt.hash(
        numberHash,
        bcrypt.genSaltSync(10),
      );
      const newCard = new this.cardModel({
        numberHash: newNumberHash,
        lastFourNumbers: numberHash.toString().slice(-4),
        ...rest,
      });
      const createdCard = await newCard.save();
      return createdCard;
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll() {
    try {
      const cards = await this.cardModel.find();
      return cards;
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findOne(id: mongoose.Types.ObjectId) {
    try {
      const card = await this.cardModel.findById(id);
      if (!card) {
        throw new NotFoundException('Card not found');
      }
      return card;
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(id: mongoose.Types.ObjectId, updateCardDto: UpdateCardDto) {
    try {
      await this.findOne(id);
      const updatedCard = await this.cardModel.findByIdAndUpdate(
        id,
        updateCardDto,
        {
          new: true,
        },
      );
      return updatedCard;
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
      const deletedCard = await this.cardModel.findByIdAndRemove(id);
      return deletedCard;
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
}
