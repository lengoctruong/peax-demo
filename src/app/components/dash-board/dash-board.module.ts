import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { EventStreamModule } from '../event-stream/event-stream.module';
import { TaskManagerModule } from '../task-manager/task-manager.module';
import { DashBoardRoutingModule } from './dash-board-routing.module';
import { DashBoardComponent } from './dash-board.component';

@NgModule({
  declarations: [DashBoardComponent],
  imports: [
    CommonModule,
    EventStreamModule,
    DashBoardRoutingModule,
    TaskManagerModule,
  ],
  exports: [DashBoardComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DashBoardModule {}
