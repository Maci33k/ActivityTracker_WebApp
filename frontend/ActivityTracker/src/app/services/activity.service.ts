import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivityModel } from '../models/activity.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  constructor(private http: HttpClient) { }

  urlToPost: string = 'https://localhost:7217/api/ActivityData';
  urlToCheckIfRecordExists: string = 'https://localhost:7217/api/ActivityData/check-if-exists?UserID=';
  urlToUpdateRecord: string = 'https://localhost:7217/api/ActivityData';
  urlToGetTodaysRecordID: string = 'https://localhost:7217/api/ActivityData/GetID?userID=';
  urlToGetAllData: string = 'https://localhost:7217/api/ActivityData/user';
  urlToPostTraining: string = 'https://localhost:7217/api/TrainingData';
  urlToGetTrainings: string = 'https://localhost:7217/api/TrainingData/ActivityData/';
  urlToGetAllTrainings: string = 'https://localhost:7217/api/TrainingData';

  createRecord(activityModel: ActivityModel): Observable<any> {
    return this.http.post(this.urlToPost, activityModel);
  }

  checkIfRecordExists(userID: number) {
    return this.http.get(`${this.urlToCheckIfRecordExists}${userID}`);
  }

  updateRecord(id: number, activityModel: ActivityModel): Observable<any> {
    return this.http.put(`${this.urlToUpdateRecord}/${id}`, activityModel)
  }

  getTodaysRecordID(userID: number): Observable<number> {
    return this.http.get<number>(`${this.urlToGetTodaysRecordID}${userID}`);
  }

  getAllData(userId: number): Observable<any> {
    return this.http.get(`${this.urlToGetAllData}/${userId}`);
  }

  getSingleRecord(id: number): Observable<any> {
    return this.http.get(`${this.urlToPost}/${id}`);
  }

  postTraining(activityDataID: number, trainingTime: number, trainingType: string, averageHeartRate: number): Observable<any> {
    const training = {
      ID: 0,
      ActivityDataID: activityDataID,
      TrainingTime: trainingTime,
      TrainingType: trainingType,
      AverageHeartRate: averageHeartRate
    };
    console.log('Próbujesz dodać do bazy danych, ', training);
    return this.http.post(this.urlToPostTraining, training);
  }

  getTrainigs(activityDataID: number): Observable<any> {
    return this.http.get(`${this.urlToGetTrainings}${activityDataID}`);
  }

  getAllTrainings(): Observable<any> {
    return this.http.get(this.urlToGetAllTrainings);
  }

  getSummary(year: number | null, month: number | null, day: number | null, userID: number): Observable<any> {
    if(year != null && month == null && day == null) {
      return this.http.get(`https://localhost:7217/api/ActivityData/summary?year=${year}&userID=${userID}`);
    }
    else if(year != null && month != null && day == null) {
      return this.http.get(`https://localhost:7217/api/ActivityData/summary?year=${year}&month=${month}&userID=${userID}`);
    }
    else if(year != null && month != null && day != null) {
      return this.http.get(`https://localhost:7217/api/ActivityData/summary?year=${year}&month=${month}&day=${day}&userID=${userID}`);
    }
    else return this.http.get(`https://localhost:7217/api/ActivityData/summary?year=${year}&month=${month}&day=${day}&userID=${userID}`);
  }

  completeDay(activityDataID: number, userID: number) {
    return this.http.put(`https://localhost:7217/api/ActivityData/complete-day/${userID}?ID=${activityDataID}`, true);
  }
}
