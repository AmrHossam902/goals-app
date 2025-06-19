import { CommonModule } from '@angular/common';
import { Component, OnInit, Optional } from '@angular/core';
import { TreeDragDropService, TreeNode } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TreeModule } from 'primeng/tree';
import { GoalsService } from '../goals.service';
import { IGoal } from '../IGoal';
import { NewGoalComponent } from '../new-goal/new-goal.component';
import { GoalNodeComponent } from '../goal-node/goal-node.component';

@Component({
  selector: 'app-my-goals',
  imports: [
    CommonModule, 
    ButtonModule, 
    TreeModule,
    DialogModule,
    CommonModule,
    NewGoalComponent,
    GoalNodeComponent
  ],
  providers: [TreeDragDropService],
  templateUrl: './my-goals.component.html',
  styleUrl: './my-goals.component.scss'
})
export class MyGoalsComponent implements OnInit{
  
  visible: boolean = false;
  nodes!: TreeNode[];
  newGoalFormParentNodeRef: TreeNode | null = null;

  constructor(
    @Optional() public dragDropService: TreeDragDropService,
          public goalsService: GoalsService  
    ) {}

  ngOnInit(){
    this.goalsService.getGoals().subscribe((data: any) => {
      console.log('Goals data:', data);
      this.nodes = data.map((goal: IGoal) => this.mapGoalToNode(goal, 0));
    })
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


  toggleNode(node: TreeNode) {
    node.expanded = !node.expanded;
  }

  showModal(){
    this.visible = true;
  }

  hideModal(){
    this.visible = false;
  }

  onNewGoalCreated( { parentNode, newGoal }: { parentNode: TreeNode | null, newGoal: IGoal} ){
    this.hideModal();
    
    if(!parentNode){
      this.nodes.push({
          label: newGoal.title,
          data: {
            ...newGoal,
            level: 0,
          },
          expanded: false,
      });
      return;
    }

    if(!parentNode.children)
      parentNode.children = [];

    parentNode.children.push({
      label: newGoal.title,
          data: {
            ...newGoal,
            level: parentNode.data.level + 1,
          },
          expanded: false,
    })

  }

  onCreateRootGoal(){
    this.newGoalFormParentNodeRef = null;
    this.showModal();
  }

  onCreateChildGoal(parentNode: TreeNode){
    console.log("create child goal")
    this.newGoalFormParentNodeRef = parentNode;
    this.showModal();
  }
}
