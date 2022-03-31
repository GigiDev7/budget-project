import { Component, OnInit } from '@angular/core';
import { AccountModel } from '../account-card/account.model';
import { AccountService } from '../account-card/services/account.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  public accounts: AccountModel[] = [];

  constructor(private accountService: AccountService) {}

  public ngOnInit(): void {
    this.accountService.getAccounts().subscribe({
      next: (data) => (this.accounts = data),
    });
  }
}
