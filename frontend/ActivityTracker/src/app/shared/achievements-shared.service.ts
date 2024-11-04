import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AchievementsSharedService {
  achievement1: boolean = false;
  achievement2: boolean = false;
  achievement3: boolean = false;
  achievement4: boolean = false;
  achievement5: boolean = false;
  achievement6: boolean = false;

  pinnedAchievement1: string = '';
  pinnedAchievement2: string = '';
  pinnedAchievement3: string = '';


  constructor() { }
}
