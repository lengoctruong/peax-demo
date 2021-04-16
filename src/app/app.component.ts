import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { Category, CategoryData } from './_model';
import { State } from './state/app.state';
import * as AppSelectors from '../app/state/app.selector';
import { getCurrentCategoryData } from './state/app.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'my-app';

  categories$: Observable<Category[]> = of([]);
  currentTask$: Observable<CategoryData> = of({
    id: 0,
    data: [],
  });
  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.categories$ = this.store.select(AppSelectors.getCategoriesSelector);
    this.currentTask$ = this.store.select(
      AppSelectors.getCurrentCategoryDataSelector
    );

    this.store.dispatch(getCurrentCategoryData({ id: 1 }));
  }
}
