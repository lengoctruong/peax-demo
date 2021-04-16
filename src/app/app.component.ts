import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { Category, CategoryData } from './_model';
import {
  getCategories,
  getCategoryId,
  getCurrentCategoryDataSelector,
} from './state/app.reducer';
import { getCurrentCategoryData, removeCategory } from './state/app.action';
import { State } from './state/app.state';

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
    this.categories$ = this.store.select(getCategories);
    this.currentTask$ = this.store.select(getCurrentCategoryDataSelector);

    let categoryId = 0;
    this.store.select(getCategoryId).subscribe((v) => (categoryId = v));

    this.store.dispatch(getCurrentCategoryData({ id: categoryId }));
  }

  getSelectedCategory(event: Category) {
    this.store.dispatch(getCurrentCategoryData({ id: event.id }));
  }

  removeCategory(data: Category) {
    this.store.dispatch(removeCategory({ id: data.id }));
  }
}
