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
import { CategoryItemComponent } from '../category/category-item/category-item.component';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { StatisticsComponent } from '../statistics/statistics.component';
import { ReactiveFormsModule } from '@angular/forms';

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
  {
    path: 'statistics',
    component: StatisticsComponent,
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
    CategoryItemComponent,
    StatisticsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTabsModule,
    MatButtonModule,
    HttpClientModule,
    MatCardModule,
    SharedModule,
    FormsModule,
    MatDatepickerModule,
    ReactiveFormsModule,
  ],
})
export class MainModule {}
