import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "../models/user.model";
import { Model } from "mongoose";


@Injectable()
export class UserService {

    constructor(
        @InjectModel(User.name) private UserModel: Model<User>
    ) {}

    async createNewUser(userData: User): Promise<User> {
        const user = new this.UserModel(userData);
        return user.save();
    }

    async getUserById(id: string): Promise<User| null> {
        return this.UserModel.findById(id);
    }

    async getAllUsers(){
        return this.UserModel.find();
    }



}