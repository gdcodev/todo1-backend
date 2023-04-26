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
import { PaymentMethod } from '../common/payment-method.enum';
import { CardsService } from 'src/cards/cards.service';
import { ProductsService } from 'src/products/products.service';
import { SalesLineService } from 'src/sales-line/sales-line.service';

@Injectable()
export class SalesService {
  constructor(
    @InjectModel(Sale.name) private saleModel: Model<SaleDocument>,
    private cardService: CardsService,
    private productService: ProductsService,
    private salesLineService: SalesLineService,
  ) {}
  async create(createSaleDto: CreateSaleDto) {
    try {
      const { paymentMethod, userId, cart, cardId, cardForm } = createSaleDto;
      const total = cart.reduce(
        (acc, curr) => curr.amount * curr.price + acc,
        0,
      );
      const data: any = {
        paymentMethod,
        user: userId,
        total,
      };

      if (paymentMethod === PaymentMethod.Card) {
        if (cardId) {
          data.card = cardId;
        } else {
          if (Object.keys(cardForm).length > 0) {
            const card = await this.cardService.create({
              ...cardForm,
              user: userId,
            });
            data.card = card._id;
          } else {
            throw new NotFoundException('Error with card info');
          }
        }
      }
      const newSale = new this.saleModel(data);
      const createdSale = await newSale.save();

      if (Object.keys(createdSale).length > 0) {
        await Promise.all(
          cart.map(async (item) => {
            const data = {
              quantity: item.amount,
              subtotal: item.price * item.amount,
              product: item.id,
              sale: createdSale._id,
            };
            await this.salesLineService.create(data);
          }),
        );

        await Promise.all(
          cart.map(async (item) => {
            await this.productService.updateStock(item.id, item);
          }),
        );
      }
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
