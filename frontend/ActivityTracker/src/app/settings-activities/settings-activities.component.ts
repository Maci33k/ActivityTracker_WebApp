import { Component, OnInit } from '@angular/core';
import { IconsService } from '../services/icons.service';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { slideInAnimation } from '../animations';
import { fadeSlideAnimation } from '../animations';
import { ConfigService } from '../services/config.service';
import { UserSharedService } from '../shared/user-shared.service';
import { TrackedActivitiesModel } from '../models/tracked-activities.model';
import { ConfigSharedService } from '../shared/config-shared.service';
import { slideInFromLeftAnimation } from '../animations';


@Component({
  selector: 'app-settings-activities',
  standalone: true,
  imports: [CommonModule],
  animations: [slideInAnimation, fadeSlideAnimation, slideInFromLeftAnimation],
  templateUrl: './settings-activities.component.html',
  styleUrl: './settings-activities.component.scss'
})
export class SettingsActivitiesComponent implements OnInit {

    constructor(public icons: IconsService,
                private configService: ConfigService,
                private userData: UserSharedService,
                protected configData: ConfigSharedService){}

    draggedIcon: any;
    draggedIndex: number | null = null;
    numberOfCustomFields = 0;
    thisPageIcons = this.icons.icons.slice();

      ngOnInit(): void {
          this.getTrackedActivities();
      }

      onDragStart(event: DragEvent, icon: any, index: number) {
        this.draggedIcon = icon;
        this.draggedIndex = index;
        event.dataTransfer?.setData('application/json', JSON.stringify(icon));
      }

    onDrop(event: DragEvent) {
      event.preventDefault();
      const data = event.dataTransfer?.getData('application/json');
      const icon = data ? JSON.parse(data) : null;
      const element = event.target as HTMLElement;
      element.classList.remove('drag-over');

      if (element !== event.currentTarget) {
        event.stopPropagation();
        return;
      }

    //  if (icon && this.numberOfCustomFields < 5) {
      //  const newElement = document.createElement('i');
      //  newElement.className = icon.class;
      //  newElement.style.color = 'white';
      //  newElement.style.fontSize = '300%';
      //  if (this.numberOfCustomFields !== 0) {
       //   newElement.style.marginLeft = '10%';
       // }
       // element.appendChild(newElement);
    //d  }
      if (this.draggedIndex !== null) {
        this.numberOfCustomFields++;
        this.updateTrackedActivities();
      }
    }

    onDragOver(event: DragEvent) {
      event.preventDefault();
      const element = event.target as HTMLElement;
      element.classList.add('drag-over');
    }

    postTrackedActivities() {

      const trackedActivities: TrackedActivitiesModel = {
        id: 0,
        steps: this.configData.steps,
        calories: this.configData.calories,
        water: this.configData.water,
        sleepTime: this.configData.sleepTime,
        training: this.configData.training
      }

      this.configService.postTrackedActivities(trackedActivities, this.userData.userConfigID!).subscribe({
        next: (res) => {
          console.log(res);
          this.getTrackedActivities();
        },
        error: (err) => {
          console.log(err);
        }
      });
    }

    getTrackedActivities() {
      this.configService.getTrackedActivities(this.userData.userConfigID!).subscribe({
        next: (data) => {
          console.log("Tracked Activities: ", data);
          this.configData.steps = data.steps;
          this.configData.calories = data.calories;
          this.configData.water = data.water;
          this.configData.sleepTime = data.sleepTime;
        },
        error: (err) => {
          console.log(this.userData.userConfigID!);
          console.log(err);
          if(this.userData.userConfigID != null) {
            this.postTrackedActivities();
          }
        }
      });
    }

    updateTrackedActivities() {
      if(this.draggedIcon.name == 'Trening') {
        this.configData.training = true;
      }
      if(this.draggedIcon.name == 'Woda') {
        this.configData.water = true;
      }
      if(this.draggedIcon.name == 'Kroki') {
        this.configData.steps = true;
      }
      if(this.draggedIcon.name == 'Kalorie') {
        this.configData.calories = true;
      }
      if(this.draggedIcon.name == 'Sen') {
        this.configData.sleepTime = true;
      }
      const trackedActivities: TrackedActivitiesModel = {
        id: 0,
        steps:  this.configData.steps,
        calories: this.configData.calories,
        water: this.configData.water,
        sleepTime: this.configData.sleepTime,
        training: this.configData.training
      }
      this.putTrackedActivities(trackedActivities);

    }

    putTrackedActivities(trackedActivities: TrackedActivitiesModel) {
      this.configService.putTrackedActivities(trackedActivities, this.userData.userConfigID!).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.log(err);
        }
      });
    }

    removeTrackedActivity(activityName: string) {
      if(activityName == 'steps') {
        this.configData.steps = false;
      }
      if(activityName == 'training') {
        this.configData.training = false;
      }
      if(activityName == 'water') {
        this.configData.water = false;
      }
      if(activityName == 'calories') {
        this.configData.calories = false;
      }
      if(activityName == 'sleep') {
        this.configData.sleepTime = false;
      }
      const trackedActivities: TrackedActivitiesModel = {
        id: 0,
        steps:  this.configData.steps,
        calories: this.configData.calories,
        water: this.configData.water,
        sleepTime: this.configData.sleepTime,
        training: this.configData.training
      }
      this.putTrackedActivities(trackedActivities);

    }
}
