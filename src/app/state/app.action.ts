import { createAction, props } from '@ngrx/store';

export const getCategoryData = createAction(
  '[App] Get Category Data'
);

export const getCurrentCategoryData = createAction(
  '[App] Get Current Task',
  props<{id: number}>()
);

export const removeCategory = createAction(
  '[App] Remove Category',
  props<{id: number}>()
);

export const setCategoryId = createAction(
  '[App] Set Category Id',
  props<{ id: number }>()
);
