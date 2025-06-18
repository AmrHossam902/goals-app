import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { Goal } from '../models/goal.model';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Model, Types } from 'mongoose';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
import { User } from 'src/auth/models/user.model';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';
import { GoalsService } from '../services/goals.service';

@Controller('goals')
export class GoalsController {

    constructor(
        @InjectModel(Goal.name) private readonly goalModel: Model<Goal>,
        public goalsService: GoalsService
    ){}

    @UseGuards(JwtAuthGuard)
    @Post()
    async createNewGoal(@CurrentUser() user, @Body() goalData: Goal){
        
        console.log('Creating new goal:', goalData);

        goalData.ownerId = new Types.ObjectId("68515ba30643eef9f60ffd1e");
        return this.goalsService.createNewGoal(goalData);
     
    }


    @UseGuards(JwtAuthGuard)
    @Get()
    async getMyGoals(@CurrentUser() user: User) : Promise<Goal[]> {
        
        return this.goalsService.getUserGoals("68515ba30643eef9f60ffd1e");
        console.log(user);
/*         return [
            {
                _id: "6851ea341fcd54ee5dc345ab",
                title: 'Goal 1',
                description: 'Description for goal 1',
                deadline: new Date(),
                isPublic: false,
                order: 0,
                ownerId: new Types.ObjectId("68515ba30643eef9f60ffd1e"),
                childGoals: [
                    {
                        _id: "dhkds78349234ghjdsf",
                        title: 'Child Goal 1',
                        description: 'Description for child goal 1',
                        deadline: new Date(),
                        isPublic: false,
                        order: 0,
                        parentId: new Types.ObjectId("6851ea341fcd54ee5dc345ab"),
                        ownerId: new Types.ObjectId("68515ba30643eef9f60ffd1e"),
                    },
                    {
                        _id: "gyuewc87432asdefef",
                        title: 'Child Goal 2',
                        description: 'Description for child goal 2',
                        deadline: new Date(),
                        isPublic: false,
                        order: 0,
                        parentId: new Types.ObjectId("6851ea341fcd54ee5dc345ab"),
                        ownerId: new Types.ObjectId("68515ba30643eef9f60ffd1e"),
                    }
                ]
            },
            {
                _id: "jfi39is903bsd238ds9d8f",
                title: 'Goal 2',
                description: 'Description for goal 2',
                deadline: new Date(),
                isPublic: false,
                order: 1,
                ownerId: new Types.ObjectId("68515ba30643eef9f60ffd1e")
            }
        ] */
    }


    @Get(':id')
    async getGoal(@Param('id') id: string){
        return this.goalsService.getGoalById(id);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async updateGoal(@Param('id') id: string, @CurrentUser()user, @Body() goalData: Goal){
        goalData._id = id; 
        return this.goalsService.putGoal("68515ba30643eef9f60ffd1e", goalData);
    }

}
