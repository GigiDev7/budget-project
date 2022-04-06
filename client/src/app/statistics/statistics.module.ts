import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { StatisticsComponent } from './statistics.component';
import { SharedModule } from '../shared.module';

const routes: Routes = [
  {
    path: 'statistics',
    component: StatisticsComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [StatisticsComponent],
  imports: [RouterModule.forChild(routes), SharedModule],
})
export class StatisticsModule {}
