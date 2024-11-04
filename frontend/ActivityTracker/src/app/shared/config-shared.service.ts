import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigSharedService {

  //User Config
  height: number = 0;
  weight: number = 0;
  gender: string = '';
  fitness: string = '';

  //Tracked activities configuration
  steps: boolean = false;
  calories: boolean = false;
  water: boolean = false;
  sleepTime: boolean = false;
  training: boolean = false;

  constructor() {this.loadFromLocalStorage() }

  saveToLocalStorage() {
    sessionStorage.setItem('height', JSON.stringify(this.height));
    sessionStorage.setItem('weight', JSON.stringify(this.weight));
    sessionStorage.setItem('gender', this.gender);
    sessionStorage.setItem('fitness', this.fitness);

    sessionStorage.setItem('steps', JSON.stringify(this.steps));
    sessionStorage.setItem('calories', JSON.stringify(this.calories));
    sessionStorage.setItem('water', JSON.stringify(this.water));
    sessionStorage.setItem('sleepTime', JSON.stringify(this.sleepTime));
    sessionStorage.setItem('training', JSON.stringify(this.training));
  }

  loadFromLocalStorage() {
    this.height = JSON.parse(sessionStorage.getItem('height') || '0');
    this.weight = JSON.parse(sessionStorage.getItem('weight') || '0');
    this.gender = sessionStorage.getItem('gender') || '';
    this.fitness = sessionStorage.getItem('fitness') || '';

    this.steps = JSON.parse(sessionStorage.getItem('steps') || 'false');
    this.calories = JSON.parse(sessionStorage.getItem('calories') || 'false');
    this.water = JSON.parse(sessionStorage.getItem('water') || 'false');
    this.sleepTime = JSON.parse(sessionStorage.getItem('sleepTime') || 'false');
    this.training = JSON.parse(sessionStorage.getItem('training') || 'false');
  }
}
