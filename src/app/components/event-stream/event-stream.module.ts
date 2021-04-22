import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventStreamComponent } from './event-stream.component';
import { SharedModule } from '@app/@shared/shared.module';

@NgModule({
  declarations: [EventStreamComponent],
  imports: [CommonModule, SharedModule],
  exports: [EventStreamComponent],
})
export class EventStreamModule {}
