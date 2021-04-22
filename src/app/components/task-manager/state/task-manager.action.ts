import { createAction, props } from '@ngrx/store';
import { Category, CategoryData, Task } from '@components/task-manager/models/category.model';

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

export const getAllCategories = createAction(
  '[App] Get All Categories'
);

export const getAllCategoriesSuccess = createAction(
  '[App] Get All Categories Load Success',
  props<{
    category: Category[],
    data: CategoryData[]
  }>()
);

export const getAllCategoriesFailure = createAction(
  '[App] Get All Categories Fail',
  props<{ error: string }>()
);
