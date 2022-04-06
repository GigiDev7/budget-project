import { Component, Input } from '@angular/core';
import { AccountService } from '../account-card/services/account.service';
import { InfoCardService } from '../shared/info-card/services/info-card.service';
import { TransactionService } from './services/transaction.service';
import { TransactionModel } from './transaction.model';

@Component({
  selector: 'app-transaction-card',
  templateUrl: './transaction-card.component.html',
  styleUrls: ['./transaction-card.component.scss'],
})
export class TransactionCardComponent {
  @Input() transaction!: TransactionModel;

  public onViewTransactionClick(): void {
    this.infoCardService.setType('Transaction');
    this.infoCardService.openInfoCard();
    this.transactionService
      .getSingleTransaction(this.transaction._id)
      .subscribe();
  }

  constructor(
    public infoCardService: InfoCardService,
    public transactionService: TransactionService,
    public accountService: AccountService
  ) {}
}
