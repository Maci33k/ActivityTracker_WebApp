import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FriendsService {

  private urlToGetResults: string = 'https://localhost:7217/api/Users/';
  private urlToPostRequest: string = 'https://localhost:7217/api/Friends';
  private urlToGetNumberOfNotifications: string = 'https://localhost:7217/api/Friends/requests/';
  private urlToGetFriendRequest: string = 'https://localhost:7217/api/Friends/requested-friend/';
  private urlToPutStatus: string = 'https://localhost:7217/api/Friends/status/'
  private urlToGetActiveFriends: string = 'https://localhost:7217/api/Friends/';
  private urlToGetFriendProfileData: string = 'https://localhost:7217/api/Friends/';

  constructor( private http: HttpClient) { }



  getResults(name: string, surname: string): Observable<any> {
    return this.http.get(`${this.urlToGetResults}${name}/${surname}`);
  }

  postRequest(friend1ID: number, friend2ID: number, status: string): Observable<any> {
    const request = {
      ID: 0,
      Friend1ID: friend1ID,
      Friend2ID: friend2ID,
      Status: status
    };
    return this.http.post(this.urlToPostRequest, request);
  }

  getNumberOfNotifications(userID: number): Observable<any> {
    return this.http.get(`${this.urlToGetNumberOfNotifications}${userID}`);
  }

  getFriendRequest(userID: number): Observable<any> {
    return this.http.get(`${this.urlToGetFriendRequest}${userID}`);
  }

  putStatus(ID: number, status: string): Observable<any> {
    return this.http.put(`${this.urlToPutStatus}${ID}?status=${status}`, status);
  }

  getActiveFriends(UserID: number): Observable<any> {
    return this.http.get(`${this.urlToGetActiveFriends}${UserID}/Friends`);
  }

  getFriendProfileData(UserID: number): Observable<any> {
    return this.http.get(`${this.urlToGetFriendProfileData}${UserID}/profile`)
  }

  removeFriend(userID: number) {
    return this.http.delete(`https://localhost:7217/api/Friends/user/${userID}`);
  }

}
