import {
  Component,
  Input,
  OnChanges,
  OnInit,
  HostListener,
} from '@angular/core';
import { Task } from '../model';

@Component({
  selector: 'app-task-manager',
  templateUrl: './task-manager.component.html',
  styleUrls: ['./task-manager.component.scss'],
})
export class TaskManagerComponent implements OnInit, OnChanges {
  @Input() data: Task[] = [];

  displayData: Task = {
    id: '',
    title: '',
    content: '',
    img: '',
  };
  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(change) {
    if (change) {
      this.displayData = this.data[0];
    }
  }
  @HostListener('mouseover') onMouseOver() {
    const element = document.querySelector('.task-indicator');
    element?.classList.add('pause');
  }

  @HostListener('mouseout') onMouseOut() {
    const element = document.querySelector('.task-indicator');
    element?.classList.remove('pause');
  }
}
