import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';

// Model
import { Category, CategoryData } from '@components/task-manager/models/category.model';

// State
import * as TaskManagerState from '@components/task-manager/state/task-manager.state';

// Selectors
import * as TaskManagerSelectors from '@components/task-manager/state/task-manager.selector';

// Actions
import * as TaskManagerActions from '@components/task-manager/state/task-manager.action';
import { getError } from '@components/task-manager/state/task-manager.selector';

@Component({
  selector: 'app-task-manager',
  templateUrl: './task-manager.component.html',
  styleUrls: ['./task-manager.component.scss'],
})
export class TaskManagerComponent implements OnInit {
  categories$: Observable<Category[]> = of();
  currentTask$: Observable<CategoryData> = of();
  errorMessage$: Observable<string> = of();

  constructor(private store: Store<TaskManagerState.State>) {}

  ngOnInit() {
    this.categories$ = this.store.select(TaskManagerSelectors.getCategoriesSelector);
    this.currentTask$ = this.store.select(
      TaskManagerSelectors.getCurrentCategoryDataSelector
    );

    this.store.dispatch(TaskManagerActions.getAllCategories());
    this.errorMessage$ = this.store.select(getError);
  }
}
