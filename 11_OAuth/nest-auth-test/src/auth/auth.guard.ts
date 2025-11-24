import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    /**
     * 가드 라는 미들웨어임.
     * boolean을 반환.
     * true = handler
     * false = 403 Error
     */

    const request = context.switchToHttp().getRequest();

    // 쿠키가 있으면 인증.
    if (request.cookies['login']) {
      return true;
    }

    // 쿠키가 없으면 request의 body 정보 확인
    if (!request.body.email || !request.body.password) {
      return false;
    }

    const user = await this.authService.validateUser(
      request.body.email,
      request.body.password,
    );

    if (!user) return false;

    request.user = user;
    return true;
  }
}


@Injectable()
export class LocalAuthGuard extends AuthGuard('local'){
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const result = (await super.canActivate(context)) as boolean;

    const request = context.switchToHttp().getRequest();
    await super.logIn(request);

    return result;
  }
}

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    return request.isAuthenticated(); // 세션에서 정보를 읽어서 인증 확인.
  }

}



  @Injectable()
  export class GoogleAuthGuard extends AuthGuard('google'){
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const result = (await super.canActivate(context)) as boolean;

      const request = context.switchToHttp().getRequest();
      await super.logIn(request)
      return result;
      
    }
  }