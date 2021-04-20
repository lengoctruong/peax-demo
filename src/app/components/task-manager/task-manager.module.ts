import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SharedModule } from 'src/app/@shared/shared.module';
import { CategoryComponent } from './category/category.component';
import { TaskContentComponent } from './task-content/task-content.component';
import { TaskIndicatorComponent } from './task-indicator/task-indicator.component';
import { TaskManagerBoxComponent } from './task-manager-box/task-manager-box.component';
import { TaskManagerRoutingModule } from './task-manager-routing.module';
import { TaskManagerComponent } from './task-manager.component';
import { TaskTitleComponent } from './task-title/task-title.component';

// Reducers
import * as TaskManagerReducers from '@components/task-manager/state/task-manager.reducer';
import { StoreModule } from '@ngrx/store';

@NgModule({
  declarations: [
    CategoryComponent,
    TaskContentComponent,
    TaskManagerComponent,
    TaskTitleComponent,
    TaskIndicatorComponent,
    TaskManagerBoxComponent,
  ],
  imports: [CommonModule, TaskManagerRoutingModule, SharedModule,
    StoreModule.forFeature('categoryState', TaskManagerReducers.appReducer),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TaskManagerModule {}
