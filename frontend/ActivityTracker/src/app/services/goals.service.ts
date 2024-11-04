import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GoalModel, GoalModelToPut } from '../models/goal.model';
import { Observable } from 'rxjs';
import { UserSharedService } from '../shared/user-shared.service';
import { GoalsSharedService } from '../shared/goals-shared.service';

@Injectable({
  providedIn: 'root'
})
export class GoalsService {

  constructor(private http: HttpClient, private userData: UserSharedService, private goalsData: GoalsSharedService) { }

  urlToGetGoals: string = 'https://localhost:7217/api/Goals/user-id/';

  getGoals(userID: number) {
    return this.http.get(`${this.urlToGetGoals}${userID}`);
  }

  updateStepsGoal(userID: number, steps: number) {
    return this.http.put(`https://localhost:7217/api/Goals/steps/user-id/${userID}?steps=${steps}`, steps);
  }

  updateCaloriesGoal(userID: number, calories: number) {
    return this.http.put(`https://localhost:7217/api/Goals/calories/user-id/${userID}?calories=${calories}`, calories);
  }

  updateWaterGoal(userID: number, water: number) {
    return this.http.put(`https://localhost:7217/api/Goals/water/user-id/${userID}?water=${water}`, water);
  }

  goal: GoalModel | undefined;

  getUserGoals() {
    this.getGoals(this.userData.userID!).subscribe({
      next: (res) => {
        console.log(res);
        this.goal = res;
        console.log(this.goal.userID);
        this.goalsData.caloriesGoal = this.goal.calories!;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  postGoals(userID: number) {
    this.goal = {
      id:  0,
       userID: userID ,
       calories: 0,
        steps: 0,
       water: 0
    };
    return this.http.post('https://localhost:7217/api/Goals', this.goal);
  }
}
