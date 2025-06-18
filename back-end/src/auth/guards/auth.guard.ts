import { CanActivate, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(context: any): boolean {
    return true;
  }
}
//export class JwtAuthGuard extends AuthGuard('jwt'){}
