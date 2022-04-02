import { Component, Input, OnInit } from '@angular/core';
import { AccountModel } from './account.model';
import { AccountService } from './services/account.service';

@Component({
  selector: 'app-account-card',
  templateUrl: './account-card.component.html',
  styleUrls: ['./account-card.component.scss'],
})
export class AccountCardComponent implements OnInit {
  @Input() public account!: AccountModel;

  constructor(public accountService: AccountService) {}

  public ngOnInit(): void {
    const firstAccount = this.accountService.accounts[0];
    this.accountService.activateAccount(firstAccount._id);
  }
}
