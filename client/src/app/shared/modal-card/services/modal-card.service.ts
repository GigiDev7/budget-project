import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  public isModalShown: boolean = false;

  public showModal(): void {
    this.isModalShown = true;
  }

  public hideModal(): void {
    this.isModalShown = false;
  }
}
