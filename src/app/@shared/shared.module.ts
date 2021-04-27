// Modules
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';

// Components
import { PrimaryButtonComponent } from './components/primary-button/primary-button.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SnackbarWithoutActionComponent } from './components/snackbar/snackbar-without-action/snackbar-without-action.component';
import { SnackbarWithActionComponent } from './components/snackbar/snackbar-with-action/snackbar-with-action.component';
import { CustomSnackbarWithoutActionComponent } from './components/snackbar/snackbar-without-action/custom-snackbar-without-action/custom-snackbar-without-action.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatTooltipModule,
    MatSnackBarModule
  ],
  declarations: [PrimaryButtonComponent, NotFoundComponent, SnackbarWithoutActionComponent,
    SnackbarWithActionComponent, CustomSnackbarWithoutActionComponent],
  exports: [
    PrimaryButtonComponent,
    MatButtonModule,
    MatTooltipModule,
    NotFoundComponent,
    SnackbarWithoutActionComponent
  ]
})
export class SharedModule {}
