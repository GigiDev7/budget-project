import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-info-card-field',
  templateUrl: './info-card-field.component.html',
  styleUrls: ['./info-card-field.component.scss'],
})
export class InfoCardFieldComponent {
  @Input() public title: string = '';
  @Input() public description: string | number | Date = '';

  format() {
    if (
      typeof this.description === 'string' &&
      this.description.includes('-')
    ) {
      return new Date(this.description).toLocaleDateString();
    }
    return this.description;
  }

  constructor() {}
}
