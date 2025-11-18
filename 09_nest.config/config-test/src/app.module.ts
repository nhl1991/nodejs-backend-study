import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MyanimelistController } from './myanimelist/myanimelist.controller';
import config from './configs/config';

console.log('env ', process.env.NODE_ENV)

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: `${process.cwd()}/envs/${process.env.NODE_ENV}.env`,
    load: [config], // load로 커스텀 config 등록
    cache: true, // Cache 설정 => 서버 기동 시점에 설정을 캐싱해서 이후 매 요청마다 파일/환경변수 읽지 않음.
    expandVariables: true, // .env에서 확장 변수 사용하려면 true.
  })], //
  controllers: [AppController, MyanimelistController],
  providers: [AppService],

})
export class AppModule {}

/**
 * ConfigModule.forRoot() option
 * cache          | 메모리 환경변수 캐시 여부
 * isGlobal       | true일 경우, global module에 등록되어 다른 모듈에서 import를 따로 해주지 않아도 됨
 * ignoreEnvFile  | true일 경우, .env 무시
 * ignoreEnvVars  | true일 경우, 환경 변수 무효
 * envFilePath    | 환경 변수 파일의 경로
 * encoding       | 환경 변수 파일의 인코딩
 * validate       | 환경 변수의 유효성 검증 함수
 * load           | 커스텀 환경 설정 파일을 로딩 시 사용(ex **.ts / **.yaml)
 */