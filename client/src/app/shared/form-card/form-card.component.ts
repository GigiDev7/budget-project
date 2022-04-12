import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/account-card/services/account.service';
import { CategoryService } from 'src/app/category/services/category.service';
import { CurrencyService } from 'src/app/currencies/currency.service';
import { ReloadService } from 'src/app/reload/reload.service';
import { TransactionService } from 'src/app/transaction-card/services/transaction.service';
import { ModalService } from '../modal-card/services/modal-card.service';
import { NotificationService } from '../notification-card/services/notification.service';
import { FormCardService } from './services/form-card.service';
import { COMMA, ENTER, SPACE } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { CategoryModel } from 'src/app/shared/models/category.model';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-form-card',
  templateUrl: './form-card.component.html',
  styleUrls: ['./form-card.component.scss'],
})
export class FormCardComponent implements OnInit {
  @Input() type: string = '';

  //
  public addOnBlur: boolean = true;
  readonly seperatorKeysCodes = [ENTER, COMMA, SPACE] as const;
  public selectedCategories: CategoryModel[] = [];
  public filteredCategories!: CategoryModel[];

  public add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.categoryService
        .addCategory(this.transactionType, value)
        .pipe(untilDestroyed(this))
        .subscribe({
          next: (val) => this.selectedCategories.push(val),
        });
    }

    event.chipInput!.clear();
  }

  public remove(category: CategoryModel): void {
    this.categoryService
      .deleteCategory(category._id)
      .pipe(untilDestroyed(this))
      .subscribe();
    this.selectedCategories = this.selectedCategories.filter(
      (el) => el._id !== category._id
    );
  }
  //

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
    'income';

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
      this.filteredCategories = this.categoryService.categories.filter(
        (el) => el.type === 'income'
      );
    }
  }
  public onExpanseClick(): void {
    if (this.type === 'Category') {
      this.categoryType = 'expanse';
    } else {
      this.transactionType = 'expanse';
      this.filteredCategories = this.categoryService.categories.filter(
        (el) => el.type === 'expanse'
      );
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
          .pipe(untilDestroyed(this))
          .subscribe();

        this.reloadService.reloadComponent();
        this.notificationService.setNotificationText('Account Updated');
        this.notificationService.showNotification();
        //account is creating
      } else {
        this.accountService
          .addAccount(title, currency, description)
          .pipe(untilDestroyed(this))
          .subscribe();
        this.reloadService.reloadComponent();
        this.notificationService.setNotificationText('Account Created');
        this.notificationService.showNotification();
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
            next: (v) =>
              this.accountService
                .getAccounts()
                .pipe(untilDestroyed(this))
                .subscribe(),
            complete: () =>
              this.transactionService
                .getTransactions(this.accountService.activeAccount._id)
                .pipe(untilDestroyed(this))
                .subscribe(),
          });

        this.reloadService.reloadComponent();
        this.notificationService.setNotificationText('Transaction Updated');
        this.notificationService.showNotification();
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
          .pipe(untilDestroyed(this))
          .subscribe({
            next: () =>
              this.accountService
                .getAccounts()
                .pipe(untilDestroyed(this))
                .subscribe(),
          });

        this.reloadService.reloadComponent();
        this.notificationService.setNotificationText('Transaction Created');
        this.notificationService.showNotification();
      }

      //adding category
    } else if (this.type === 'Category') {
      const { title } = this.categoryForm.value;
      this.categoryService.addCategory(this.categoryType, title).subscribe({
        next: () =>
          this.categoryService
            .getCategories()
            .pipe(untilDestroyed(this))
            .subscribe(),
      });

      this.reloadService.reloadComponent();
      this.notificationService.setNotificationText('Category Created');
      this.notificationService.showNotification();
    }

    this.formCardService.setIsEditing(false);
    this.formCardService.closeFormCard();
  }

  public isDisabled(): boolean {
    if (this.type === 'Account') {
      return this.accountForm.invalid;
    } else if (this.type === 'Transaction') {
      return this.transactionForm.invalid || !this.transactionType;
    } else if (this.type === 'Category') {
      return this.categoryForm.invalid || !this.categoryType;
    }

    return true;
  }

  constructor(
    public formCardService: FormCardService,
    private accountService: AccountService,
    private transactionService: TransactionService,
    private reloadService: ReloadService,
    public currencyService: CurrencyService,
    public categoryService: CategoryService,
    private modalService: ModalService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.categoryService
      .getCategories()
      .pipe(untilDestroyed(this))
      .subscribe({
        next: () =>
          (this.filteredCategories = this.categoryService.categories.filter(
            (el) => el.type === 'income'
          )),
      });
  }
}
