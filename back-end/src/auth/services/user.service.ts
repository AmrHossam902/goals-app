import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { JwtService } from "@nestjs/jwt";
import { User } from "../models/user.model";
import { Model } from "mongoose";
import { hash, compare } from 'bcrypt';



@Injectable()
export class UserService {

    constructor(
        @InjectModel(User.name) private UserModel: Model<User>,
        private jwtService: JwtService
    ) {}

    async createNewUser(userData: User) {

        // hash password 
        userData.password = await hash(userData.password, 10);

        // save user
        const user = new this.UserModel(userData);
        return user.save()
        .then((res)=>{
            return { success: true }
        })
        .catch((error)=>{
            if(error.code == 11000)
                throw new HttpException("USER_ALREADY_EXISTS", HttpStatus.BAD_REQUEST);
            else{
                console.error(error);
                throw new HttpException("UNKOWN_ERROR", HttpStatus.INTERNAL_SERVER_ERROR);
            }
                
        });
    }


    async loginUser(userData: Pick<User, 'email' | 'password'> ){
        return this.UserModel.findOne({
            email: userData.email
        })
        .then( (user) =>{
            if(!user){
                throw new HttpException('INVALID_EMAIL_OR_PASSWORD', HttpStatus.BAD_REQUEST);
            }
            
            return new Promise(( fullfil, reject )=>{
                compare(userData.password, user.password, (err, isMatch)=>{
                    console.log(isMatch);
                    if(isMatch)
                        fullfil(user);
                    else
                        reject("INVALID_PASSWORD");
                })
            })
        })
        .then((user: User)=>{
            
            // generate JWT
            const content = {
                email: user.email,
                id: user._id
            }

            const accessToken = this.jwtService.sign(content, { expiresIn : '1h'});
            const refreshToken = this.jwtService.sign(content, {expiresIn : '1d' });

            return {
                accessToken,
                refreshToken
            }

        })
        .catch((error)=>{
            if(error == "INVALID_PASSWORD")
                throw new HttpException('INVALID_EMAIL_OR_PASSWORD', HttpStatus.BAD_REQUEST);
            else{
                console.error(error)
                throw new HttpException('UNKNOWN_ERROR', HttpStatus.INTERNAL_SERVER_ERROR);
            }
        })

    }

    async refreshAccessToken(refreshToken: string){
    try {
        const payload = this.jwtService.verify(refreshToken);
        const newAccessToken = this.jwtService.sign({ id: payload.id, email: payload.email }, { expiresIn: '5m' });
    
        return { accessToken: newAccessToken };
        } catch (err) {
        throw new UnauthorizedException('Invalid refresh token');
        }
    }

    async getUserById(id: string): Promise<User| null> {
        return this.UserModel.findById(id);
    }

    async getAllUsers(){
        return this.UserModel.find();
    }




}