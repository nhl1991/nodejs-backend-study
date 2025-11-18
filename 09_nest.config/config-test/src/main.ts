import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

/**
 * NestJs 기동시 bootstrap() => NestFactory.create()순으로 실행 됨.
 * bootstrap()은 class가 아니라 function이기에 클래스 생성자로 의존성 주입도 불가능.
 * 따라서, app.get()메서드로 ConfigService 클래스를 인수로 주고, 반환값을 받는 방식을 사용.
 */

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  await app.listen(configService.get("SERVER_PORT")!);
}
bootstrap();
