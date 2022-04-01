import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CustomButtonComponent } from '../ui/custom-button/custom-button.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [CustomButtonComponent],
  imports: [MatIconModule, CommonModule],
  exports: [CustomButtonComponent, MatIconModule],
})
export class SharedModule {}
