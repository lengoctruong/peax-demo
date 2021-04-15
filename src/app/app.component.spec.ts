import { AppComponent } from './app.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoryComponent } from './category/category.component';
import { TaskContentComponent } from './task-content/task-content.component';
import { TaskIndicatorComponent } from './task-indicator/task-indicator.component';
import { TaskManagerComponent } from './task-manager/task-manager.component';
import { TaskTitleComponent } from './task-title/task-title.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Category } from './model';
import { Observable } from 'rxjs';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { appReducer } from './state/app.reducer';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  const event = {
    id: 1,
    name: 'Rocket',
    pendingTask: 5,
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        CategoryComponent,
        TaskIndicatorComponent,
        TaskManagerComponent,
        TaskTitleComponent,
        TaskContentComponent,
      ],
      imports: [MatTooltipModule,
        MatButtonModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('app', appReducer),
        StoreDevtoolsModule.instrument({
          name: 'Peax demo DevTools',
          maxAge: 25,
          logOnly: environment.production,
        }),]
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;

    fixture.detectChanges();
  });

  test('should create the app', () => {
    expect(component).toBeTruthy();
  });

  test.only('getCategory - categories should has length equal 0', () => {
    const getCategorySpy = jest.spyOn(
      AppComponent.prototype as any,
      'getCategory'
    );
    getCategorySpy.mockImplementation(() => {
      return (component.categories$ = new Observable<Category[]>());
    });

    expect(component.ngOnInit()).toBeUndefined();
  });

  test(`getSelectedCategory - should contain event id`, () => {
    const data = component.getSelectedCategory(event);
    expect(data[0]).toHaveProperty('idz', 1);
  });

  test(`removeCategory - should run`, () => {
    expect(component.removeCategory(event)).toBeTruthy();
  });
});
