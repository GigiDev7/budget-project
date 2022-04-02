import { Component, Input } from '@angular/core';
import { TransactionModel } from './transaction.model';

@Component({
  selector: 'app-transaction-card',
  templateUrl: './transaction-card.component.html',
  styleUrls: ['./transaction-card.component.scss'],
})
export class TransactionCardComponent {
  @Input() transaction!: TransactionModel;

  constructor() {}
}
