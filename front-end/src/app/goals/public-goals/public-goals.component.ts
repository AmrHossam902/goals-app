import { Component, OnInit } from '@angular/core';
import { GoalsService } from '../goals.service';
import { TreeNode } from 'primeng/api';
import { IGoal } from '../IGoal';
import { TreeModule } from 'primeng/tree';
import { GoalNodeComponent } from '../goal-node/goal-node.component';

@Component({
  selector: 'public-goals',
  imports: [TreeModule, GoalNodeComponent],
  templateUrl: './public-goals.component.html',
  styleUrl: './public-goals.component.scss'
})
export class PublicGoalsComponent implements OnInit {

  constructor(
    private goalsService: GoalsService
  ){}

  requestStatus: 'FETCHING' | 'COMPLETE' | 'FAILED' = 'FETCHING';
  goalNodes: TreeNode[] = [];

  ngOnInit(){
    this.goalsService.getAllPublicGoals()
    .subscribe({
      next: (publicGoals: IGoal[]) => {
        this.goalNodes = publicGoals.map( 
          (pGoal) => { 
            return {
              label: pGoal.title,
              data: {
                ...pGoal
              },
              expanded: false,
            }
          } 
        )

        this.requestStatus = 'COMPLETE';
      },
      error: (err)=>{}
    })
  }
  
  

}
