import { PartialType } from '@nestjs/mapped-types';
import { CreateSalesLineDto } from './create-sales-line.dto';

export class UpdateSalesLineDto extends PartialType(CreateSalesLineDto) {}
