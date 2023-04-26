import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PurchasesService } from './purchases.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { MongoIdPipe } from 'src/common/mongo-id.pipe';
import mongoose from 'mongoose';
import { HasRoles } from 'src/common/has-decorator.decorator';
import { Role } from 'src/common/role.enum';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';

@Controller('purchases')
@HasRoles(Role.Admin)
@UseGuards(AccessTokenGuard, RolesGuard)
export class PurchasesController {
  constructor(private readonly purchasesService: PurchasesService) {}

  @Post()
  create(@Body() createPurchaseDto: CreatePurchaseDto) {
    return this.purchasesService.create(createPurchaseDto);
  }

  @Get()
  findAll() {
    return this.purchasesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', MongoIdPipe) id: mongoose.Types.ObjectId) {
    return this.purchasesService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', MongoIdPipe) id: mongoose.Types.ObjectId,
    @Body() updatePurchaseDto: UpdatePurchaseDto,
  ) {
    return this.purchasesService.update(id, updatePurchaseDto);
  }

  @Delete(':id')
  remove(@Param('id', MongoIdPipe) id: mongoose.Types.ObjectId) {
    return this.purchasesService.remove(id);
  }
}
