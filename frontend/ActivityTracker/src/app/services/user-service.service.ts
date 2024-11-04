import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http: HttpClient) { }

  private urlToPostUser: string = 'https://localhost:7217/api/Users';
  private urlToToSendEmail: string = 'https://localhost:7217/api/Registration/register';
  private urlToVerifyLogin: string = 'https://localhost:7217/api/Users/check-user';
  private urlToGetUserId: string = 'https://localhost:7217/api/Users/getId/';
  private urlToUploadImage: string = 'https://localhost:7217/api/Users/upload-image';
  private urlToGetUsername: string = 'https://localhost:7217/api/Users/GetUsername';
  private urlToGetFullUser: string = 'https://localhost:7217/api/Users';

  postUser(user: UserModel): Observable<any> {
    return this.http.post<any>(this.urlToPostUser, user);
  }

  sendEmail(UserID: number, Email: string): Observable<any> {
    return this.http.post<any>(this.urlToToSendEmail, {UserID, Email});
  }

  checkUser(Email: string, Password: string): Observable<any> {
    const body = {Email, Password};
    return this.http.post(this.urlToVerifyLogin, body);
  }

  getUserId(email: string): Observable<any> {
    const url = `${this.urlToGetUserId}${encodeURIComponent(email)}`;
    return this.http.get<any>(url);
  }

  uploadFile(file: File, id: number): void {
    const url = `${this.urlToUploadImage}/${id}`;
    const formData = new FormData();
    formData.append('image', file);

    this.http.post(url, formData, { responseType: 'text' })
      .subscribe({
        next: (response) => console.log('Image uploaded successfully!' + url, response),
        error: (error) => console.error('Error uploading image', error)
      });
  }

  getUserPhoto(userId: number): Observable<Blob> {
    return this.http.get(`https://localhost:7217/api/Users/${userId}/photo`, { responseType: 'blob' });
  }

  gerUsername(userId: number): Observable<string> {
    return this.http.get(`${this.urlToGetUsername}/${userId}`, { responseType: 'text' });
  }

  getFullUserData(userId: number): Observable<any> {
    return this.http.get(`${this.urlToGetFullUser}/${userId}`);
  }
}
