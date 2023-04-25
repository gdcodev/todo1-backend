import { Module } from '@nestjs/common';
import { PurchasesLineService } from './purchases-line.service';
import { PurchasesLineController } from './purchases-line.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  PurchasesLine,
  PurchaseLineSchema,
} from './schemas/purchases-line.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PurchasesLine.name, schema: PurchaseLineSchema },
    ]),
  ],
  controllers: [PurchasesLineController],
  providers: [PurchasesLineService],
  exports: [PurchasesLineService],
})
export class PurchasesLineModule {}
