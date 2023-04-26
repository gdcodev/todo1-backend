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
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { HasRoles } from 'src/common/has-decorator.decorator';
import { Role } from 'src/common/role.enum';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { MongoIdPipe } from 'src/common/mongo-id.pipe';
import mongoose from 'mongoose';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @HasRoles(Role.Admin)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @HasRoles(Role.Admin, Role.User)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @HasRoles(Role.Admin, Role.User)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Get(':id')
  findOne(@Param('id', MongoIdPipe) id: mongoose.Types.ObjectId) {
    return this.productsService.findOne(id);
  }

  @HasRoles(Role.Admin)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Put(':id')
  update(
    @Param('id', MongoIdPipe) id: mongoose.Types.ObjectId,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(id, updateProductDto);
  }

  @HasRoles(Role.Admin)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id', MongoIdPipe) id: mongoose.Types.ObjectId) {
    return this.productsService.remove(id);
  }
}
