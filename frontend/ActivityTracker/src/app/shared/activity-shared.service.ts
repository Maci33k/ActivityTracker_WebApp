import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ActivitySharedService {

  activityDataID: number | null = null;
  callories: number | null = null;
  steps: number | null = null;
  water: number | null = null;
  sleepTime: number | null = null;
  sleepStart: any;
  sleepEnd: any;

  constructor() { }
}
