import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { AuthService } from '../auth.service';
import { IUserData } from '../interfaces/IUserData';

@Component({
  selector: 'app-signup',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    InputTextModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {


  signupForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  requestStatus: 'INIT' | 'PENDING' | 'SUCCESS' | 'ERROR' = 'PENDING';
  errorMsg = '';

  constructor(private authService: AuthService) {}

  onSubmit() {
    if(this.signupForm.invalid){
      return;
    }

    this.errorMsg = '';
    this.authService.signup(this.signupForm.value as IUserData)
    .subscribe({
      next: (res)=>{
        this.requestStatus = 'SUCCESS';
      },
      error: (error)=>{
        this.requestStatus = 'ERROR';
        this.errorMsg = error.message;
      }
    });


  }

}
