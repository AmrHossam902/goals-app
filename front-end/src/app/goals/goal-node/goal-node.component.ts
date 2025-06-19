import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TreeNode } from 'primeng/api';
import { DatePickerModule } from 'primeng/datepicker';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { GoalsService } from '../goals.service';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';

type PrivateViewType = 'DISPLAY' | 'EDIT';

@Component({
  selector: 'goal-node',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    DatePickerModule,
    ToggleSwitchModule,
    InputTextModule, 
    TextareaModule,

  ],
  templateUrl: './goal-node.component.html',
  styleUrl: './goal-node.component.scss'
})
export class GoalNodeComponent implements OnInit {
  
  @Input()
  treeNode!: TreeNode;

  @Input()
  viewType: 'PUBLIC' | 'PRIVATE' = 'PRIVATE';
  privateViewType: PrivateViewType = 'DISPLAY';

  @Output()
  createChildEvent: EventEmitter<TreeNode> = new EventEmitter();
  
  editForm!: FormGroup;
  editErrors: string[] = [];
  editRequestStatus: 'INIT' | 'PENDING' | 'SUCCESS' | 'ERROR' = 'INIT';

  constructor(private goalsService: GoalsService){}

  ngOnInit() {
    this.initializeEditForm();
  }

  swtichViewModeTo(mode: PrivateViewType){
    this.privateViewType = mode;
  }

  initializeEditForm() {
    console.log(this.treeNode.data);

    this.editForm = new FormGroup({
      title: new FormControl(this.treeNode.data.title, Validators.required),
      description: new FormControl(this.treeNode.data.description, Validators.required),
      deadLine: new FormControl<Date>(new Date(this.treeNode.data.deadline) ,[Validators.required]),
      isPublic: new FormControl(this.treeNode.data.isPublic)
    });

    this.editForm.valueChanges.subscribe((value) => {
      //reset errors
      this.editErrors = [];
    })
  }

  updateGoal() {
    //validate form
    if (! this.editForm.value['title'] || 
      !this.editForm.value['description'] || 
      !this.editForm.value['deadLine']) {
        this.editErrors.push("some fields are missing");
        return;
    }

    this.editRequestStatus = 'PENDING';
    this.editErrors= [];
    this.goalsService.updateGoal({
      _id: this.treeNode.data._id,
      title: this.editForm.value['title'],
      description: this.editForm.value['description'],
      deadline: this.editForm.value['deadLine'],
      isPublic: this.editForm.value['isPublic']
    })
    .subscribe((res)=>{
      setTimeout(() => { 
        this.editRequestStatus = 'SUCCESS'
        this.swtichViewModeTo('DISPLAY'); 
      }, 1000);
    }, (error)=>{
      this.editErrors.push(error.error.message);
      this.editRequestStatus = 'ERROR';
    })

  }

  onCreateChild(parentNode: TreeNode){
    this.createChildEvent.emit(parentNode);
  }


}
