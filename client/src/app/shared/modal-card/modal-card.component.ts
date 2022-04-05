import { Component } from '@angular/core';
import { ModalService } from './services/modal-card.service';
import { InfoCardService } from '../info-card/services/info-card.service';
import { AccountService } from 'src/app/account-card/services/account.service';
import { TransactionService } from 'src/app/transaction-card/services/transaction.service';
import { ReloadService } from 'src/app/reload/reload.service';

@Component({
  selector: 'app-modal-card',
  templateUrl: './modal-card.component.html',
  styleUrls: ['./modal-card.component.scss'],
})
export class ModalCardComponent {
  public onCloseClick(): void {
    this.modalService.hideModal();
  }

  public onDeleteCancel(): void {
    this.modalService.hideModal();
  }

  public onDeleteConfirm(): void {
    if (this.infoCardService.type === 'Account') {
      const account = this.accountService.singleAccount;
      this.accountService.deleteAccount(account._id).subscribe();
    } else {
      const transaction = this.transactionService.singleTransaction;
      this.transactionService.deleteTransaction(transaction._id).subscribe();
      this.accountService.getAccounts().subscribe();
    }
    this.modalService.hideModal();
    this.infoCardService.closeInfoCard();
    this.reloadService.reloadComponent();
  }

  constructor(
    private modalService: ModalService,
    public infoCardService: InfoCardService,
    private accountService: AccountService,
    private transactionService: TransactionService,
    private reloadService: ReloadService
  ) {}
}
