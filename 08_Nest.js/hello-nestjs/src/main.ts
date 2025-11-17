import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
import { HelloModule } from './hello.module';


// NestJS 시작 
async function bootstrap() {
  // NestFactory로 NestApplication 객체 생성
  const app = await NestFactory.create(HelloModule);
  /**
   * NestFactory는 NestFactoryStatic 클래스이며 create 함수로 NestApplication 객체를 생성.
   * create<T extends INestApplication = INestApplication>(module: IEntryNestModule, options?: NestApplicationOptions): Promise<T>;
   */


  // 기본 3000포트
  await app.listen(process.env.PORT ?? 3000);
  /**
   * HTTP 어댑터에 따라 다르지만, 기본값인 Express를 사용
   */
}
bootstrap();
