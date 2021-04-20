import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventStreamModule } from './event-stream.module';

const routes: Routes = [
  // Module is lazy loaded, see app-routing.module.ts
  { path: '', component: EventStreamModule },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class EventStreamRoutingModule {}
