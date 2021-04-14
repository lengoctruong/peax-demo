import { AppState } from './state/app.state';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { Category, CategoryData } from './model';
import {
  getCategories,
  getCategoryId,
  getCurrentTaskSelector,
} from './state/app.reducer';
import { getCurrentTask, removeCategory } from './state/app.action';

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
  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.categories$ = this.store.select(getCategories);
    this.currentTask$ = this.store.select(getCurrentTaskSelector);

    let categoryId = 0;
    this.store.select(getCategoryId).subscribe((v) => (categoryId = v));

    this.store.dispatch(getCurrentTask({ id: categoryId }));
  }

  getSelectedCategory(event: Category) {
    this.store.dispatch(getCurrentTask({ id: event.id }));
  }

  removeCategory(data: Category) {
    this.store.dispatch(removeCategory({ id: data.id }));
  }
}
