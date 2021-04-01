import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-title',
  templateUrl: './task-title.component.html',
  styleUrls: ['./task-title.component.scss'],
})
export class TaskTitleComponent implements OnInit {
  @Input() title = '';

  constructor() {}

  ngOnInit(): void {}
}
