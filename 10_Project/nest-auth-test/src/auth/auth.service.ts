import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateUserDto } from "src/user/user.dto";
import { UserService } from "src/user/user.service";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService{

    constructor(private userSerivce: UserService){}

    async register(userDto: CreateUserDto){
        const user = await this.userSerivce.getUser(userDto.email);

        if(user){
            throw new HttpException(
                '이미 가입된 계정입니다.',
                HttpStatus.BAD_REQUEST,
            )
        }

        const encryptedPassword = bcrypt.hashSync(userDto.password, 10);

        try{
            const user = await this.userSerivce.createUser({
                ...userDto,
                password: encryptedPassword,
            });

            user.password = '';
            return user;
        }catch(err){
            throw new HttpException('서버 에러', 500);
        }
    }


    async validateUser(email: string, password: string){
        const user = await this.userSerivce.getUser(email);

        if(!user) return null;

        const { password: hashedPassword, ...userInfo} = user;

        if(bcrypt.compareSync(password, hashedPassword)){
            return userInfo;
        }

        return null;
    }
}