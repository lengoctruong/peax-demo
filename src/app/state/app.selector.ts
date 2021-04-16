import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from './app.state';

const getCategoryFeatureState = createFeatureSelector<AppState>('app');

export const getCategoriesSelector = createSelector(
  getCategoryFeatureState,
  (state) => state.category
);

export const getCategoryDataSelector = createSelector(
  getCategoryFeatureState,
  (state) => state.data
);

export const getCurrentTaskSelector = createSelector(
  getCategoryFeatureState,
  (state) => state.currentCategoryData
);