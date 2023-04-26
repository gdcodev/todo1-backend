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
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { MongoIdPipe } from 'src/common/mongo-id.pipe';
import mongoose from 'mongoose';
import { HasRoles } from 'src/common/has-decorator.decorator';
import { Role } from 'src/common/role.enum';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';

@Controller('cards')
@HasRoles(Role.Admin, Role.User)
@UseGuards(AccessTokenGuard, RolesGuard)
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  create(@Body() createCardDto: CreateCardDto) {
    return this.cardsService.create(createCardDto);
  }

  @Get()
  findAll() {
    return this.cardsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', MongoIdPipe) id: mongoose.Types.ObjectId) {
    return this.cardsService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', MongoIdPipe) id: mongoose.Types.ObjectId,
    @Body() updateCardDto: UpdateCardDto,
  ) {
    return this.cardsService.update(id, updateCardDto);
  }

  @Delete(':id')
  remove(@Param('id', MongoIdPipe) id: mongoose.Types.ObjectId) {
    return this.cardsService.remove(id);
  }

  @Get('user/:id')
  findAllByUser(@Param('id', MongoIdPipe) id: mongoose.Types.ObjectId) {
    return this.cardsService.findAllByUser(id);
  }
}
