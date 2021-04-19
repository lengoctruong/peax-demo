import { createAction, props } from '@ngrx/store';
import { CategoryData, Task } from '../_model';

export const getCurrentCategoryData = createAction(
  '[App] Get Current Category Data',
  props<{ id: number }>()
);

export const removeCategory = createAction(
  '[App] Remove Category',
  props<{ id: number }>()
);

export const removeTask = createAction(
  '[App] Remove Task',
  props<{ cateId: number; taskId: string }>()
);

export const getCurrentTaskById = createAction(
  '[App] Get Current Task By Id',
  props<{ id: string }>()
);

export const completeTask = createAction('[App] Complete Task');

export const setCurrentCategoryData = createAction(
  '[App] Set Current Category Data',
  props<{ data: CategoryData }>()
);

export const setCurrentTask = createAction(
  '[App] Set Current Task',
  props<{ task: Task }>()
);
