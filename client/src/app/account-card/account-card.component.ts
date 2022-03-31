import { Component, Input } from '@angular/core';
import { AccountModel } from './account.model';

@Component({
  selector: 'app-account-card',
  templateUrl: './account-card.component.html',
  styleUrls: ['./account-card.component.scss'],
})
export class AccountCardComponent {
  @Input() public account!: AccountModel;

  constructor() {}
}
