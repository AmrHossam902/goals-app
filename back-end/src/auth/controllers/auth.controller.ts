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


    @Post('register')
    async registerNewUser(@Body() data: User){
        return this.userService.createNewUser(data);
    }

    @Post('login')
    async loginUser(@Body() credentials : Pick<User, 'email' | 'password'>){
        return this.userService.loginUser(credentials);
    }

    @Post('refresh')
    async refreshAccessToken(@Body('refreshToken') refreshToken: string){
        return this.userService.refreshAccessToken(refreshToken);
    }

    @Get()
    async getAllUsers(){
        return this.userService.getAllUsers();
    }
}
