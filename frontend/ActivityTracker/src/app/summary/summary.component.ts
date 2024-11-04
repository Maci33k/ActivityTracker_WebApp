import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { slideInAnimation } from '../animations';
import { ActivityService } from '../services/activity.service';
import { UserSharedService } from '../shared/user-shared.service';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [CommonModule],
  animations: [slideInAnimation],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss'
})
export class SummaryComponent {

  constructor(public activityService: ActivityService, private userData: UserSharedService){}

  selectedYear: number | string = 'Rok';
  selectedMonth: string = 'Miesiąc';
  selectedDay: number | string = 'Dzień';
  selectedYearValue: number | null = null;
  selectedMonthValue: number | null = null;
  selectedDayValue: number | null = null;
  summary: any;

  years: number[] = Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - i);
  months: string[] = [
     'Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec',
    'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'
  ];
  days: number[] = Array.from({ length: 31 }, (_, i) => i + 1);

  selectYear(year: number) {
    this.selectedYear = year;
    this.selectedYearValue = year;
    this.getSummary();
  }

  selectMonth(month: string) {
    this.selectedMonth = month;
    if(month == 'Styczeń') {
      this.selectedMonthValue = 1;
    }
    if(month == 'Luty') {
      this.selectedMonthValue = 2;
    }
    if(month == 'Marzec') {
      this.selectedMonthValue = 3;
    }
    if(month == 'Kwiecień') {
      this.selectedMonthValue = 4;
    }
    if(month == 'Maj') {
      this.selectedMonthValue = 5;
    }
    if(month == 'Czerwiec') {
      this.selectedMonthValue = 6;
    }
    if(month == 'Lipiec') {
      this.selectedMonthValue = 7;
    }
    if(month == 'Sierpień') {
      this.selectedMonthValue = 8;
    }
    if(month == 'Wrzesień') {
      this.selectedMonthValue = 9;
    }
    if(month == 'Październik') {
      this.selectedMonthValue = 10;
    }
    if(month == 'Listopad') {
      this.selectedMonthValue = 11;
    }
    if(month == 'Grudzień') {
      this.selectedMonthValue = 12;
    }
    this.getSummary();
  }

  selectDay(day: number) {
    this.selectedDay = day;
    this.selectedDayValue = day;
    this.getSummary();
  }

  setDefault(type: string) {
    if(type == 'year') {
      this.selectedYear = 'Rok';
      this.selectedYearValue = null;
    }
    if(type == 'month') {
      this.selectedMonth = 'Miesiąc';
      this.selectedMonthValue = null;
    }
    if(type == 'day') {
      this.selectedDay = 'Dzień';
      this.selectedDayValue = null;
    }
    this.getSummary();
  }

  getSummary() {
    this.activityService.getSummary(this.selectedYearValue, this.selectedMonthValue, this.selectedDayValue, this.userData.userID!).subscribe({
      next: (summary) => {
        console.log(summary);
        this.summary = summary;
      }
    })
  }
}
