import { Injectable } from '@nestjs/common';
import { LoginUserDto } from './dto/login-auth.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async login(loginUserDto: LoginUserDto) {
    return await this.userService.login(loginUserDto);
  }
}
