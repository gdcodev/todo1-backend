import { Test, TestingModule } from '@nestjs/testing';
import { PurchasesLineController } from './purchases-line.controller';
import { PurchasesLineService } from './purchases-line.service';

describe('PurchasesLineController', () => {
  let controller: PurchasesLineController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PurchasesLineController],
      providers: [PurchasesLineService],
    }).compile();

    controller = module.get<PurchasesLineController>(PurchasesLineController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
