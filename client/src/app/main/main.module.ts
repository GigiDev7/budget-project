import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { HeaderComponent } from '../header/header.component';
import { MainComponent } from './main.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { AccountCardComponent } from '.././account-card/account-card.component';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from '../shared.module';
import { TransactionCardComponent } from '../transaction-card/transaction-card.component';
import { CategoryComponent } from '../category/category.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'category',
    component: CategoryComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [
    MainComponent,
    HeaderComponent,
    AccountCardComponent,
    TransactionCardComponent,
    CategoryComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTabsModule,
    MatButtonModule,
    HttpClientModule,
    MatCardModule,
    SharedModule,
  ],
})
export class MainModule {}
