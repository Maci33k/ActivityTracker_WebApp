import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LevelInfoService {
  constructor() { }

  currentLevel: number = 0;
  nextLevel: number = 0;
  experience: number = 0;
  totalExperience: number = 0;
  nextLevelExperience: number = 0;

  private levelExpRequirements: Record<number, number> = {
    1: 0,
    2: 100,
    3: 200,
    4: 250,
    5: 350,
    6: 400,
    7: 450,
    8: 500,
    9: 600,
    10: 700,
    11: 750,
    12: 850,
    13: 900,
    14: 1000,
    15: 1200,
    16: 1400,
    17: 1500,
    18: 1600,
    19: 1800,
    20: 1950,
    21: 2100,
    22: 2200,
    23: 2300,
    24: 2400,
    25: 2500
  };

  getExpForLevel(level: number): number {
    return this.levelExpRequirements[level] || 0;
  }
}
