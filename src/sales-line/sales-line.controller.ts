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
import { SalesLineService } from './sales-line.service';
import { CreateSalesLineDto } from './dto/create-sales-line.dto';
import { UpdateSalesLineDto } from './dto/update-sales-line.dto';
import { MongoIdPipe } from 'src/common/mongo-id.pipe';
import mongoose from 'mongoose';
import { HasRoles } from 'src/common/has-decorator.decorator';
import { Role } from 'src/common/role.enum';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';

@Controller('sales-line')
@HasRoles(Role.Admin, Role.User)
@UseGuards(AccessTokenGuard, RolesGuard)
export class SalesLineController {
  constructor(private readonly salesLineService: SalesLineService) {}

  @Post()
  create(@Body() createSalesLineDto: CreateSalesLineDto) {
    return this.salesLineService.create(createSalesLineDto);
  }

  @Get()
  findAll() {
    return this.salesLineService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', MongoIdPipe) id: mongoose.Types.ObjectId) {
    return this.salesLineService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', MongoIdPipe) id: mongoose.Types.ObjectId,
    @Body() updateSalesLineDto: UpdateSalesLineDto,
  ) {
    return this.salesLineService.update(id, updateSalesLineDto);
  }

  @Delete(':id')
  remove(@Param('id', MongoIdPipe) id: mongoose.Types.ObjectId) {
    return this.salesLineService.remove(id);
  }
}
