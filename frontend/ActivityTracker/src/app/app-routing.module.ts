import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FriendsComponent } from './components/friends/friends.component';
import { YourDayComponent } from './components/your-day/your-day.component';
import { AchievementsComponent } from './components/achievements/achievements.component';
import { JournalComponent } from './components/journal/journal.component';
import { CalloriesMonitorComponent } from './components/callories-monitor/callories-monitor.component';
import { SettingsComponent } from './components/settings/settings.component';
import { ProfileComponent } from './components/profile/profile.component';
import { JournalDataComponent } from './journal-data/journal-data.component';
import { SettingsUserComponent } from './settings-user/settings-user.component';
import { SettingsActivitiesComponent } from './settings-activities/settings-activities.component';
import { GoalsComponent } from './components/goals/goals.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { FriendProfileComponent } from './friend-profile/friend-profile.component';
import { SummaryComponent } from './summary/summary.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent  },
  { path: 'register', component: RegisterComponent  },
  { path: 'app', component: SidebarComponent, children:
     [{ path: 'friends', component: FriendsComponent },
      { path: 'friends/:name-:surname/:id', component: FriendProfileComponent },
    { path: 'your-day', component: YourDayComponent, children: [
      { path: 'notifications', component: NotificationsComponent },
      { path: 'summary', component: SummaryComponent }
    ]  },
    { path: 'achievements', component: AchievementsComponent  },
    { path: 'journal', component: JournalComponent },
    { path: 'callories-monitor', component: CalloriesMonitorComponent },
    { path: 'settings', component: SettingsComponent, children:
      [{ path: 'user', component: SettingsUserComponent },
       { path: 'activities', component: SettingsActivitiesComponent },
       { path: 'goals', component: GoalsComponent }
      ],
     },
    { path: 'profile', component: ProfileComponent },
    { path: 'data', component: JournalDataComponent }
  ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
