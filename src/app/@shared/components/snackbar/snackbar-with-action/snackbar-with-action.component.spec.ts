import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackbarWithActionComponent } from './snackbar-with-action.component';

describe('SnackbarWithActionComponent', () => {
  let component: SnackbarWithActionComponent;
  let fixture: ComponentFixture<SnackbarWithActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SnackbarWithActionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackbarWithActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
