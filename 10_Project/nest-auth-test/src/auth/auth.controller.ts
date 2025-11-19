import { Body, Controller, Get, Post, Request, Response, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "src/user/user.dto";
import { AuthenticatedGuard, LocalAuthGuard } from "./auth.guard";


@Controller("/auth")
export class AuthController{
    constructor(private authService: AuthService){}

    @Post('register')
    async register(@Body() userDto: CreateUserDto){
        return await this.authService.register(userDto);
    }


    @Post('login')
    async login(@Request() req, @Response() res ){
        const userInfo = await this.authService.validateUser(
            req.body.email,
            req.body.password,
        );

        if(userInfo) {
            res.cookie('login', JSON.stringify(userInfo), {
                httpOnly: false, // 브라우저에서 읽을 수 있도록 함
                maxAge: 1000 * 60 * 60 * 24 * 7,
            });
        }

        return res.send({ message: 'Login success.'});

    }


    @UseGuards(LocalAuthGuard)
    @Post('login2')
    async login2(@Request() req, @Response() res){

        if(!req.cookies['login'] && req.user){
            res.cookie('login', JSON.stringify(req.user), {
                httpOnly: false,
                // maxAge: 1000 * 60 * 60 * 24, 
                maxAge: 1000 * 10 // 테스트
            })
        }
        return res.send({ message: 'login2 success.'});
    }

    @UseGuards(LocalAuthGuard)
    @Get('test-guard')
    testGuard(){
        return '로그인된 때에만 이 글이 보임.'
    }


    @UseGuards(LocalAuthGuard)
    @Post('login3')
    login3(@Request() req){
        return req.user
    }

    @UseGuards(AuthenticatedGuard)
    @Get('test-guard2')
    testGuardWithSession(@Request() req){
        return req.user;
    }
}