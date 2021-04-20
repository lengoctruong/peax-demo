// Modules
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

// Components
import { PrimaryButtonComponent } from './components/primary-button/primary-button.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatTooltipModule,
  ],
  declarations: [PrimaryButtonComponent, NotFoundComponent],
  exports: [
    PrimaryButtonComponent,
    MatButtonModule,
    MatTooltipModule,
    NotFoundComponent,
  ],
})
export class SharedModule {}
