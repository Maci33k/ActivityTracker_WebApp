export class GoalModel {
  id?: number;
  userID?: number;
  calories?: number;
  steps?: number;
  water?: number;
}

export class GoalModelToPut {
  userID?: number;
  calories?: number;
  steps?: number;
  water?: number;
}
