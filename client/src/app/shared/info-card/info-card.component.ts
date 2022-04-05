import { Component, Input } from '@angular/core';
import { AccountService } from 'src/app/account-card/services/account.service';
import { TransactionService } from 'src/app/transaction-card/services/transaction.service';
import { InfoCardService } from './services/info-card.service';

@Component({
  selector: 'app-info-card',
  templateUrl: './info-card.component.html',
  styleUrls: ['./info-card.component.scss'],
})
export class InfoCardComponent {
  @Input() public type: string = '';

  public onDeleteClick(): void {
    if (this.type === 'Account') {
      const account = this.accountService.singleAccount;
      this.accountService.deleteAccount(account._id).subscribe();
    } else {
      const transaction = this.transactionService.singleTransaction;
      this.transactionService.deleteTransaction(transaction._id);
    }
  }

  constructor(
    public infoCardService: InfoCardService,
    public accountService: AccountService,
    public transactionService: TransactionService
  ) {}
}
