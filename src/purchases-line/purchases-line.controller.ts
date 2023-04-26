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
import { PurchasesLineService } from './purchases-line.service';
import { CreatePurchasesLineDto } from './dto/create-purchases-line.dto';
import { UpdatePurchasesLineDto } from './dto/update-purchases-line.dto';
import { MongoIdPipe } from 'src/common/mongo-id.pipe';
import mongoose from 'mongoose';
import { HasRoles } from 'src/common/has-decorator.decorator';
import { Role } from 'src/common/role.enum';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';

@Controller('purchases-line')
@HasRoles(Role.Admin)
@UseGuards(AccessTokenGuard, RolesGuard)
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
