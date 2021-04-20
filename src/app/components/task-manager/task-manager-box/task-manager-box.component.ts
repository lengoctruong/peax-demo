import { Component, OnInit, HostListener } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';

import { Task } from 'src/app/@shared/models';

// State
import * as AppState from 'src/app/@state/app.state';

// Selectors
import * as AppSelectors from 'src/app/@state/app.selector';

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

  constructor(private appState: Store<AppState.State>) {}

  ngOnInit() {
    this.currentTask$ = this.appState.select(
      AppSelectors.getCurrentTaskSelector
    );
    this.isCompleted$ = this.appState.select(AppSelectors.displayLottieSeletor);
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
