import { Controller, Get, Param, Query } from '@nestjs/common';

interface IQuery {
  offset: number;
  limit: number;
}

@Controller('passport-example')
export class PassportExampleController {
  @Get('/message')
  printMessage() {
    return 'This is from Controller.';
  }

  @Get('/:year/:season')
  printParameter(
    @Param('year') year: string,
    @Param('season') season: string,
    @Query() { offset = 0, limit = 0 }: IQuery,
  ) {
    return `${year}/${season}?offset=${offset}&limit=${limit}`;
  }
}
