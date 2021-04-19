import { createAction, props } from '@ngrx/store';

export const getCurrentCategoryData = createAction(
  '[App] Get Current Task',
  props<{ id: number }>()
);

export const removeCategory = createAction(
  '[App] Remove Category',
  props<{ id: number }>()
);

export const getCurrentTaskById = createAction(
  '[App] Get Current Task By Id',
  props<{ id: string }>()
);
