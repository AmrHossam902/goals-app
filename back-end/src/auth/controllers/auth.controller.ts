import { Body, Controller, Get, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../models/user.model';
import { Model } from 'mongoose';
import { UserService } from '../services/user.service';

@Controller('auth')
export class AuthController {

    constructor(
        private userService: UserService 
    ){}

    @Get('test')
    test(){
        return 'ok';
    }

    @Post()
    async createNewUser(@Body() req: User): Promise<User> {
        console.log('Creating new user:', req);
        return this.userService.createNewUser(req);
    }

    @Get()
    async getAllUsers(){
        return this.userService.getAllUsers();
    }
}
