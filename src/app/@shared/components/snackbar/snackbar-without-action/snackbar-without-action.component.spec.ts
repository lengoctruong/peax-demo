import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackbarWithoutActionComponent } from './snackbar-without-action.component';

describe('SnackbarWithoutActionComponent', () => {
  let component: SnackbarWithoutActionComponent;
  let fixture: ComponentFixture<SnackbarWithoutActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SnackbarWithoutActionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackbarWithoutActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
