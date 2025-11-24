import { Module } from '@nestjs/common';
import { PassportExampleController } from './passport-example.controller';
import { PassportExampleService } from './passport-example.service';

@Module({
  controllers: [PassportExampleController],
  providers: [PassportExampleService]
})
export class PassportExampleModule {}
