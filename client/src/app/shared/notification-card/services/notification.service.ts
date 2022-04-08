import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  public isNotificationShown: boolean = false;
  public notificationText: string = '';

  constructor() {}

  public showNotification(): void {
    this.isNotificationShown = true;
    this.autoHide();
  }

  public hideNotification(): void {
    this.isNotificationShown = false;
  }

  public setNotificationText(val: string): void {
    this.notificationText = val;
  }

  private autoHide(): void {
    setTimeout(() => {
      this.hideNotification();
    }, 5000);
  }
}
