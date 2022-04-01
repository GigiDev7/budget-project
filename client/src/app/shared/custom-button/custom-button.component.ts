import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-custom-button',
  templateUrl: './custom-button.component.html',
  styleUrls: ['./custom-button.component.scss'],
})
export class CustomButtonComponent implements OnInit {
  @Input() text: string = '';
  @Input() icon: string = '';
  @Input() type: string = '';

  constructor() {}

  ngOnInit(): void {}
}
