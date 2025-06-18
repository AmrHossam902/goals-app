import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { UserService } from '../services/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: () => null, // placeholder
      ignoreExpiration: false,
      secretOrKey: 'placeholder-secret', // will be updated later
    });
  }

  async validate(payload: any) {
    // just return payload for now
    // return payload;

    // return this.userService.getUserById(payload.sub)
    return this.userService.getUserById('68515ba30643eef9f60ffd1e')
  }
}
