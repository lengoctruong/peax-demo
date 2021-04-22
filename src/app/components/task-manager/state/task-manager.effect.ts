import { Injectable } from '@angular/core';

import { mergeMap, map, catchError, concatMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { TaskManagerService } from '@components/task-manager/task-manager.service';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as TaskManagerActions from '@components/task-manager/state/task-manager.action';
import {
  createCategoryDataFromCategoryModel,
  createCategoryFromCategoryModel,
} from '../models/category.model';

@Injectable()
export class TaskManagerEffects {
  constructor(
    private actions$: Actions,
    private taskManagerService: TaskManagerService
  ) {}

  gettAllCategories$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TaskManagerActions.getAllCategories),
      mergeMap(() =>
        this.taskManagerService.getAllCategories().pipe(
          map((categoryModels) =>
            TaskManagerActions.getAllCategoriesSuccess({
              category: createCategoryFromCategoryModel(categoryModels),
              data: createCategoryDataFromCategoryModel(categoryModels),
            })
          ),
          catchError((error) =>
            of(TaskManagerActions.getAllCategoriesFailure({ error }))
          )
        )
      )
    );
  });
}
