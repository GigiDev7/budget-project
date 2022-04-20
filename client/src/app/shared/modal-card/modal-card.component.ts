import { Component, Input } from '@angular/core';
import { ModalService } from './services/modal-card.service';
import { InfoCardService } from '../info-card/services/info-card.service';
import { AccountService } from 'src/app/account-card/services/account.service';
import { TransactionService } from 'src/app/transaction-card/services/transaction.service';
import { ReloadService } from 'src/app/reload/reload.service';
import { FormCardService } from '../form-card/services/form-card.service';
import { NotificationService } from '../notification-card/services/notification.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-modal-card',
  templateUrl: './modal-card.component.html',
  styleUrls: ['./modal-card.component.scss'],
})
export class ModalCardComponent {
  @Input() public text: string = '';
  @Input() public type: string = '';

  public onCloseClick(event: Event): void {
    event.stopPropagation();
    this.modalService.hideModal();
  }

  public onDeleteConfirm(): void {
    if (this.formCardService.isFormCardShown) {
      this.formCardService.setIsEditing(false);
      this.formCardService.closeFormCard();
      this.reloadService.reloadComponent();
    } else if (this.infoCardService.type === 'Account') {
      const account = this.accountService.singleAccount;
      this.accountService
        .deleteAccount(account._id)
        .pipe(untilDestroyed(this))
        .subscribe();
      this.reloadService.reloadComponent();
      this.notificationService.showNotification();
      this.notificationService.setNotificationText('Account Deleted');
    } else {
      const transaction = this.transactionService.singleTransaction;
      this.transactionService.deleteTransaction(transaction._id).subscribe({
        next: () =>
          this.accountService
            .getAccounts()
            .pipe(untilDestroyed(this))
            .subscribe(),
      });
      this.reloadService.reloadComponent();
      this.notificationService.showNotification();
      this.notificationService.setNotificationText('Transaction Deleted');
    }
    this.modalService.hideModal();
    this.infoCardService.closeInfoCard();
    this.accountService.activateAccount(this.accountService.accounts[0]._id);
  }

  constructor(
    private modalService: ModalService,
    public infoCardService: InfoCardService,
    private accountService: AccountService,
    private transactionService: TransactionService,
    private reloadService: ReloadService,
    public formCardService: FormCardService,
    private notificationService: NotificationService
  ) {}
}
