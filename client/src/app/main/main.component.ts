import { Component, OnInit } from '@angular/core';
import { AccountModel } from '../shared/models/account.model';
import { AccountService } from '../account-card/services/account.service';
import { CurrencyService } from '../currencies/currency.service';
import { FormCardService } from '../shared/form-card/services/form-card.service';
import { InfoCardService } from '../shared/info-card/services/info-card.service';
import { ModalService } from '../shared/modal-card/services/modal-card.service';
import { NotificationService } from '../shared/notification-card/services/notification.service';
import { TransactionService } from '../transaction-card/services/transaction.service';
import { TransactionModel } from '../shared/models/transaction.model';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  public accounts!: AccountModel[];
  public searchInput: string = '';
  public filteredTransactions: TransactionModel[] = [];
  private incomeClicked: boolean = false;
  private expanseClicked: boolean = false;

  public handleSearchChange(event: Event): void {
    this.searchInput = (event.target as HTMLInputElement).value;
    const filtered = this.transactionService.transactions.filter((el) =>
      el.title.includes(this.searchInput)
    );
    this.filteredTransactions = [...filtered];
  }

  public trackBy(index: number, item: AccountModel | TransactionModel): string {
    return item._id;
  }

  public onAddAccountClick(): void {
    this.formCardService.setType('Account');
    this.formCardService.openFormCard();
  }

  public onIncomeClick(): void {
    if (this.incomeClicked) {
      this.incomeClicked = false;
      this.filteredTransactions = [];
    } else {
      this.incomeClicked = true;
      const filtered = this.transactionService.transactions.filter(
        (el) => el.type === 'income'
      );
      this.filteredTransactions = filtered;
    }
  }

  public onExpanseClick(): void {
    if (this.expanseClicked) {
      this.expanseClicked = false;
      this.filteredTransactions = [];
    } else {
      this.expanseClicked = true;
      const filtered = this.transactionService.transactions.filter(
        (el) => el.type === 'expanse'
      );
      this.filteredTransactions = filtered;
    }
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
            .pipe(untilDestroyed(this))
            .subscribe();
      },
    });

    this.currencyService.getCurrencies().pipe(untilDestroyed(this)).subscribe();
  }
}
