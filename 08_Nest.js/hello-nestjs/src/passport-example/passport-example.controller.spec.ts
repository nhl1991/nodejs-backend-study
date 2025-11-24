import { Test, TestingModule } from '@nestjs/testing';
import { PassportExampleController } from './passport-example.controller';

describe('PassportExampleController', () => {
  let controller: PassportExampleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PassportExampleController],
    }).compile();

    controller = module.get<PassportExampleController>(PassportExampleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
