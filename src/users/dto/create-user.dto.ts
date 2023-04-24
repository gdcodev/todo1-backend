import {
  IsEmail,
  IsString,
  IsNotEmpty,
  MinLength,
  IsEnum,
  Matches,
} from 'class-validator';
import { Role } from 'src/common/role.enum';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/, {
    message:
      'Password must contain uppercase letters, lowercase letters and numbers',
  })
  password: string;

  @IsEnum([Role.Admin, Role.User])
  @IsNotEmpty()
  role: string;
}
