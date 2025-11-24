import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    
  constructor(private userService: UserService) {
    console.log(process.env.GOOGLE_CLIENT_ID)
    super({
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: 'http://localhost:3000/auth/google',
      scope: ['email', 'profile'],
    //   passReqToCallback: true,
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    /**
     * null이면 401에러
     */

    const { _json:id, name, emails } = profile;

    if(name === undefined) throw new Error('No username.')

    const providerId = id;
    const email = emails![0].value;

    const user:User = await this.userService.findByEmailOrSave(email, name?.familyName+name?.givenName, providerId)


    return user;
  }
}
