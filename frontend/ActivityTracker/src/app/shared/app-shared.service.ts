import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppSharedService {
  public navBarLocation: number = 0; // 0 for default, 1 for journal, 2 for settings, 3 for MainPage

  constructor() { }
}
