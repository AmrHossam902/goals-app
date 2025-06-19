import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUserData } from './interfaces/IUserData';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  signup(userData:IUserData){
    return this.http.post('http://localhost:3000/auth/register', userData);
  }

  login(userCredentials: Partial<IUserData>){
    return this.http.post<{accessToken: string, refreshToken: string}>('http://localhost:3000/auth/login', userCredentials);
  }

  refreshAccessToken(){
    return this.http.post<{ accessToken: string }>('http://localhost:3000/auth/refresh',{
      refreshToken: this.getToken('refreshToken')
    });
  }

  setToken(type: 'accessToken' | 'refreshToken',token: string){
    localStorage.setItem(type, token);
  }

  getToken(type: 'accessToken' | 'refreshToken'){
    return localStorage.getItem(type);
  }


}