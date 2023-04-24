import { Test, TestingModule } from '@nestjs/testing';
import { SalesLineService } from './sales-line.service';

describe('SalesLineService', () => {
  let service: SalesLineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SalesLineService],
    }).compile();

    service = module.get<SalesLineService>(SalesLineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
