import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AchievementsSharedService } from '../shared/achievements-shared.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AchievementsService {

  private urlToGetAchievementsStatuses: string = 'https://localhost:7217/api/Achievements/User/'

  // URLS TO SET COMPLETED ACHIEVEMENTS INTO DATABASE //////////////////////////////////////////////////////////////////////
    private urlToSetAchievement1: string = 'https://localhost:7217/api/Achievements/update-achievement1/';
    private urlToSetAchievement2: string = 'https://localhost:7217/api/Achievements/update-achievement2/';
    private urlToSetAchievement3: string = 'https://localhost:7217/api/Achievements/update-achievement3/';
    private urlToSetAchievement4: string = 'https://localhost:7217/api/Achievements/update-achievement4/';
    private urlToSetAchievement5: string = 'https://localhost:7217/api/Achievements/update-achievement5/';
    private urlToSetAchievement6: string = 'https://localhost:7217/api/Achievements/update-achievement6/';
    private urlToCreateAchievementsRecord = 'https://localhost:7217/api/Achievements';
    private urlToVerifyStepsAchievement: string = 'https://localhost:7217/api/Achievements/WeeklySteps/User/';
    private urlToVerifyDaysInRowAchievement: string = 'https://localhost:7217/api/Achievements/DaysInRow/User/';
    private urlToVerifyPerfectDayAchievement: string = 'https://localhost:7217/api/Achievements/PerfectDayAchievementVerification/User/';

  constructor(private http: HttpClient, private achievementData: AchievementsSharedService) { }

  /// HTTP METHODS
  getAchievementStatuses(userID: number) {
    return this.http.get(`${this.urlToGetAchievementsStatuses}${userID}`);
  }

  postAchievementsRecord(userID: number) {

    var record = {
      id: 0,
      userID: userID,
      levelAchievement1: false,
      levelAchievement2: false,
      levelAchievement3: false,
      activityAchievement1: false,
      activityAchievement2: false,
      activityAchievement3: false,
      PinnedAchievement1: null,
      PinnedAchievement2: null,
      PinnedAchievement3: null
    };

   return this.http.post(this.urlToCreateAchievementsRecord, record);
  }

  putPinnedAchievement1(userID: number, achievementName?: string) {
    return this.http.put(`https://localhost:7217/api/Achievements/update-pinned-achievement1/${userID}?AchievementName=${achievementName}`, achievementName);
  }

  putPinnedAchievement2(userID: number, achievementName?: string) {
    return this.http.put(`https://localhost:7217/api/Achievements/update-pinned-achievement2/${userID}?AchievementName=${achievementName}`, achievementName);
  }

  putPinnedAchievement3(userID: number, achievementName?: string) {
    return this.http.put(`https://localhost:7217/api/Achievements/update-pinned-achievement3/${userID}?AchievementName=${achievementName}`, achievementName);
  }

//////////////////////////////////////////////////////////////////////////////

  verifyLevelAchievements(level: number, userID: number): Observable<any> {
    if(level == 5) {
      this.achievementData.achievement1 = true;
      return this.http.put(`${this.urlToSetAchievement1}${userID}`, true);
    }
    if(level == 10) {
      this.achievementData.achievement2 = true;
      return this.http.put(`${this.urlToSetAchievement2}${userID}`, true);
    }
    if(level == 15) {
      this.achievementData.achievement3 = true;
      return this.http.put(`${this.urlToSetAchievement3}${userID}`, true);
    }
    return of(null);
  }

  verifyStepsAchievement(userID: number): Observable<any> {
    return this.http.get(`${this.urlToVerifyStepsAchievement}${userID}`);
  }

  completeStepsAchievement(userID: number): Observable<any> {
    this.achievementData.achievement4 = true;
    return this.http.put(`${this.urlToSetAchievement4}${userID}`, true);
  }

  verifyDaysInRowAchievement(userID: number): Observable<any> {
    return this.http.get(`${this.urlToVerifyDaysInRowAchievement}${userID}`);
  }

  completeDaysInRowAchievement(userID: number): Observable<any> {
    this.achievementData.achievement5 = true;
    return this.http.put(`${this.urlToSetAchievement5}${userID}`, true);
  }

  completePerfectDayAchievement(userID: number): Observable<any> {
    this.achievementData.achievement6 = true;
    return this.http.put(`${this.urlToSetAchievement6}${userID}`, true);
  }

  verifyPerfectDayAchievement(userID: number): Observable<any> {
    return this.http.get(`${this.urlToVerifyPerfectDayAchievement}${userID}`);
  }
}
