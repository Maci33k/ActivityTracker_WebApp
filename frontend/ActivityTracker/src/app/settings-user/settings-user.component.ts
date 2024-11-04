import { Component, OnInit } from '@angular/core';
import { slideInFromLeftAnimation } from '../animations';
import { CommonModule } from '@angular/common';
import { slideAnimation } from '../animations';
import { ConfigService } from '../services/config.service';
import { UserConfigModel } from '../models/user-config.model';
import { UserSharedService } from '../shared/user-shared.service';
import { ConfigSharedService } from '../shared/config-shared.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-settings-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  animations: [slideInFromLeftAnimation,
               slideAnimation
  ],
  templateUrl: './settings-user.component.html',
  styleUrl: './settings-user.component.scss'
})
export class SettingsUserComponent implements OnInit {

  constructor(private configService: ConfigService,
              private userData: UserSharedService,
              public configData: ConfigSharedService
  ){}
   heightClicked: boolean = false;
   weightClicked: boolean = false;
   genderClicked: boolean = false;
   fitnessClicked: boolean = false;
   hideForm: boolean = false;

   height: number = 0;
   weight: number = 0;
   gender: string = '';
   fitness: string = '';

   ngOnInit(): void {
    this.userData.loadFromLocalStorage();
    this.getUserConfig();
   }

  heightClick(): void {
    this.heightClicked = !this.heightClicked;
    console.log(this.heightClicked);
   // this.hideForm = !this.hideForm;
  }

  weightClick(): void {
    this.weightClicked = !this.weightClicked;
    console.log(this.weightClicked);
  }

  genderClick(): void {
    this.genderClicked = !this.genderClicked;
  }

  fitnessClick(): void {
    this.fitnessClicked = !this.fitnessClicked;
  }

  stopPropagations(event: Event) {
    event.stopPropagation();
  }

  onSubmitHeight(event: Event) {
    event.stopPropagation();
    this.updateUserConfig();
    this.heightClicked = !this.heightClicked;
    console.log(this.heightClicked);
   // this.hideForm = !this.hideForm;
    console.log(this.height);
  }

  onSubmitWeight(event: Event) {
    event.stopPropagation();
    this.updateUserConfig();
    this.weightClicked = !this.weightClicked;
  }

  onSubmitGender(event: Event) {
    event.stopPropagation();
    this.updateUserConfig();
    this.genderClicked = !this.genderClicked;
  }

  onSubmitFitness(event: Event) {
    event.stopPropagation();
    this.updateUserConfig();
    this.fitnessClicked = !this.fitnessClicked;
  }

  updateUserConfig() {

    let config: UserConfigModel = {
      id: this.userData.userConfigID!,
      height: this.configData.height,
      weight: this.configData.weight,
      gender: this.configData.gender,
      fitness: this.configData.fitness
    };


      if (this.heightClicked) {
        config = {
          id: this.userData.userConfigID!,
          height: this.height,
          weight: this.configData.weight,
          gender: this.configData.gender,
          fitness: this.configData.fitness
        };
      }
      if (this.weightClicked) {
        config = {
          id: this.userData.userConfigID!,
          height: this.configData.height,
          weight: this.weight,
          gender: this.configData.gender,
          fitness: this.configData.fitness
        };
      }
      if (this.genderClicked) {
        config = {
          id: this.userData.userConfigID!,
          height: this.configData.height,
          weight: this.configData.weight,
          gender: this.gender,
          fitness: this.configData.fitness
        };
      }
      if (this.fitnessClicked) {
        config = {
          id: this.userData.userConfigID!,
          height: this.configData.height,
          weight: this.configData.weight,
          gender: this.configData.gender,
          fitness: this.fitness
        };
      }

      if(this.heightClicked || this.weightClicked || this.genderClicked || this.fitnessClicked) {
    this.configService.updateUserConfig(config).subscribe({
      next: (res: any) => {
        console.log(res);
        this.getUserConfig();
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }
}

  getUserConfig() {
    this.configService.getUserConfig(this.userData.userConfigID!).subscribe({
      next: (data: any) => {
        this.configData.height = data.height;
        this.configData.weight = data.weight;
        this.configData.gender = data.gender;
        this.configData.fitness = data.fitness;
        console.log(data);
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

}
