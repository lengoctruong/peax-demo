import { Injectable } from '@angular/core';

import { mergeMap, map, catchError, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { TaskManagerService } from '@components/task-manager/task-manager.service';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as TaskManagerActions from '@components/task-manager/state/task-manager.action';

@Injectable()
export class TaskManagerEffects {

  constructor(private actions$: Actions, private taskManagerService: TaskManagerService) { }

  gettAllCategories$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(TaskManagerActions.gettAllCategories),
        mergeMap(() => this.taskManagerService.getAllCategories()
          .pipe(
            map(categories => TaskManagerActions.getAllCategoriesSuccess({ category: [], data: [] })),
            catchError(error => of(TaskManagerActions.getAllCategoriesFailure({ error })))
          )
        )
      );
  });
}
