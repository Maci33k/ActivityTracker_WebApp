export class UserModel {
  userID: number = 0;
  username: string = '';
  name: string = '';
  surname: string = '';
  age: number = 0;
  gender: string = '';
  city: string = '';
  email: string = '';
  password: string = '';
  isVerified: boolean = false;
  verificationToken: string = 'default';
  activityData: any[] = [];
  training: any[] = [];
}
