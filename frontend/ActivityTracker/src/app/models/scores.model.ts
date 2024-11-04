export class ScoresModel {
  Id?: number ;
  ActivityDataID?: number;
  StepsScore: number | null = null;
  CaloriesScore: number | null = null;
  WaterScore: number | null = null;
  SleepScore: number | null = null;
  TotalScore: number | null = null;
  UserID?: number;
}
