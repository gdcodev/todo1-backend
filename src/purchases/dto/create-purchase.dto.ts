import { IsString, IsNotEmpty } from 'class-validator';
export class CreatePurchaseDto {
  @IsString()
  @IsNotEmpty()
  total: string;

  @IsString()
  @IsNotEmpty()
  user: string;
}
