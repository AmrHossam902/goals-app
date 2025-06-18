import { Component } from '@angular/core';
import { TreeDragDropService, TreeNode } from 'primeng/api';
import { TreeModule } from 'primeng/tree';
import { GoalNodeComponent } from '../goal-node/goal-node.component';
import { GoalsService } from '../goals.service';
import { ActivatedRoute } from '@angular/router';
import { concatMap, map, tap } from 'rxjs';
import { IGoal } from '../IGoal';

@Component({
  selector: 'public-goal-view',
  imports: [TreeModule, GoalNodeComponent],
  providers: [TreeDragDropService],
  templateUrl: './public-goal-view.component.html',
  styleUrl: './public-goal-view.component.scss'
})
export class PublicGoalViewComponent {

  constructor(
    private goalsService: GoalsService,
    private route: ActivatedRoute
  ){}

  publicId: string = '';
  goalNode!: TreeNode;
  requestStatus: 'FETCHING' | 'COMPLETE' | 'FAILED' = 'FETCHING';


  ngOnInit(): void {
    this.route.paramMap
    .pipe(
      tap((e) => console.log(e.get('publicId') )),
      map( (e) => e.get('publicId')),
      concatMap((id) => {
        return this.goalsService.getPublicGoal(id as string)
      })
    )
    .subscribe({
      next: (goalData:IGoal)=> {
        this.goalNode = this.mapGoalToNode(goalData, 0);
        this.requestStatus = "COMPLETE";
        
      },
      error: (error)=>{}
    });
  }

  mapGoalToNode(data: IGoal, nodeLevel: number): TreeNode{
    let node: TreeNode = {
      label: data.title,
      data: {
        ...data,
        level: nodeLevel,
      },
      expanded: false,
    }

    if (data.childGoals && data.childGoals.length > 0) {
      node.children = data.childGoals.map(child => this.mapGoalToNode(child, nodeLevel + 1));
    }

    return node;
  }

}
