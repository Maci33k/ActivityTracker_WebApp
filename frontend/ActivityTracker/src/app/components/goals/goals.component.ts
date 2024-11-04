import { Component, OnInit } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { GoalsService } from 'src/app/services/goals.service';
import { GoalModel } from 'src/app/models/goal.model';
import { UserSharedService } from 'src/app/shared/user-shared.service';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PopUpGoalComponent } from '../pop-up-goal/pop-up-goal.component';
import { GoalsSharedService } from 'src/app/shared/goals-shared.service';
import { slideInFromLeftAnimation } from 'src/app/animations';

@Component({
  selector: 'app-goals',
  standalone: true,
  imports: [BsDropdownModule, CommonModule],
  animations: [slideInFromLeftAnimation],
  templateUrl: './goals.component.html',
  styleUrl: './goals.component.scss'
})
export class GoalsComponent implements OnInit {
  constructor(private goalsService: GoalsService, private userData: UserSharedService, public dialog: MatDialog,
              private goalsData: GoalsSharedService
  ){}

  ngOnInit(): void {
    this.onClick();
  }
  goal: GoalModel | undefined;
  onClick() {

    this.goalsService.getGoals(this.userData.userID!).subscribe({
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

  openDialog(goalType: string): void {
    const dialogRef = this.dialog.open(PopUpGoalComponent, {
      data: { message: goalType }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.onClick();
    });
  }

  deleteStepsGoal() {
    this.goalsService.updateStepsGoal(this.userData.userID!, 0).subscribe({
      next: (res) => {
        console.log(res);
        this.onClick();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  deleteCaloriesGoal() {
    this.goalsService.updateCaloriesGoal(this.userData.userID!, 0).subscribe({
      next: (res) => {
        console.log(res);
        this.onClick();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  deleteWaterGoal() {
    this.goalsService.updateWaterGoal(this.userData.userID!, 0).subscribe({
      next: (res) => {
        console.log(res);
        this.onClick();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

}
