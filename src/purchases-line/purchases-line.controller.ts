import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { PurchasesLineService } from './purchases-line.service';
import { CreatePurchasesLineDto } from './dto/create-purchases-line.dto';
import { UpdatePurchasesLineDto } from './dto/update-purchases-line.dto';
import { MongoIdPipe } from 'src/common/mongo-id.pipe';
import mongoose from 'mongoose';

@Controller('purchases-line')
export class PurchasesLineController {
  constructor(private readonly purchasesLineService: PurchasesLineService) {}

  @Post()
  create(@Body() createPurchasesLineDto: CreatePurchasesLineDto) {
    return this.purchasesLineService.create(createPurchasesLineDto);
  }

  @Get()
  findAll() {
    return this.purchasesLineService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', MongoIdPipe) id: mongoose.Types.ObjectId) {
    return this.purchasesLineService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', MongoIdPipe) id: mongoose.Types.ObjectId,
    @Body() updatePurchasesLineDto: UpdatePurchasesLineDto,
  ) {
    return this.purchasesLineService.update(id, updatePurchasesLineDto);
  }

  @Delete(':id')
  remove(@Param('id', MongoIdPipe) id: mongoose.Types.ObjectId) {
    return this.purchasesLineService.remove(id);
  }
}
