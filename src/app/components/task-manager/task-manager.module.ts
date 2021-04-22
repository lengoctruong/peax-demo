import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SharedModule } from 'src/app/@shared/shared.module';
import { CategoryComponent } from './category/category.component';
import { TaskContentComponent } from './task-content/task-content.component';
import { TaskIndicatorComponent } from './task-indicator/task-indicator.component';
import { TaskManagerBoxComponent } from './task-manager-box/task-manager-box.component';
import { TaskManagerComponent } from './task-manager.component';
import { TaskTitleComponent } from './task-title/task-title.component';

// Reducers
import * as TaskManagerReducers from '@components/task-manager/state/task-manager.reducer';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TaskManagerEffects } from '@components/task-manager/state/task-manager.effect';

@NgModule({
  declarations: [
    CategoryComponent,
    TaskContentComponent,
    TaskManagerComponent,
    TaskTitleComponent,
    TaskIndicatorComponent,
    TaskManagerBoxComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    StoreModule.forFeature('categoryState', TaskManagerReducers.appReducer),
    EffectsModule.forFeature([TaskManagerEffects]),
  ],
  exports: [
    CategoryComponent,
    TaskContentComponent,
    TaskManagerComponent,
    TaskTitleComponent,
    TaskIndicatorComponent,
    TaskManagerBoxComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TaskManagerModule {}
