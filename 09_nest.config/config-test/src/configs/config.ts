import local from './local';
import dev from './dev';
import prod from './prod';
import common from './common';
// *.yaml 
import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';

const phase = process.env.NODE_ENV;

let conf = {};

if (phase === 'local'){
    conf = local;
}else if(phase === 'dev'){
    conf = dev;
}else if(phase === 'prod'){
    conf = prod;
}
console.log(`${process.cwd()}/configs/config.yaml`)
const yamlConfig:Record<string, any> = yaml.load(
    
    readFileSync(`${process.cwd()}/src/configs/config.yaml`, 'utf-8')
) as Record<string, any>; //임시.

export default () => ({
    ...common,
    ...conf,
    ...yamlConfig
})


/**
 * 환경 변수 설정 및 초기화 순서
 * 
 *  main.ts의 bootstrap() 실행
 *          |
 *  NestFactory.create() 실행
 *          |                          환경 변수 읽어오기
 *      각 모듈 초기화                  ConfigModule.forRoot() 실행
 *      ConfigModule       <------>  envFilePath에서 환경 변수 일기
 *      AppModule                    ConfigModule.forRoot()로 설정한 process.env를 envFilePath에서 읽은 환경 변수와 병합
 *      기타 module                   ?load 실행 후의 결과값과 병합
 *          |
 *      각 컨트롤러 초기화 및 핸들러 함수 url 매핑.
 */




