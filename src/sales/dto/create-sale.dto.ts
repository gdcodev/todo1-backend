import { IsString, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';
import { PaymentMethod } from 'src/common/payment-method.enum';
export class CreateSaleDto {
  @IsString()
  @IsNotEmpty()
  total: string;

  @IsOptional()
  @IsEnum([PaymentMethod.Cash, PaymentMethod.Card])
  @IsNotEmpty()
  paymentMethod: string;

  @IsString()
  @IsNotEmpty()
  user: string;

  @IsString()
  @IsNotEmpty()
  card: string;
}
