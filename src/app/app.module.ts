import { appReducer } from './state/app.reducer';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoryComponent } from './category/category.component';
import { TaskIndicatorComponent } from './task-indicator/task-indicator.component';
import { TaskManagerComponent } from './task-manager/task-manager.component';
import { TaskTitleComponent } from './task-title/task-title.component';
import { TaskContentComponent } from './task-content/task-content.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { PrimaryButtonComponent } from './_shared/primary-button/primary-button.component';
// import { taskIndicatorReducer } from './task-indicator/state/task-indicator.reducer';

@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    TaskIndicatorComponent,
    TaskManagerComponent,
    TaskTitleComponent,
    TaskContentComponent,
    PrimaryButtonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    MatTooltipModule,
    MatButtonModule,
    StoreModule.forRoot({}),
    StoreModule.forFeature('categoryState', appReducer),
    // StoreModule.forFeature('taskIndicatorState', taskIndicatorReducer),
    StoreDevtoolsModule.instrument({
      name: 'Peax demo DevTools',
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
