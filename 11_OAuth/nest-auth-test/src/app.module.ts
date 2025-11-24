import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite', // sqlite, mysql, postgres, cockroachdb, oracle, sqlserver, sap, sqlijs
      database: 'nest-auth-test.sqlite',
      entities: [User],
      synchronize: true, // 서버 기동 시, 서버가 엔티티 객체를 읽어 데이터베이스 스키마를 만들거나 변경. 개발용으로만 쓸 것.
      logging: true, // SQL 실행 로그.
    }),
    UserModule,
    AuthModule,
    ConfigModule.forRoot()
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
