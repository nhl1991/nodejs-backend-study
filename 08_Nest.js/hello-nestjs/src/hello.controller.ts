
import { Controller, Get } from "@nestjs/common";

@Controller()
export class HelloController {
    @Get()
    hello() {
        return "나는 강해지고싶다.나는 강해지고싶다.나는 강해지고싶다.나는 강해지고싶다."
    }
}