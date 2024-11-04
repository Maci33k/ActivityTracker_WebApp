import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserConfigModel } from '../models/user-config.model';
import { TrackedActivitiesModel } from '../models/tracked-activities.model';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private urlToUpdateUserConfig: string = 'https://localhost:7217/api/UserConfigs';
  private urlToGetTrackedActivities: string = 'https://localhost:7217/api/UserConfigs';
  private urlToPostActivities: string = 'https://localhost:7217/api/tracked-activities?userConfigID='

  constructor(private http: HttpClient) { }

  updateUserConfig(config: UserConfigModel): Observable<any> {
    return this.http.put(`${this.urlToUpdateUserConfig}/${config.id}`, config);
  }

  getUserConfig(id: number): Observable<any> {
    return this.http.get(`${this.urlToUpdateUserConfig}/${id}`);
  }

  getTrackedActivities(userConfigID: number): Observable<any> {
    return this.http.get(`${this.urlToGetTrackedActivities}/${userConfigID}/tracked-activities`);
  }

  postTrackedActivities(trackedActivities: TrackedActivitiesModel, userConfigID: number): Observable<any> {
    return this.http.post(`${this.urlToGetTrackedActivities}/${userConfigID}/tracked-activities`, trackedActivities);
  }

  putTrackedActivities(trackedActivities: TrackedActivitiesModel, userConfigID: number): Observable<any> {
    return this.http.put(`${this.urlToGetTrackedActivities}/${userConfigID}/tracked-activities`, trackedActivities);
  }

}
