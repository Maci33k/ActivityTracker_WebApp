import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserLevel } from '../models/user-level';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LevelService {

  constructor(private http: HttpClient) { }

  postRecord(level: UserLevel) {   // after sucessfull registration only
    return this.http.post('https://localhost:7217/api/UserLevels', level);
  }

  putExperience(userID: number, experience: number) {
    return this.http.put(`https://localhost:7217/api/UserLevels/user/${userID}/experience?experience=${experience}`, experience);
  }

  putLevel(userID: number, level: number) {
    return this.http.put(`https://localhost:7217/api/UserLevels/user/${userID}/currentLevel?level=${level}`, level);
  }

  putTotalExperience(userID: number, experience: number) {
    return this.http.put(`https://localhost:7217/api/UserLevels/user/${userID}/total-experience?experience=${experience}`, experience);
  }

  putNextLevelExperience(userID: number, experience: number) {
    return this.http.put(`https://localhost:7217/api/UserLevels/user/${userID}/next-level-experience?experience=${experience}`, experience);
  }

  getLevelData(userID: number): Observable<any> {
    return this.http.get(`https://localhost:7217/api/UserLevels/user/${userID}`);
  }
}
