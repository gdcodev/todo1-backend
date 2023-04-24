import { Module } from '@nestjs/common';
import { SalesLineService } from './sales-line.service';
import { SalesLineController } from './sales-line.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SalesLine, SalesLineSchema } from './schemas/sales-line.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SalesLine.name, schema: SalesLineSchema },
    ]),
  ],
  controllers: [SalesLineController],
  providers: [SalesLineService],
  exports: [SalesLineService],
})
export class SalesLineModule {}
