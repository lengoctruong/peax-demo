import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomSnackbarWithoutActionComponent } from './custom-snackbar-without-action.component';

describe('CustomSnackbarWithoutActionComponent', () => {
  let component: CustomSnackbarWithoutActionComponent;
  let fixture: ComponentFixture<CustomSnackbarWithoutActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomSnackbarWithoutActionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomSnackbarWithoutActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
