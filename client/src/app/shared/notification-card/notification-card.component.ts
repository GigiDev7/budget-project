import { Component } from '@angular/core';
import { NotificationService } from './services/notification.service';

@Component({
  selector: 'app-notification-card',
  templateUrl: './notification-card.component.html',
  styleUrls: ['./notification-card.component.scss'],
})
export class NotificationCardComponent {
  constructor(public notificationService: NotificationService) {}

  public onNotificationClose(): void {
    this.notificationService.hideNotification();
  }
}
