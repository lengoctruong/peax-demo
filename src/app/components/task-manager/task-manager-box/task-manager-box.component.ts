import { Component, OnInit, HostListener } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';

import { Task } from '@components/task-manager/models/category.model';

// State
import * as TaskManagerState from '@components/task-manager/state/task-manager.state';

// Selectors
import * as TaskManagerSelectors from '@components/task-manager/state/task-manager.selector';

@Component({
  selector: 'app-task-manager-box',
  templateUrl: './task-manager-box.component.html',
  styleUrls: ['./task-manager-box.component.scss'],
})
export class TaskManagerBoxComponent implements OnInit {
  currentTask$: Observable<Task> = of({
    id: '',
    title: '',
    img: '',
    content: '',
  });

  isCompleted$: Observable<boolean> = of();

  constructor(private appState: Store<TaskManagerState.State>) {}

  ngOnInit() {
    this.currentTask$ = this.appState.select(
      TaskManagerSelectors.getCurrentTaskSelector
    );
    this.isCompleted$ = this.appState.select(TaskManagerSelectors.displayLottieSeletor);
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
