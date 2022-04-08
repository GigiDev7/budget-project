import { Component, OnInit } from '@angular/core';
import { AccountModel } from '../account-card/account.model';
import { AccountService } from '../account-card/services/account.service';
import { CurrencyService } from '../currencies/currency.service';
import { FormCardService } from '../shared/form-card/services/form-card.service';
import { InfoCardService } from '../shared/info-card/services/info-card.service';
import { ModalService } from '../shared/modal-card/services/modal-card.service';
import { NotificationService } from '../shared/notification-card/services/notification.service';
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

  public onAddAccountClick(): void {
    this.formCardService.setType('Account');
    this.formCardService.openFormCard();
  }

  constructor(
    public accountService: AccountService,
    public transactionService: TransactionService,
    public infoCardService: InfoCardService,
    public formCardService: FormCardService,
    public modalService: ModalService,
    private currencyService: CurrencyService,
    public notificationService: NotificationService
  ) {}

  public ngOnInit(): void {
    this.accountService.getAccounts().subscribe({
      next: (data) => (this.accounts = data),
      complete: () => {
        this.accounts.length > 0 &&
          this.transactionService
            .getTransactions(this.accountService.activeAccount._id)
            .subscribe();
      },
    });

    this.currencyService.getCurrencies().subscribe();
  }
}
