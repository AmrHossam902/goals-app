import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './models/user.model';
import { UserService } from './services/user.service';
import { JwtAuthGuard } from './guards/auth.guard';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './guards/jwt-strategy';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema }
    ]),
    PassportModule,
    JwtModule.register({
      secret: 'd84a0c5c9c0f943bddc3e7064f48c94b233c247a2f6c73fd97f0e6a83d1beab9',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    UserService,
    JwtStrategy
  ],
  exports: [MongooseModule, PassportModule],
})
export class AuthModule {}
