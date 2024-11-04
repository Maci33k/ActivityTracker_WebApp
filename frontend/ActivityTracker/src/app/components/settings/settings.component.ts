import { Component } from '@angular/core';
import { slideInFromLeftAnimation } from 'src/app/animations';
import { Router, RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [RouterModule],
  animations: [slideInFromLeftAnimation],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
  constructor(private route: ActivatedRoute) {}
  getCurrentRoute() {
    this.route.url.subscribe(url => {
      console.log('Current route:', url);
    });
  }

}
