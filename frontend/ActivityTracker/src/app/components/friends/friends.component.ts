import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FriendsService } from 'src/app/services/friends.service';
import { CommonModule } from '@angular/common';
import { slideInFromLeftAnimation } from 'src/app/animations';
import { UserSharedService } from 'src/app/shared/user-shared.service';
import { FriendPanelNotificationComponent } from 'src/app/friend-panel-notification/friend-panel-notification.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-friends',
  standalone: true,
  imports: [CommonModule],
  animations: [slideInFromLeftAnimation],
  templateUrl: './friends.component.html',
  styleUrl: './friends.component.scss'
})
export class FriendsComponent implements OnInit {

  constructor(private friendService: FriendsService,
              private userData: UserSharedService,
              private dialog: MatDialog,
              private router: Router
  ){}

  public friends:  any;
  public activeFriends: any;
  numberOfNotifications: number = 0;


  ngOnInit(): void {
      this.getNumberOfNotifications();
      this.getActiveFriends();
  }

  @ViewChild('inputText') inputElement!: ElementRef;

  ngAfterViewInit() {
    this.inputElement.nativeElement.addEventListener("keypress", (event: KeyboardEvent) => {
        if (event.key === "Enter") {
            const fullName = this.inputElement.nativeElement.value.trim();
            const [firstName, lastName] = fullName.split(" ");

            console.log("Imię:", firstName);
            console.log("Nazwisko:", lastName);
            this.getResults(firstName, lastName);
        }
    });
  }

  convertBlobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      if (blob instanceof Blob) {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result as string);
        };
        reader.onerror = (error) => {
          reject(error);
        };
        reader.readAsDataURL(blob);
      } else {
        reject(new Error('Provided data is not a Blob.'));
      }
    });
  }


  getResults(name: string, surname: string) {
    this.friendService.getResults(name, surname).subscribe({
      next: (friends: any[]) => {
        if (friends && Array.isArray(friends)) {
          this.friends = friends.map(friend => {
            if (friend.image) {
              if (!friend.image.startsWith('data:image/jpeg;base64,')) {
                friend.image = `data:image/jpeg;base64,${friend.image}`;
              }
            }
            return friend;
          });
          console.log('Friends with images:', this.friends);
          console.log(this.friends[0].image);
        } else {
          console.warn('No friends data or data is not an array:', friends);
        }
      },
      error: (err) => {
        console.error('Error fetching friends:', err);
      }
    });
  }

  sendRequest(friend2ID: number, name: string, surname: string) {
    this.friendService.postRequest(this.userData.userID!, friend2ID, 'pending').subscribe({
      next: (res) => {
        console.log(res, 'Invitation sent correctly');
        this.getResults(name, surname);
      },
      error: (err) => {
        console.log(err, 'Did not sent the invitation');
      }
    });
  }

  getNumberOfNotifications() {
    this.friendService.getNumberOfNotifications(this.userData.userID!).subscribe({
      next: (number) => {
        this.numberOfNotifications = number;
        console.log(number);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  openModal(name: string, surname: string, image: any, username: string, id: number): void {
    const dialogRef = this.dialog.open(FriendPanelNotificationComponent, {
      width: '500px',
      height: '400px',
      data: {
        title: name + ' ' + surname + ' wysłał ci zaproszenie do znajomych',
        image: image,
        name: name + ' ' +  surname,
        username: username,
        id: id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog result:', result);
    });
  }

  displayInvitation() {
    this.friendService.getFriendRequest(this.userData.userID!).subscribe({
      next: (friend) => {
        if (friend.image) {
          if (!friend.image.startsWith('data:image/jpeg;base64,')) {
            friend.image = `data:image/jpeg;base64,${friend.image}`;
          }
        }
        console.log(friend);
        this.openModal(friend.name, friend.surname, friend.image, friend.username, friend.id);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  getActiveFriends() {
    this.friendService.getActiveFriends(this.userData.userID!).subscribe({
      next: (friends: any[]) => {
        if (friends && Array.isArray(friends)) {
          this.activeFriends = friends.map(friend => {
            if (friend.image) {
              if (!friend.image.startsWith('data:image/jpeg;base64,')) {
                friend.image = `data:image/jpeg;base64,${friend.image}`;
              }
            }
            return friend;
          });
          console.log('Friends with images:', this.activeFriends);
        } else {
          console.warn('No friends data or data is not an array:', friends);
        }
      },
      error: (err) => {
        console.error('Error fetching friends:', err);
      }
    });
  }

  goToProfile(friend: any) {
    const fullNamePath = `${friend.name}-${friend.surname}`;
    this.router.navigate([`/app/friends/${fullNamePath}/${friend.userID}`]);
  }

  removeFriend(friendID: number) {
    this.friendService.removeFriend(friendID).subscribe({
      next: (res) => {
        console.log(res);
        this.activeFriends = this.activeFriends.filter((friend: { userID: any; }) => friend.userID !== friendID);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

}
