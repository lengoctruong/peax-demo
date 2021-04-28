import { Component, OnInit, HostListener } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';

import {
  CategoryData,
  Task,
} from '@components/task-manager/models/category.model';

// State
import * as TaskManagerState from '@components/task-manager/state/task-manager.state';

// Selectors
import * as TaskManagerSelectors from '@components/task-manager/state/task-manager.selector';

// Actions
import * as TaskManagerActions from '@components/task-manager/state/task-manager.action';

// Animations
import * as Animations from '@app/@shared/animations';

@Component({
  selector: 'app-task-manager-box',
  templateUrl: './task-manager-box.component.html',
  styleUrls: ['./task-manager-box.component.scss'],
})
export class TaskManagerBoxComponent implements OnInit {
  isCompleted$: Observable<boolean> = of();
  apiData$: Observable<CategoryData[]> = of();
  currentTask$: Observable<Task> = of();
  currentCategoryData$: Observable<CategoryData> = of();

  // UI variables
  ProgressBar = 'progress-bar';
  MoveLeft = 'move-left';
  MoveRight = 'move-right';
  TaskIndicator = 'task-indicator';
  Pause = 'pause';

  constructor(private appState: Store<TaskManagerState.State>) {}

  @HostListener('mouseover') onMouseOver() {
    const element = Animations.query(this.TaskIndicator, '.');
    if (element) {
      Animations.addClass(element, this.Pause);
    }
  }

  @HostListener('mouseout') onMouseOut() {
    const element = Animations.query(this.TaskIndicator, '.');
    if (element) {
      Animations.removeClass(element, this.Pause);
    }
  }

  ngOnInit() {
    this.currentTask$ = this.appState.select(
      TaskManagerSelectors.getCurrentTaskSelector
    );
    this.isCompleted$ = this.appState.select(
      TaskManagerSelectors.displayLottieSeletor
    );

    this.apiData$ = this.appState.select(
      TaskManagerSelectors.getCategoryDataSelector
    );

    this.currentCategoryData$ = this.appState.select(
      TaskManagerSelectors.getCurrentCategoryDataSelector
    );
  }

  execute(event: any) {
    const action = this.getAction(event);

    // Temp variables
    let apiData: CategoryData[] = [];
    let currentCategoryData: CategoryData = { id: 0, data: [] };
    let currentTask: Task = { id: '', title: '', img: '', content: '' };

    // Assign value to [Temp variables]
    this.currentTask$.subscribe((data) => (currentTask = data));
    this.currentCategoryData$.subscribe((data) => (currentCategoryData = data));

    // Find task index
    const taskIndex = this.findTaskIndex(
      currentTask.id,
      currentCategoryData.data
    );

    this.appState.dispatch(action);

    setTimeout(() => {
      // If index === currentCategoryData.data.length: then next category
      if (taskIndex === currentCategoryData.data.length - 1) {
        this.apiData$.subscribe((data) => (apiData = data));

        // Find current category index
        const curCategogyIndex = apiData.findIndex(
          (item) => item.id === currentCategoryData.id
        );

        this.removeTask(currentCategoryData.id, currentTask.id);
        this.slideLeft();

        this.appState.dispatch(
          TaskManagerActions.setCurrentCategoryData({
            data: apiData[curCategogyIndex + 1],
          })
        );

        // Next task
        // taskIndex no need to +1 due to - (1)
        this.setCurrentTask(currentCategoryData.data[taskIndex]);
      } else {
        // (1) - Remove current task
        this.removeTask(currentCategoryData.id, currentTask.id);

        this.slideLeft();

        // Next task
        this.setCurrentTask(currentCategoryData.data[taskIndex]);
      }
    }, 2000);
  }

  private removeTask(cateId: number, taskId: string) {
    this.appState.dispatch(
      TaskManagerActions.removeTask({
        cateId,
        taskId,
      })
    );
  }

  private setCurrentTask(task: Task) {
    this.appState.dispatch(
      TaskManagerActions.setCurrentTask({
        task,
      })
    );
  }

  private getAction(actionName: string) {
    let action;
    switch (actionName) {
      case 'completeTask':
        action = TaskManagerActions.completeTask();
        break;
      default:
        break;
    }

    return action;
  }

  private findTaskIndex(id: string, data: Task[]) {
    return data.findIndex((item) => item.id === id);
  }

  private slideLeft() {
    Animations.slideLeftLastItem(
      this.ProgressBar,
      this.MoveRight,
      this.MoveLeft
    );
  }
}
