import { Test, TestingModule } from '@nestjs/testing';
import { SalesLineController } from './sales-line.controller';
import { SalesLineService } from './sales-line.service';

describe('SalesLineController', () => {
  let controller: SalesLineController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SalesLineController],
      providers: [SalesLineService],
    }).compile();

    controller = module.get<SalesLineController>(SalesLineController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
