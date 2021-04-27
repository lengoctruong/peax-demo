import { Component, Inject, OnInit } from '@angular/core';
import {MAT_SNACK_BAR_DATA} from '@angular/material/snack-bar';

@Component({
  selector: 'app-custom-snackbar-without-action',
  templateUrl: './custom-snackbar-without-action.component.html',
  styleUrls: ['./custom-snackbar-without-action.component.scss']
})
export class CustomSnackbarWithoutActionComponent implements OnInit {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
