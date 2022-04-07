import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/account-card/services/account.service';
import { CurrencyService } from 'src/app/currencies/currency.service';
import { ReloadService } from 'src/app/reload/reload.service';
import { TransactionService } from 'src/app/transaction-card/services/transaction.service';
import { FormCardService } from './services/form-card.service';

@Component({
  selector: 'app-form-card',
  templateUrl: './form-card.component.html',
  styleUrls: ['./form-card.component.scss'],
})
export class FormCardComponent {
  @Input() type: string = '';
  public accountForm: FormGroup = new FormGroup({
    title: new FormControl(
      (this.formCardService.isEditing &&
        this.accountService?.singleAccount?.title) ||
        '',
      [Validators.required]
    ),
    currency: new FormControl(
      (this.formCardService.isEditing &&
        this.accountService?.singleAccount?.currency) ||
        this.currencyService.defaultCurrency,
      [Validators.required]
    ),
    description: new FormControl(
      (this.formCardService.isEditing &&
        this.accountService?.singleAccount?.description) ||
        ''
    ),
  });

  public transactionForm: FormGroup = new FormGroup({
    title: new FormControl(
      (this.formCardService.isEditing &&
        this.transactionService?.singleTransaction?.title) ||
        '',
      [Validators.required]
    ),
    categories: new FormControl(
      (this.formCardService.isEditing &&
        this.transactionService?.singleTransaction?.category) ||
        '',
      [Validators.required]
    ),
    amount: new FormControl(
      (this.formCardService.isEditing &&
        this.transactionService?.singleTransaction?.amount) ||
        '',
      [Validators.required]
    ),
    paymentDate: new FormControl(
      (this.formCardService.isEditing &&
        this.transactionService?.singleTransaction?.createdAt) ||
        '',
      [Validators.required]
    ),
    description: new FormControl(
      (this.formCardService.isEditing &&
        this.transactionService?.singleTransaction?.description) ||
        ''
    ),
  });
  public transactionType: string =
    (this.formCardService.isEditing &&
      this.transactionService?.singleTransaction?.type) ||
    '';

  public onIncomeClick(): void {
    this.transactionType = 'income';
  }
  public onExpanseClick(): void {
    this.transactionType = 'expanse';
  }

  public onCloseClick(): void {
    this.formCardService.setIsEditing(false);
    this.formCardService.closeFormCard();
  }

  public onSaveClick(): void {
    if (this.type === 'Account') {
      const { title, currency, description } = this.accountForm.value;
      if (this.formCardService.isEditing) {
        this.accountService
          .updateAccount(
            title,
            currency,
            description,
            this.accountService.singleAccount._id
          )
          .subscribe();
      } else {
        this.accountService
          .addAccount(title, currency, description)
          .subscribe();
      }
    } else {
      const accountId = this.accountService.activeAccount._id;
      const { title, categories, amount, paymentDate, description } =
        this.transactionForm.value;
      this.transactionService
        .addTransaction(
          accountId,
          title,
          categories,
          amount,
          this.transactionType,
          paymentDate,
          description
        )
        .subscribe({
          next: () => this.accountService.getAccounts().subscribe(),
        });
    }

    this.formCardService.setIsEditing(false);
    this.formCardService.closeFormCard();
    this.reloadService.reloadComponent();
  }

  constructor(
    public formCardService: FormCardService,
    private accountService: AccountService,
    private transactionService: TransactionService,
    private reloadService: ReloadService,
    public currencyService: CurrencyService
  ) {}
}
