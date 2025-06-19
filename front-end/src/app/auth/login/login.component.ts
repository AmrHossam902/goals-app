import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from '../auth.service';
import { IUserData } from '../interfaces/IUserData';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  requestStatus: 'INIT' | 'PENDING' | 'SUCCESS' | 'ERROR' = 'INIT';
  errorMsg = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.requestStatus = 'PENDING';

    this.authService.login(this.loginForm.value as IUserData).subscribe({
      next: (res) => {
        this.requestStatus = 'SUCCESS';
        this.authService.setToken('accessToken', res.accessToken);
        this.authService.setToken('refreshToken', res.refreshToken);
        
        this.router.navigate(['/my-goals']);
      },
      error: (error) => {
        this.requestStatus = 'ERROR';
        this.errorMsg = error.error?.message || 'Login failed';
      }
    });
  }

}