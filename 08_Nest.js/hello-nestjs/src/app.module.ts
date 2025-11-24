import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { HelloModule } from './hello/hello.module';
import { PassportExampleModule } from './passport-example/passport-example.module';



@Module({
  imports: [CatsModule, HelloModule, PassportExampleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
