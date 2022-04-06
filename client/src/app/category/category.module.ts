import { NgModule } from '@angular/core';
import { CategoryComponent } from './category.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { SharedModule } from '../shared.module';

const routes: Routes = [
  {
    path: 'category',
    component: CategoryComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [CategoryComponent],
  imports: [RouterModule.forChild(routes), SharedModule],
})
export class CategoryModule {}
