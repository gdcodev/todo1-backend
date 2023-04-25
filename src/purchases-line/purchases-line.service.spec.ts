import { Test, TestingModule } from '@nestjs/testing';
import { PurchasesLineService } from './purchases-line.service';

describe('PurchasesLineService', () => {
  let service: PurchasesLineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PurchasesLineService],
    }).compile();

    service = module.get<PurchasesLineService>(PurchasesLineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
