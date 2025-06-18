import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IGoal } from './IGoal';

@Injectable({
  providedIn: 'root'
})
export class GoalsService {

  constructor(private http: HttpClient) { }

  getGoals() {
    return this.http.get('http://localhost:3000/goals');
  }

  createNewGoal(goal:IGoal){
    return this.http.post('http://localhost:3000/goals', goal);
  }

  updateGoal(goal: IGoal) {
    return this.http.put(`http://localhost:3000/goals/${goal._id}`, goal);
  }

}
