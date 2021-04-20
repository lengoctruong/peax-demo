import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';

// Model
import { Category, CategoryData } from 'src/app/@shared/models';

// State
import * as AppState from 'src/app/@state/app.state';

// Selectors
import * as AppSelectors from 'src/app/@state/app.selector';

// Actions
import * as AppActions from 'src/app/@state/app.action';

@Component({
  selector: 'app-task-manager',
  templateUrl: './task-manager.component.html',
  styleUrls: ['./task-manager.component.scss'],
})
export class TaskManagerComponent implements OnInit {
  categories$: Observable<Category[]> = of();
  currentTask$: Observable<CategoryData> = of();
  constructor(private store: Store<AppState.State>) {}

  ngOnInit() {
    this.categories$ = this.store.select(AppSelectors.getCategoriesSelector);
    this.currentTask$ = this.store.select(
      AppSelectors.getCurrentCategoryDataSelector
    );

    this.store.dispatch(AppActions.getCurrentCategoryData({ id: 1 }));
  }
}
