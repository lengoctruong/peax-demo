import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CategoryState, State } from './app.state';

export const getCategoryFeatureState = createFeatureSelector<
  State,
  CategoryState
>('categoryState');

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
  (state) => state.currentCategoryData.data[0]
);

export const getCategories = createSelector(
  getCategoryFeatureState,
  (state) => state.category
);

export const getCategoryId = createSelector(
  getCategoryFeatureState,
  (state) => state.category[0].id
);

export const getCategoryData = createSelector(
  getCategoryFeatureState,
  (state) => state.data
);

export const getCurrentCategoryDataSelector = createSelector(
  getCategoryFeatureState,
  (state) => state.currentCategoryData
);
