import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Goal } from "../models/goal.model";
import { Model, Types } from "mongoose";

@Injectable()
export class GoalsService {

    constructor(
        @InjectModel(Goal.name) private readonly goalModel: Model<Goal>
    ){}

    async createNewGoal(goalData: Goal): Promise<Goal> {
        const goal = new this.goalModel(goalData);
        return goal.save();
    }

    async getUserGoals(userId: string): Promise<Goal[]> {

        // get first level goals 
        return this.goalModel.find({ ownerId: new Types.ObjectId(userId), parentId: null })
        .populate({
            path: 'childGoals',
            populate: {
                path: 'childGoals',
                model: 'Goal'
            }
        })
        .limit(10)
        .exec();

    }


}