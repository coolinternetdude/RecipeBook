import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent {
  @Input('message') message: string;
  @Output('closeModal') close = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }
}
