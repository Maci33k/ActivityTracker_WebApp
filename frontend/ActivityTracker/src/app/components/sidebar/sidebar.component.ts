import { Component, OnInit } from '@angular/core';
import { MainPageComponent } from '../main-page/main-page.component';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AppSharedService } from 'src/app/shared/app-shared.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MainPageComponent,
            CommonModule,
            RouterModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  constructor(private router: Router, private appData: AppSharedService){}
  sidebarOpen = false;
  divWidth = '80%';
  icons = [
    { name: 'Twój dzień', class: 'fa-solid fa-calendar-days' },
    { name: 'Znajomi', class: 'fa-solid fa-user-group' },
    { name: 'Osiągnięcia', class: 'fa-solid fa-trophy' },
    { name: 'Dziennik', class: 'fa-solid fa-book' },
    { name: 'Monitor kalorii', class: 'fa-solid fa-utensils' },
    { name: 'Profil', class: 'fa-solid fa-user' },
    { name: 'Ustawienia', class: 'fa-solid fa-gear' }
  ]

  iconsJournal = [
    { name: 'Wpisz do dziennika', class: 'fa-regular fa-square-plus' },
    { name: 'Przejrzyj', class: 'fa-solid fa-eye' },
    { name: 'Powrót', class: 'fa-solid fa-rotate-left' }
  ]

  iconsSettings = [
    { name: 'Użytkownik', class: 'fa-solid fa-person' },
    { name: 'Aktywności', class: 'fa-solid fa-person-running' },
    { name: 'Cele', class: 'fa-solid fa-bullseye' }
  ]

  iconsMainPage = [
    { name: 'Powiadomienia', class: 'fa-solid fa-envelope' },
    { name: 'Podsumowanie', class: 'fa-solid fa-list' }
  ]
  navBarLocation = this.appData.navBarLocation;



  openNav() {
    this.sidebarOpen = true;
  }

  closeNav() {
    this.sidebarOpen = false;
  }

  navigate(buttonName: string) {
    if(buttonName == 'Znajomi') {
      this.router.navigate(['app/friends']);
    }
    if(buttonName == 'Twój dzień') {
      this.router.navigate(['app/your-day']);
      this.changeNavBarLocation(buttonName);
    }
    if(buttonName == 'Dziennik') {
      this.router.navigate(['app/journal']);
      this.changeNavBarLocation(buttonName);
    }
    if(buttonName == 'Monitor kalorii') {
      this.router.navigate(['app/callories-monitor']);
    }
    if(buttonName == 'Osiągnięcia') {
      this.router.navigate(['app/achievements']);
    }
    if(buttonName == 'Ustawienia') {
      this.changeNavBarLocation(buttonName);
      this.router.navigate(['app/settings']);
    }
    if(buttonName == 'Profil') {
      this.router.navigate(['app/profile']);
    }
    if(buttonName == 'Powrót') {
      this.router.navigate(['app/your-day']);
    }
    if(buttonName == 'Przejrzyj') {
      this.router.navigate(['app/data']);
    }
    if(buttonName == 'Wpisz do dziennika') {
      this.router.navigate(['app/journal']);
    }
    if(buttonName == 'Użytkownik') {
      this.router.navigate(['app/settings/user']);
    }
    if(buttonName == 'Aktywności') {
      this.router.navigate(['app/settings/activities']);
    }
    if(buttonName == 'Cele') {
      this.router.navigate(['app/settings/goals']);
    }
    if(buttonName == 'Powiadomienia') {
      this.router.navigate(['app/your-day/notifications']);
    }
    if(buttonName == 'Podsumowanie') {
      this.router.navigate(['/app/your-day/summary']);
    }
  }
  changeNavBarLocation(buttonName: string) {
    if(buttonName == 'Dziennik') {
      this.navBarLocation = 1;
      this.appData.navBarLocation = this.navBarLocation;
    }
    if(buttonName == 'Powrót') {
      this.navBarLocation = 0;
      this.appData.navBarLocation = this.navBarLocation;
      this.navigate('Powrót')
    }
    if(buttonName == 'Ustawienia') {
      this.navBarLocation = 2;
      this.appData.navBarLocation = this.navBarLocation;
    }
    if(buttonName == 'Twój dzień') {
      this.navBarLocation = 3;
      this.appData.navBarLocation = this.navBarLocation;
    }
  }
}
