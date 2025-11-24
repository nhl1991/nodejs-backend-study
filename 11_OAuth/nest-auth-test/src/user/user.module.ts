import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Repository 등록
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
