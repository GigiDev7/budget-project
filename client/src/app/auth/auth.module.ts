import { NgModule } from '@angular/core';
import { AuthFormComponent } from './auth-form/auth-form.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [AuthFormComponent],
  imports: [MatInputModule, MatButtonModule, MatFormFieldModule],
  exports: [
    AuthFormComponent,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
  ],
})
export class AuthModule {}
