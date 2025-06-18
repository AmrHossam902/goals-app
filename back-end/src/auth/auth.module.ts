import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './models/user.model';
import { UserService } from './services/user.service';
import { JwtAuthGuard } from './guards/auth.guard';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './guards/jwt-strategy';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema }
    ]),
    PassportModule
  ],
  controllers: [AuthController],
  providers: [
    UserService,
    JwtStrategy
  ],
  exports: [MongooseModule, PassportModule],
})
export class AuthModule {}
