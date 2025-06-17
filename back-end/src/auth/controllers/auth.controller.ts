import { Body, Controller, Get, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../models/user.model';
import { Model } from 'mongoose';

@Controller('auth')
export class AuthController {

    constructor(@InjectModel(User.name) private UserModel: Model<User>){}

    @Get('test')
    test(){
        return 'ok';
    }

    @Post()
    async createNewUser(@Body() req: User): Promise<User> {
        console.log('Creating new user:', req);
        const user = new this.UserModel(req);
        return user.save();
    }

    @Get()
    async getAllUsers(){
        return this.UserModel.find();
    }
}
