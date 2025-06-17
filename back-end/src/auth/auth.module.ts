import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './models/user.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema }
    ])
  ],
  controllers: [AuthController],
  exports: [MongooseModule],
})
export class AuthModule {}
