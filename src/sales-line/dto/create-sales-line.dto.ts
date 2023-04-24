import { IsString, IsNotEmpty } from 'class-validator';
export class CreateSalesLineDto {
  @IsString()
  @IsNotEmpty()
  quantity: string;

  @IsString()
  @IsNotEmpty()
  subtotal: string;

  @IsString()
  @IsNotEmpty()
  product: string;

  @IsString()
  @IsNotEmpty()
  sale: string;
}
