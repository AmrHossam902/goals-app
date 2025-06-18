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
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async updateGoal(@Param('id') id: string, @CurrentUser()user, @Body() goalData: Goal){
        goalData._id = id; 
        return this.goalsService.putGoal("68515ba30643eef9f60ffd1e", goalData);
    }



}
