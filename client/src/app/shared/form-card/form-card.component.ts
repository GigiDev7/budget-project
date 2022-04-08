import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/account-card/services/account.service';
import { CategoryService } from 'src/app/category/services/category.service';
import { CurrencyService } from 'src/app/currencies/currency.service';
import { ReloadService } from 'src/app/reload/reload.service';
import { TransactionService } from 'src/app/transaction-card/services/transaction.service';
import { ModalService } from '../modal-card/services/modal-card.service';
import { FormCardService } from './services/form-card.service';

@Component({
  selector: 'app-form-card',
  templateUrl: './form-card.component.html',
  styleUrls: ['./form-card.component.scss'],
})
export class FormCardComponent {
  @Input() type: string = '';

  //for account
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

  //for transaction
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

  //for category
  public categoryType: string = '';

  public categoryForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
  });

  public onIncomeClick(): void {
    if (this.type === 'Category') {
      this.categoryType = 'income';
    } else {
      this.transactionType = 'income';
    }
  }
  public onExpanseClick(): void {
    if (this.type === 'Category') {
      this.categoryType = 'expanse';
    } else {
      this.transactionType = 'expanse';
    }
  }

  public onCloseClick(): void {
    this.modalService.showModal();
  }

  public onSaveClick(): void {
    if (this.type === 'Account') {
      const { title, currency, description } = this.accountForm.value;
      //if account is updating
      if (this.formCardService.isEditing) {
        this.accountService
          .updateAccount(
            title,
            currency,
            description,
            this.accountService.singleAccount._id
          )
          .subscribe();

        //account is creating
      } else {
        this.accountService
          .addAccount(title, currency, description)
          .subscribe();
      }
    } else if (this.type === 'Transaction') {
      const accountId = this.accountService.activeAccount._id;
      const { title, categories, amount, paymentDate, description } =
        this.transactionForm.value;
      //transaction is updating
      if (this.formCardService.isEditing) {
        this.transactionService
          .updateTransaction(
            this.transactionService.singleTransaction._id,
            title,
            categories,
            amount,
            this.transactionType,
            paymentDate,
            description
          )
          .subscribe({
            next: (v) => this.accountService.getAccounts().subscribe(),
            complete: () =>
              this.transactionService
                .getTransactions(this.accountService.activeAccount._id)
                .subscribe(),
          });
        //transaction is creating
      } else {
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

      //adding category
    } else if (this.type === 'Category') {
      const { title } = this.categoryForm.value;
      this.categoryService.addCategory(this.categoryType, title).subscribe({
        next: () => this.categoryService.getCategories().subscribe(),
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
    public currencyService: CurrencyService,
    private categoryService: CategoryService,
    private modalService: ModalService
  ) {}
}
