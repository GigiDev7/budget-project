import { Component, OnInit } from '@angular/core';
import { AccountModel } from '../account-card/account.model';
import { AccountService } from '../account-card/services/account.service';
import { FormCardService } from '../shared/form-card/services/form-card.service';
import { InfoCardService } from '../shared/info-card/services/info-card.service';
import { TransactionService } from '../transaction-card/services/transaction.service';
import { TransactionModel } from '../transaction-card/transaction.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  public accounts!: AccountModel[];

  public trackBy(index: number, item: AccountModel | TransactionModel): string {
    return item._id;
  }

  constructor(
    private accountService: AccountService,
    public transactionService: TransactionService,
    public infoCardService: InfoCardService,
    public formCardService: FormCardService
  ) {}

  public ngOnInit(): void {
    this.accountService.getAccounts().subscribe({
      next: (data) => (this.accounts = data),
      complete: () => {
        this.transactionService
          .getTransactions(this.accounts[0]._id)
          .subscribe();
      },
    });
  }
}
