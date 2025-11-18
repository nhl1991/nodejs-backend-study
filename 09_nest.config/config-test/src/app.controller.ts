import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(private readonly configService:ConfigService) {}

  @Get()
  getHello(): string {
    const message =  this.configService.get('SHANGHAI_ROMANCE');
    return message;
  }


  @Get('service-url')
  getServiceUrl(): string {
    const url = this.configService.get('SERVICE_URL');
    return url;
  }


  @Get('db-info')
  getTest(): string {
    console.log(this.configService.get('logLevel'));
    console.log(this.configService.get('apiVersion'));
    const result = this.configService.get('dbInfo');
    return result
  }


  @Get('redis-info')
  getRedisInfo(): string {
    return `${this.configService.get('redis.host')}:${this.configService.get('redis.port')}`
  }


  @Get('server-url')
  getServerUrl(): string {
    const result = this.configService.get('SERVER_URL');
    return result;
  }
}
