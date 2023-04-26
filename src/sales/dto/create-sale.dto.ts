import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsArray,
  IsObject,
} from 'class-validator';
import { PaymentMethod } from 'src/common/payment-method.enum';
export class CreateSaleDto {
  @IsOptional()
  @IsEnum([PaymentMethod.Cash, PaymentMethod.Card])
  @IsNotEmpty()
  paymentMethod: string;

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  cardId: string;

  @IsArray()
  cart;

  @IsObject()
  cardForm;
}
