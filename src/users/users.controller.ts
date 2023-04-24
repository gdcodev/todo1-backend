import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { MongoIdPipe } from 'src/common/mongo-id.pipe';
import mongoose from 'mongoose';
import { HasRoles } from 'src/common/has-decorator.decorator';
import { Role } from 'src/common/role.enum';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { UseGuards } from '@nestjs/common/decorators';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @HasRoles(Role.Admin)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @HasRoles(Role.Admin)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @HasRoles(Role.Admin)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Get(':id')
  async findOne(@Param('id', MongoIdPipe) id: mongoose.Types.ObjectId) {
    return this.usersService.findOne(id);
  }

  @HasRoles(Role.Admin)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Put(':id')
  async update(
    @Param('id', MongoIdPipe) id: mongoose.Types.ObjectId,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @HasRoles(Role.Admin)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Delete(':id')
  async remove(@Param('id', MongoIdPipe) id: mongoose.Types.ObjectId) {
    return this.usersService.remove(id);
  }
}
