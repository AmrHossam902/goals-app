import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
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

    async getGoalById(goalId: string): Promise<Goal | null> {
        return this.goalModel.findOne({ _id: new Types.ObjectId(goalId) })
            .populate({
                path: 'childGoals',
                populate: {
                    path: 'childGoals',
                    model: 'Goal'
                }
            })
            .exec()
    }


    async putGoal(userId: string, goalData: Goal) {
        const goal = await this.getGoalById(goalData._id);

        if (!goal) {
            throw new HttpException('GOAL_NOT_FOUND', HttpStatus.NOT_FOUND);
        }

        if (goal.ownerId.toString() !== userId) {
            throw new HttpException('UNAUTHORIZED_TO_UPDATE_GOAL', HttpStatus.UNAUTHORIZED);
        }

        //validate deadline against children 
        if(goal.childGoals){

            goal.childGoals.forEach(
                (childGoal) =>{
                    if(new Date(childGoal.deadline) > new Date(goalData.deadline)){
                        throw new HttpException("DEADLINE_CONFILCT_WITH_CHILDREN",HttpStatus.BAD_REQUEST)
                    }
                }
            )
        }

        // validate deadline against parent
        if(goal.parentId){
            const parentGoal = await this.getGoalById(goal.parentId.toString("hex"))

            if(parentGoal && 
                new Date(parentGoal.deadline) < new Date(goal.deadline)
            ){
                throw new HttpException("DEADLINE_CONFLICT_WITH_PARENT_GOAL", HttpStatus.BAD_REQUEST);
            }
        } 

        return this.goalModel.updateOne({ _id: goalData._id }, goalData)
        
    }

}