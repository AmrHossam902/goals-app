import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Goal } from "../models/goal.model";
import { Model, Types } from "mongoose";

@Injectable()
export class GoalsService {

    constructor(
        @InjectModel(Goal.name) private readonly goalModel: Model<Goal>
    ){}

    async createNewGoal(goalData: Goal): Promise<Goal> {
        //set public id if goal is public
        if(goalData.isPublic){
            goalData.publicId = new Types.ObjectId();
        }

        const goal = new this.goalModel(goalData);
        
        if(goalData.parentId){
            await this.goalModel.updateOne({
                _id: new Types.ObjectId(goalData.parentId)
            },
            {
                $push: { childGoals: new Types.ObjectId(goal._id) }
            });
        }
        
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
                new Date(parentGoal.deadline) < new Date(goalData.deadline)
            ){
                throw new HttpException("DEADLINE_CONFLICT_WITH_PARENT_GOAL", HttpStatus.BAD_REQUEST);
            }
        } 


        //remove publicId if isPublic is set to falses
        let updateObj = { $set: goalData }
        if(goalData.isPublic && !goalData.publicId){
            goalData.publicId = new Types.ObjectId();
        }
        if(!goalData.isPublic){
            updateObj['$unset'] = { publicId: "" } 
            delete goalData.publicId;
        }

        return this.goalModel.updateOne({ _id: goalData._id }, updateObj)
        
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

    async getPublicGoalById(publicId: string){

        return this.goalModel.findOne({ publicId: new Types.ObjectId(publicId) , isPublic: true})
        .populate({
            path: 'childGoals',
            match: { isPublic: true },
            populate: {
                path: 'childGoals',
                match: { isPublic: true },
                model: 'Goal'
            }
        })
        .exec()
        .then((res)=>{
            if(!res)
                throw new HttpException("PUBLIC_GOAL_NOT_FOUND", HttpStatus.NOT_FOUND)
            return res;
        });
    }

    async getAllPublicGoals(){
        return this.goalModel.find({ parentId: null, isPublic: true });
    }

}