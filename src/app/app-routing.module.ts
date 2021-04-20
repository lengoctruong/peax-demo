import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './@shared/components/not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'task-manager', pathMatch: 'full' },
  {
    path: 'task-manager',
    loadChildren: () =>
      import('@components/task-manager/task-manager.module').then(
        (m) => m.TaskManagerModule
      ),
  },
  {
    path: 'event-stream',
    loadChildren: () =>
      import('@components/event-stream/event-stream.module').then(
        (m) => m.EventStreamModule
      ),
  },
  {
    path: 'notfound',
    component: NotFoundComponent,
  },
  {
    path: '**',
    redirectTo: '/notfound',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
