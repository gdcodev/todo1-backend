import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from 'src/auth/dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const { email } = createUserDto;
      const checkEmail = await this.userModel.findOne({
        email,
      });
      if (checkEmail) {
        throw new HttpException('The email already exits', 403);
      }
      const newUser = new this.userModel(createUserDto);
      const createdUser = await newUser.save();
      return createdUser;
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async login(loginUserDto: LoginUserDto) {
    try {
      const findUser = await this.userModel
        .findOne({
          email: loginUserDto.email,
        })
        .select('-createdAt -updatedAt');
      if (!findUser) {
        throw new NotFoundException('User not found');
      }

      const isCorrectPassword = await bcrypt.compare(
        loginUserDto.password,
        findUser.password,
      );
      if (!isCorrectPassword) {
        throw new NotFoundException('Password incorrect');
      }

      const tokens = await this.generateToken(
        findUser._id,
        findUser.username,
        findUser.role,
      );

      const data = {
        user: findUser,
        tokens,
      };

      return data;
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll() {
    try {
      const users = await this.userModel.find();
      return users;
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findOne(id: mongoose.Types.ObjectId) {
    try {
      const user = await this.userModel.findById(id);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(id: mongoose.Types.ObjectId, updateUserDto: UpdateUserDto) {
    try {
      await this.findOne(id);
      const updatedUser = await this.userModel.findByIdAndUpdate(
        id,
        updateUserDto,
        {
          new: true,
        },
      );
      return updatedUser;
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
      const deletedUser = await this.userModel.findByIdAndRemove(id);
      return deletedUser;
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async generateToken(
    id: mongoose.Types.ObjectId,
    username: string,
    role?: string,
  ) {
    const [accessToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          id,
          username,
          role,
        },
        {
          expiresIn: '12h',
        },
      ),
    ]);
    return {
      accessToken,
    };
  }
}
