import { Component, OnInit, HostListener } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import {
  displayLottieSeletor,
  getCurrentTaskSelector,
} from '../state/app.selector';
import * as AppState from '../state/app.state';
import { Task } from '../_model';

@Component({
  selector: 'app-task-manager',
  templateUrl: './task-manager.component.html',
  styleUrls: ['./task-manager.component.scss'],
})
export class TaskManagerComponent implements OnInit {
  currentTask$: Observable<Task> = of({
    id: '',
    title: '',
    img: '',
    content: '',
  });

  isCompleted$: Observable<boolean> = of();

  constructor(private appState: Store<AppState.State>) {}

  ngOnInit() {
    this.currentTask$ = this.appState.select(getCurrentTaskSelector);
    this.isCompleted$ = this.appState.select(displayLottieSeletor);
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
