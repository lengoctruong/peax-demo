// Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './@core/core.module';
import { SharedModule } from './@shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';

// Components
import { AppComponent } from './app.component';

// Reducers
// import * as AppReducers from 'src/app/@state/app.reducer';
import { EventStreamComponent } from './components/event-stream/event-stream.component';

@NgModule({
  declarations: [AppComponent, EventStreamComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,

    StoreModule.forRoot({}),
    // StoreModule.forFeature('categoryState', AppReducers.appReducer),
    StoreDevtoolsModule.instrument({
      name: 'Peax demo DevTools',
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
