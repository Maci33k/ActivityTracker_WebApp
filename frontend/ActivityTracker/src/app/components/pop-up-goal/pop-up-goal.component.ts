import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field'; // Dodaj ten import
import { MatInputModule } from '@angular/material/input'; // Dodaj ten import
import { GoalsService } from 'src/app/services/goals.service';
import { UserSharedService } from 'src/app/shared/user-shared.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GoalsSharedService } from 'src/app/shared/goals-shared.service';

@Component({
  selector: 'app-pop-up-goal',
  standalone: true,
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule, CommonModule, FormsModule],
  templateUrl: './pop-up-goal.component.html',
  styleUrl: './pop-up-goal.component.scss'
})
export class PopUpGoalComponent {
  constructor(
    public dialogRef: MatDialogRef<PopUpGoalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string },
    private goalsService: GoalsService,
    private userData: UserSharedService,
    private goalsData: GoalsSharedService
  ) {}

  calories: number = 0;
  steps: number = 0;
  water: number = 0;

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(goalType: string): void {
    this.updateGoals(goalType);
    this.dialogRef.close();
  }

  updateGoals(goalType: string) {
    if(goalType == 'steps') {
    this.goalsService.updateStepsGoal(this.userData.userID!, this.steps).subscribe({
      next: (res) => {
        this.goalsData.stepsGoal = this.steps;
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  if(goalType == 'calories') {
    this.goalsService.updateCaloriesGoal(this.userData.userID!, this.calories).subscribe({
      next: (res) => {
        console.log(this.calories);
        this.goalsData.caloriesGoal = this.calories;
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  if(goalType == 'water') {
    this.goalsService.updateWaterGoal(this.userData.userID!, this.water).subscribe({
      next: (res) => {
        this.goalsData.waterGoal = this.water;
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  }
}
