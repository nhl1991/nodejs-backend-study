import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';


@Controller('myanimelist')
export class MyanimelistController {
  constructor(private configService: ConfigService) {}

  @Get()
  public getAnimeRanking(): string {
    const apiUrl = this.configService.get('MAL_API_URL');
    const apiKey = this.configService.get('MAL_API_ID');
    return this.callAnimationApi(apiUrl, apiKey);
  }

  private callAnimationApi(apiUrl: string, apiKey: string): string {
    setTimeout(() => {
      console.log('대충 json 파일 가져오는 중...');
      console.log(apiUrl);
      console.log(apiKey);
    }, 2000);

    return '薫花は凛と咲く';
  }
}
