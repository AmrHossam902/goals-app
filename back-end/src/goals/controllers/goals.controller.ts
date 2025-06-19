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
    async createNewGoal(@CurrentUser() user:User, @Body() goalData: Goal){
        
        console.log('Creating new goal:', goalData);

        goalData.ownerId = new Types.ObjectId(user._id);
        return this.goalsService.createNewGoal(goalData);
     
    }


    @UseGuards(JwtAuthGuard)
    @Get()
    async getMyGoals(@CurrentUser() user: User) : Promise<Goal[]> {
        return this.goalsService.getUserGoals(user._id!);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async updateGoal(@Param('id') id: string, @CurrentUser()user:User, @Body() goalData: Goal){
        goalData._id = id; 
        return this.goalsService.putGoal(user._id!, goalData);
    }

}
