import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/auth/models/user.model';

@Module({
    imports:[
        MongooseModule.forRoot(`mongodb://root:example@localhost:27017/goals?authSource=admin`),
    ]
})
export class DbModule {}
