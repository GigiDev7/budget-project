import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CustomButtonComponent } from '../ui/custom-button/custom-button.component';

@NgModule({
  declarations: [CustomButtonComponent],
  imports: [MatIconModule],
  exports: [CustomButtonComponent, MatIconModule],
})
export class SharedModule {}
