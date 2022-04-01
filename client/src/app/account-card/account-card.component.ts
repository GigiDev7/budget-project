import { Component, Input } from '@angular/core';
import { AccountModel } from './account.model';
import { AccountService } from './services/account.service';

@Component({
  selector: 'app-account-card',
  templateUrl: './account-card.component.html',
  styleUrls: ['./account-card.component.scss'],
})
export class AccountCardComponent {
  public activeAccount: AccountModel | undefined;
  @Input() public account!: AccountModel;

  public onActivateAccount(id: string) {
    const account: AccountModel | undefined = this.accountService.accounts.find(
      (el) => el._id === id
    );
    this.activeAccount = account;
  }

  constructor(private accountService: AccountService) {}
}
