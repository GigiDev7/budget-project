import { Component, Input, OnInit } from '@angular/core';
import { InfoCardService } from '../shared/info-card/services/info-card.service';
import { TransactionService } from '../transaction-card/services/transaction.service';
import { AccountModel } from './account.model';
import { AccountService } from './services/account.service';

@Component({
  selector: 'app-account-card',
  templateUrl: './account-card.component.html',
  styleUrls: ['./account-card.component.scss'],
})
export class AccountCardComponent implements OnInit {
  @Input() public account!: AccountModel;

  public onCardClick(): void {
    this.accountService.activateAccount(this.account._id);
    this.transactionService.getTransactions(this.account._id).subscribe({
      next: (data) => (this.transactionService.transactions = data),
    });
  }

  public onViewAccountClick(): void {
    this.infoCardService.setType('Account');
    this.infoCardService.openInfoCard();
    this.accountService.getSingleAccount(this.account._id).subscribe();
  }

  constructor(
    public accountService: AccountService,
    public transactionService: TransactionService,
    public infoCardService: InfoCardService
  ) {}

  public ngOnInit(): void {
    const firstAccount = this.accountService.accounts[0];
    this.accountService.activateAccount(firstAccount._id);
  }
}
