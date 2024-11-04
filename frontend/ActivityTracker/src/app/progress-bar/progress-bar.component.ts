import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';


@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [],
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.scss'
})
export class ProgressBarComponent {

  @Input() experience: number = 0;
  @Input() maxExperience: number = 350;


  increaseExperience() {
    if (this.experience < this.maxExperience) {
      this.experience += 3;
    }
  }

}
