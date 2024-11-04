import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { passwordMatchValidator } from 'src/app/validators/match-password';
import { UserModel } from 'src/app/models/user.model';
import { UserServiceService } from 'src/app/services/user-service.service';
import { UserLevel } from 'src/app/models/user-level';
import { LevelService } from 'src/app/services/level.service';
import { LevelInfoService } from 'src/app/shared/level-info.service';
import { AchievementsService } from 'src/app/services/achievements.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('videoBackground') videoElement!: ElementRef<HTMLVideoElement>;
  private routerEventsSubscription!: Subscription;
  isSubmitted = false;
  registeredUserId = 0;
  firstPartDone = false;

  user: UserModel =
  {
   userID: 0,
   username: '',
   name: '',
   surname: '',
   age: 0,
   gender: '',
   city: '',
   email: '',
   password: '',
   isVerified:  false,
   verificationToken: 'default',
   activityData: [],
   training: []
 }

  registerForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    repeatPassword: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]]
  }, { validators: passwordMatchValidator });

  personalDataForm = this.fb.group({
    name: ['', Validators.required],
    surname: ['', Validators.required],
    gender: ['', Validators.required],
    age: [0, Validators.required],
    city: ['', Validators.required]
  })


  constructor(private router: Router,
              private fb: FormBuilder,
              private userService: UserServiceService,
              private lvlService: LevelService,
              private lvlData: LevelInfoService,
              private achievementService: AchievementsService ) {}

  ngOnInit() {
    this.routerEventsSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && event.urlAfterRedirects === '/register') {
        this.playVideo();
      }
    });
  }

  ngAfterViewInit() {
    this.playVideo();
  }

  ngOnDestroy() {
    if (this.routerEventsSubscription) {
      this.routerEventsSubscription.unsubscribe();
    }
  }

  playVideo() {
    const video = this.videoElement.nativeElement;
    video.currentTime = 0;
    video.muted = true;
    video.play().catch(error => {
      console.error('Failed to play the video:', error);

      const playOnInteraction = () => {
        video.play().catch(err => {
          console.error('Retry failed:', err);
        });
        document.removeEventListener('click', playOnInteraction);
      };
      document.addEventListener('click', playOnInteraction);
    });
  }

  onSubmit() {
    //console.log('submitted form', this.registerForm.value, this.registerForm.invalid);
    console.log(this.user.email);
    //this.registerUser();
    this.firstPartDone = true;
  }

  onSubmit2() {
    console.log(this.personalDataForm.value.city);
    this.user.name = this.personalDataForm.value.name!;
    this.user.surname = this.personalDataForm.value.surname!;
    this.user.age = this.personalDataForm.value.age!;
    this.user.city = this.personalDataForm.value.city!;
    this.user.gender = this.personalDataForm.value.gender!;
    console.log(this.user.city);
    console.log(this.user.username);
    this.registerUser();
  }

  registerUser() {
    this.userService.postUser(this.user).subscribe({
      next: response => {
        this.registeredUserId = response.userID;
        this.sendEmail();
        this.createLevelRecord();
        this.createAchievementsRecord();
        this.router.navigate(['/login']);
      },
      error: error => {
        console.error('Error:', error);
      }
    });
  }

  sendEmail() {
    this.userService.sendEmail(this.registeredUserId, this.user.email).subscribe({
      next: response => {
        console.log(response);
      },
      error: error => {
        console.log(error);
      }
    });
  }

  createLevelRecord() {
    const level: UserLevel =
    {
      Id: 0,
      UserID: this.registeredUserId,
      Experience: 0,
      TotalExperience: 0,
      NextLevelExperience: 0,
      Level: 1
    }
    this.lvlService.postRecord(level).subscribe({
      next: (res) => {
        console.log(res);
        this.lvlData.currentLevel = 1;
        this.lvlData.nextLevel = 2;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  createAchievementsRecord() {
    this.achievementService.postAchievementsRecord(this.registeredUserId).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}

