import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InfoCardService {
  public isInfoCardShown: boolean = false;
  public type: string = '';

  public openInfoCard(): void {
    this.isInfoCardShown = true;
  }

  public closeInfoCard(): void {
    this.isInfoCardShown = false;
  }

  public setType(val: string): void {
    this.type = val;
  }
}
