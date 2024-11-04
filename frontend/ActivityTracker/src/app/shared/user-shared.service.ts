import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserSharedService {
  userID: number | null = null;
  email: string | null = null;
  username: string | null = null;
  name: string | null = null;
  surname: string | null = null;
  gender: string | null = null;
  age: number | null = null;
  city: string | null = null;
  userConfigID: number | null = null;

  constructor() { }

  saveToLocalStorage() {
    sessionStorage.setItem('userID', JSON.stringify(this.userID));
    sessionStorage.setItem('email', this.email || '');
    sessionStorage.setItem('username', this.username || '');
    sessionStorage.setItem('name', this.name || '');
    sessionStorage.setItem('surname', this.surname || '');
    sessionStorage.setItem('gender', this.gender || '');
    sessionStorage.setItem('age', JSON.stringify(this.age));
    sessionStorage.setItem('city', this.city || '');
    sessionStorage.setItem('userConfigID', JSON.stringify(this.userConfigID));

    console.log('Saved: ', this.userID, this.email, this.username, this.name, this.surname, this.gender, this.age, this.city, this.userConfigID);
  }

  loadFromLocalStorage() {
    this.userID = JSON.parse(sessionStorage.getItem('userID') || 'null');
    this.email = sessionStorage.getItem('email');
    this.username = sessionStorage.getItem('username');
    this.name = sessionStorage.getItem('name');
    this.surname = sessionStorage.getItem('surname');
    this.gender = sessionStorage.getItem('gender');
    this.age = JSON.parse(sessionStorage.getItem('age') || 'null');
    this.city = sessionStorage.getItem('city');
    this.userConfigID = JSON.parse(sessionStorage.getItem('userConfigID') || 'null');
  }
}
