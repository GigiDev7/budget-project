import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  public isNotificationShown: boolean = false;

  constructor() {}

  public showNotification(): void {
    this.isNotificationShown = true;
  }

  public hideNotification(): void {
    this.isNotificationShown = false;
  }
}
