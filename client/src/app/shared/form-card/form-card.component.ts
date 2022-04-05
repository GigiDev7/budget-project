import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/account-card/services/account.service';
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

  onSaveClick(): void {
    if (this.type === 'Account') {
      console.log(this.accountForm);
      const { title, currency, description } = this.accountForm.value;
      this.accountService.addAccount(title, currency, description).subscribe();
    }

    this.formCardService.closeFormCard();
  }

  constructor(
    public formCardService: FormCardService,
    private accountService: AccountService
  ) {}
}
