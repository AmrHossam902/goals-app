import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../services/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // placeholder
      ignoreExpiration: false,
      secretOrKey: 'd84a0c5c9c0f943bddc3e7064f48c94b233c247a2f6c73fd97f0e6a83d1beab9', // will be updated later
    });
  }

  async validate(payload: any) {
    // just return payload for now
    // return payload;

    // return this.userService.getUserById(payload.sub)
    return {
      _id: payload.id,
      email: payload.email
    }
  }
}
