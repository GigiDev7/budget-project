import { Component, Input } from '@angular/core';
import { FormCardService } from '../form-card/services/form-card.service';

@Component({
  selector: 'app-custom-button',
  templateUrl: './custom-button.component.html',
  styleUrls: ['./custom-button.component.scss'],
})
export class CustomButtonComponent {
  @Input() text: string = '';
  @Input() icon: string = '';
  @Input() type: string = '';

  handleClick(): void {
    if (this.type === 'create' && this.text === 'Add Account') {
      this.formCardService.setType('Account');
      this.formCardService.openFormCard();
    } else if (this.type === 'create' && this.text === 'Add Transaction') {
      this.formCardService.setType('Transaction');
      this.formCardService.openFormCard();
    }
  }

  constructor(private formCardService: FormCardService) {}
}
