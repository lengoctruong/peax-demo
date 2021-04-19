import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CategoryState, State } from './app.state';

export const getCategoryFeatureState = createFeatureSelector<
  State,
  CategoryState
>('categoryState');

// Categories
export const getCategoriesSelector = createSelector(
  getCategoryFeatureState,
  (state) => state.category
);

// Data from API
export const getCategoryDataSelector = createSelector(
  getCategoryFeatureState,
  (state) => state.data
);

export const getCurrentTaskSelector = createSelector(
  getCategoryFeatureState,
  (state) => state.currentTask
);

export const getCurrentCategoryDataSelector = createSelector(
  getCategoryFeatureState,
  (state) => state.currentCategoryData
);
