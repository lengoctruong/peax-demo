import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoryComponent } from './category/category.component';
import { TaskIndicatorComponent } from './task-indicator/task-indicator.component';
import { TaskManagerComponent } from './task-manager/task-manager.component';
import { TaskTitleComponent } from './task-title/task-title.component';
import { TaskContentComponent } from './task-content/task-content.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    TaskIndicatorComponent,
    TaskManagerComponent,
    TaskTitleComponent,
    TaskContentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    MatTooltipModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
