import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './@shared/components/not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'dash-board', pathMatch: 'full' },
  {
    path: 'dash-board',
    loadChildren: () =>
      import('@components/dash-board/dash-board.module').then(
        (m) => m.DashBoardModule
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
