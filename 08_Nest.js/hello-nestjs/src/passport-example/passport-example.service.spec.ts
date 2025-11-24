import { Test, TestingModule } from '@nestjs/testing';
import { PassportExampleService } from './passport-example.service';

describe('PassportExampleService', () => {
  let service: PassportExampleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PassportExampleService],
    }).compile();

    service = module.get<PassportExampleService>(PassportExampleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
