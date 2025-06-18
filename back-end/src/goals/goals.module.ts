import { Module } from '@nestjs/common';
import { GoalsController } from './controllers/goals.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Goal, GoalSchema } from './models/goal.model';
import { GoalsService } from './services/goals.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Goal.name,
        schema: GoalSchema
      }
    ]) 
  ],
  controllers: [GoalsController],
  providers: [GoalsService],
})
export class GoalsModule {}
