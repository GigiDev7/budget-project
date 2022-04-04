import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FormCardService {
  public isFormCardShown: boolean = false;
  public type: string = '';

  public openFormCard(): void {
    this.isFormCardShown = true;
  }

  public closeFormCard(): void {
    this.isFormCardShown = false;
  }

  public setType(val: string): void {
    this.type = val;
  }
}
