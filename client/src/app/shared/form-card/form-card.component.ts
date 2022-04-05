import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/account-card/services/account.service';
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
    title: new FormControl('', [Validators.required]),
    currency: new FormControl('', [Validators.required]),
    description: new FormControl(''),
  });

  public transactionForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    categories: new FormControl('', [Validators.required]),
    amount: new FormControl('', [Validators.required]),
    paymentDate: new FormControl('', [Validators.required]),
    description: new FormControl(''),
  });
  public transactionType: string = '';

  public onIncomeClick(): void {
    this.transactionType = 'income';
  }
  public onExpanseClick(): void {
    this.transactionType = 'expanse';
  }

  onSaveClick(): void {
    if (this.type === 'Account') {
      const { title, currency, description } = this.accountForm.value;
      this.accountService.addAccount(title, currency, description).subscribe();
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

    this.formCardService.closeFormCard();
    this.reloadService.reloadComponent();
  }

  constructor(
    public formCardService: FormCardService,
    private accountService: AccountService,
    private transactionService: TransactionService,
    private reloadService: ReloadService
  ) {}
}
