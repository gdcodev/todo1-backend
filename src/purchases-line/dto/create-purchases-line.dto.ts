import { IsString, IsNotEmpty } from 'class-validator';
export class CreatePurchasesLineDto {
  @IsString()
  @IsNotEmpty()
  quantity: string;

  @IsString()
  @IsNotEmpty()
  cost: string;

  @IsString()
  @IsNotEmpty()
  product: string;

  @IsString()
  @IsNotEmpty()
  purchase: string;
}
