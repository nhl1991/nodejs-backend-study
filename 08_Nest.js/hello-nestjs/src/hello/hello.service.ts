import { Injectable } from "@nestjs/common";


@Injectable()
export class HelloService{
    getText(): string {
    return '나는 강해지고 싶다. 나는 강해지고 싶다. 나는 강해지고 싶다.';
  }
}