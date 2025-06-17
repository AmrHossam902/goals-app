import { Body, Controller, Post } from '@nestjs/common';
import { Goal } from '../models/goal.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

@Controller('goals')
export class GoalsController {

    constructor(
        @InjectModel(Goal.name) private readonly goalModel: Model<Goal>
    ){}

    @Post()
    async createNewGoal(@Body() req: Goal){
        
        console.log('Creating new goal:', req);

        const goal = new this.goalModel({

            title: req.title,
            description: req.description,
            order: 0,
            ownerId: new Types.ObjectId(req.ownerId),
        });

        return goal.save();

/*         id: string;
        title: string;
        description: string;
        deadline: string; // ISO Date
        isPublic: boolean;
        parentId?: string | null;
        order: number; // For custom ordering
        publicId?: string; // Public read-only share link
        ownerId: string; */
     
    }

}
