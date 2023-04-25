import { PartialType } from '@nestjs/mapped-types';
import { CreatePurchasesLineDto } from './create-purchases-line.dto';

export class UpdatePurchasesLineDto extends PartialType(CreatePurchasesLineDto) {}
