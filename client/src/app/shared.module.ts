import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CustomButtonComponent } from './shared/custom-button/custom-button.component';
import { CommonModule } from '@angular/common';
import { InfoCardComponent } from './shared/info-card/info-card.component';
import { InfoCardFieldComponent } from './shared/info-card/info-card-field/info-card-field.component';
import { FormCardComponent } from './shared/form-card/form-card.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    CustomButtonComponent,
    InfoCardComponent,
    InfoCardFieldComponent,
    FormCardComponent,
  ],
  imports: [
    MatIconModule,
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
  ],
  exports: [
    CustomButtonComponent,
    MatIconModule,
    CommonModule,
    InfoCardComponent,
    FormCardComponent,
    MatInputModule,
    MatFormFieldModule,
  ],
})
export class SharedModule {}
