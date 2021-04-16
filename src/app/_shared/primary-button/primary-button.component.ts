import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-primary-button',
  templateUrl: './primary-button.component.html',
  styleUrls: ['./primary-button.component.scss'],
})
export class PrimaryButtonComponent implements OnInit {
  @Input() title = '' || 'Action';
  @Input() colour = '' || 'emerald';
  @Input() actionName = '';

  @Output() executeAction = new EventEmitter<string>();

  isLoading = true;

  constructor() {}

  ngOnInit(): void {}

  doAction() {
    this.isLoading = !this.isLoading;

    if (this.actionName) {
      this.executeAction.emit(this.actionName);
    }
  }
}
