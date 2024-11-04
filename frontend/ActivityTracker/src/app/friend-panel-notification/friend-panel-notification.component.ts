import { Component, Inject } from '@angular/core';
import { MatDialogContent, MatDialogActions, MatDialogRef, MAT_DIALOG_DATA, MatDialogTitle } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { FriendsService } from '../services/friends.service';

@Component({
  selector: 'app-friend-panel-notification',
  standalone: true,
  imports: [MatDialogContent, MatDialogActions, MatDialogTitle, MatButton],
  templateUrl: './friend-panel-notification.component.html',
  styleUrl: './friend-panel-notification.component.scss'
})
export class FriendPanelNotificationComponent {

  constructor(
    public dialogRef: MatDialogRef<FriendPanelNotificationComponent>,
    private friendService: FriendsService,
    @Inject(MAT_DIALOG_DATA) public data: {
      title: string;
      image: string;
      name: string;
      username: string;
      id: number;
    }
  ) {}

  onAccept(): void {
    this.dialogRef.close('Accepted');
    this.friendService.putStatus(this.data.id, 'accepted').subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  onReject(): void {
    this.dialogRef.close('Rejected');
  }

}
