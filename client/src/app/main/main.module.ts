import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { HeaderComponent } from '../header/header.component';
import { MainComponent } from './main.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { AccountCardComponent } from '.././account-card/account-card.component';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [MainComponent, HeaderComponent, AccountCardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatIconModule,
    MatTabsModule,
    MatButtonModule,
    HttpClientModule,
  ],
})
export class MainModule {}
