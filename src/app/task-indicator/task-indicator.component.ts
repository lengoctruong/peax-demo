import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-indicator',
  templateUrl: './task-indicator.component.html',
  styleUrls: ['./task-indicator.component.scss']
})
export class TaskIndicatorComponent implements OnInit {
  @Input() currentTask: any;
  constructor() { }

  ngOnInit(): void {
  }

}
