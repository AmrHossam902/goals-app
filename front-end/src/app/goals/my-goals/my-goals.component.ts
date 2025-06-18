import { CommonModule } from '@angular/common';
import { Component, OnInit, Optional } from '@angular/core';
import { TreeDragDropService, TreeNode } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TreeModule } from 'primeng/tree';
import { GoalsService } from '../goals.service';
import { IGoal } from '../IGoal';
import { NewGoalComponent } from '../new-goal/new-goal.component';

@Component({
  selector: 'app-my-goals',
  imports: [
    CommonModule, 
    ButtonModule, 
    TreeModule,
    DialogModule,
    CommonModule,
    NewGoalComponent
  ],
  providers: [TreeDragDropService],
  templateUrl: './my-goals.component.html',
  styleUrl: './my-goals.component.scss'
})
export class MyGoalsComponent implements OnInit{
  
  visible: boolean = false;
  
  constructor(
    @Optional() public dragDropService: TreeDragDropService,
          public goalsService: GoalsService  
    ) {}

  ngOnInit(){
    this.goalsService.getGoals().subscribe((data: any) => {
      console.log('Goals data:', data);
      this.nodes = data.map((goal: IGoal) => this.mapGoalToNode(goal));
    })
  }

  mapGoalToNode(data: IGoal): TreeNode{
    let node: TreeNode = {
      label: data.title,
      data: {
        ...data
      },
      expanded: false,
    }

    if (data.childGoals && data.childGoals.length > 0) {
      node.children = data.childGoals.map(child => this.mapGoalToNode(child));
    }

    return node;
  }

  nodes!: TreeNode[];
  
  /* [
    {
      label: 'goal 1',
      data: {
        title: 'Goal 1',
        description: 'Description for Goal 1',
        level: 1
      },
      expanded: false,
      children: [
        {
          label: 'sub-goal 1-1',
          data: {
            title: 'Sub-Goal 1-1',
            description: 'Description for Goal 1',
            level: 2
          },
        },
        {
          label: 'sub-goal 1-2',
          data: {
            title: 'Sub-Goal 1-2',
            description: 'Description for Goal 1',
            level: 2
          },
        }
      ]
    },
    {
      label: 'Goal2',
      data: {
        title: 'Goal 2',
        description: 'Description for Goal 2',
      },
      expanded: false
    }
  ]; */


  toggleNode(node: TreeNode) {
    node.expanded = !node.expanded;
  }

  showModal(){
    this.visible = true;
  }
}
