import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { horizontalPositionType, verticalPositionType } from '@app/@shared/types/snackbar-position.type';
import { CustomSnackbarWithoutActionComponent } from './custom-snackbar-without-action/custom-snackbar-without-action.component';

@Component({
  selector: 'app-snackbar-without-action',
  templateUrl: './snackbar-without-action.component.html',
  styleUrls: ['./snackbar-without-action.component.scss']
})
export class SnackbarWithoutActionComponent implements OnInit {

  private durationInSeconds = 10;
  private horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  private verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  openSnackBar(message: string, horizontalPosition?: horizontalPositionType, verticalPosition?: verticalPositionType,
               durationInSeconds?: number) {
    if (horizontalPosition) {
      this.horizontalPosition = horizontalPosition;
    }
    if (verticalPosition) {
      this.verticalPosition = verticalPosition;
    }
    if (durationInSeconds) {
      this.durationInSeconds = durationInSeconds;
    }

    this.snackBar.openFromComponent(CustomSnackbarWithoutActionComponent, {
      data: message,
      duration: this.durationInSeconds * 1000,
      panelClass: ['snackbar-without-action'],
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
