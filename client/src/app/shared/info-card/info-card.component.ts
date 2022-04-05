import { Component, Input } from '@angular/core';
import { AccountService } from 'src/app/account-card/services/account.service';
import { TransactionService } from 'src/app/transaction-card/services/transaction.service';
import { ModalService } from '../modal-card/services/modal-card.service';
import { InfoCardService } from './services/info-card.service';

@Component({
  selector: 'app-info-card',
  templateUrl: './info-card.component.html',
  styleUrls: ['./info-card.component.scss'],
})
export class InfoCardComponent {
  @Input() public type: string = '';

  public onDeleteClick(): void {
    this.modalService.showModal();
  }

  constructor(
    public infoCardService: InfoCardService,
    public accountService: AccountService,
    public transactionService: TransactionService,
    private modalService: ModalService
  ) {}
}
