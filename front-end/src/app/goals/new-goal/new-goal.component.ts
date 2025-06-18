import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { TreeNode } from 'primeng/api';
import { IGoal } from '../IGoal';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
import { ButtonModule } from 'primeng/button';
import { GoalsService } from '../goals.service';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'new-goal',
  imports: [
    InputTextModule, 
    TextareaModule,
    DatePickerModule,
    ButtonModule,
    ToggleSwitchModule,
    CommonModule,
    ProgressSpinnerModule,
    ReactiveFormsModule
  ],
  templateUrl: './new-goal.component.html',
  styleUrl: './new-goal.component.scss'
})
export class NewGoalComponent {

  @Input() 
  parentNode: TreeNode | null = null;

  @Output()
  goalCreated = new EventEmitter<IGoal>();

  goalForm!: FormGroup;
  errors: string[] = [];
  requestStatus: 'INIT' | 'PENDING' | 'SUCCESS' | 'ERROR' = 'INIT'; 
  
  constructor(private goalsService: GoalsService) {
    this.intialializeGoalForm();
  }


  intialializeGoalForm() {
      this.goalForm = new FormGroup({
        title: new FormControl('',Validators.required),
        description: new FormControl('', Validators.required),
        deadLine: new FormControl<Date>(new Date(), [Validators.required, this.deadLineValidator()]),
        isPublic: new FormControl(false)
      });

      this.goalForm.valueChanges.subscribe((value) => {
        //reset errors
        this.errors = [];
      })
  }

  createNewGoal(){

    console.log(this.goalForm.errors);

    // check for errors
    this.errors = [];
    if (this.goalForm.invalid) {
      if (! this.goalForm.value['title'] || 
          !this.goalForm.value['description'] || 
          !this.goalForm.value['deadLine']) {
            this.errors.push("some fields are missing");
          }
      
      if (this.goalForm.errors?.['afterParentDeadline']) {
        this.errors.push("Deadline cannot be after parent goal's deadline");
      }
      return;
    }


    //send request
    this.requestStatus = 'PENDING';
    const newGoal: IGoal = {
      title: this.goalForm.value.title,
      description: this.goalForm.value.description,
      deadline: this.goalForm.value.deadLine,
      isPublic: false,
      order: 0,
      parentId: this.parentNode ? this.parentNode.data._id : null,
    }

    this.goalsService.createNewGoal(newGoal).subscribe(
      (res: any) => {
        setTimeout(()=>{
          this.requestStatus = 'SUCCESS';
        }, 1000); 
      },
      (err: any) => {
        this.requestStatus = 'ERROR';
      }
    ) 
  }



  deadLineValidator(){
    return (control: AbstractControl): ValidationErrors | null => {
            
      if(!this.parentNode) // root goal, no parent to compare
        return null;


      const parentDeadline = this.parentNode.data.deadLine;
      const currentDeadline = control.value;
  
      return new Date(currentDeadline) < new Date(parentDeadline)
        ? null
        : { afterParentDeadline: true };
    };
  }
}
