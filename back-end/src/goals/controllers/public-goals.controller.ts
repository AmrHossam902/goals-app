import { Controller, Get, Param } from "@nestjs/common";
import { GoalsService } from "../services/goals.service";

@Controller('public-goals')
export class PublicGoalsController {

    constructor(private goalsService: GoalsService ){}

    @Get(':id')
    async getGoal(@Param('id') id: string){
        return this.goalsService.getPublicGoalById(id);
    }

    @Get()
    async getAllPublicGoals(){
        return this.goalsService.getAllPublicGoals();
    }
} 