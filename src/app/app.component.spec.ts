import { AppComponent } from './app.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoryComponent } from './category/category.component';
import { TaskContentComponent } from './task-content/task-content.component';
import { TaskIndicatorComponent } from './task-indicator/task-indicator.component';
import { TaskManagerComponent } from './task-manager/task-manager.component';
import { TaskTitleComponent } from './task-title/task-title.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Observable } from 'rxjs';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { appReducer } from './state/app.reducer';
import { PrimaryButtonComponent } from './_shared/primary-button/primary-button.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import * as AppActions from './state/app.action';
import { CategoryState } from './state/app.state';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        CategoryComponent,
        TaskIndicatorComponent,
        TaskManagerComponent,
        TaskTitleComponent,
        TaskContentComponent,
        PrimaryButtonComponent,
      ],
      imports: [
        MatTooltipModule,
        MatButtonModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('categoryState', appReducer),
        StoreDevtoolsModule.instrument({
          name: 'Peax demo DevTools',
          maxAge: 25,
          logOnly: environment.production,
        }),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;

    fixture.detectChanges();
  });

  test('should create the app', () => {
    expect(component).toBeTruthy();
  });

  test('categories and currentTask should be instance of Observable after ngOnInit', () => {
    component.ngOnInit();
    expect(component.categories$).toBeInstanceOf(Observable);
    expect(component.currentTask$).toBeInstanceOf(Observable);
  });
});

describe('reducers', () => {
  const initialState: CategoryState = {
    category: [
      { id: 1, name: 'Rocket', pendingTask: 5 },
      { id: 2, name: 'Onboarding', pendingTask: 5 },
      { id: 3, name: 'Mailbox', pendingTask: 3 },
      { id: 4, name: 'Office', pendingTask: 10 },
    ],
    data: [
      {
        id: 1,
        data: [
          {
            id: '101',
            title: 'Order confirmation',
            content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries`,
            img: '/assets/icons/dummy.png',
          },
          {
            id: '102',
            title: 'Credit card from Swiss Bank',
            content: `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.`,
            img: '/assets/icons/dummy.png',
          },
          {
            id: '103',
            title: 'Electricity bill',
            content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation`,
            img: '/assets/icons/dummy.png',
          },
          {
            id: '104',
            title: 'Gas bill',
            content: `Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit`,
            img: '/assets/icons/dummy.png',
          },
          {
            id: '105',
            title: 'Internet bill',
            content: `But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system`,
            img: '/assets/icons/dummy.png',
          },
        ]
      }
    ],
    currentCategoryData: {
      id: 1,
      data: [
        {
          id: '101',
          title: 'Order confirmation',
          content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries`,
          img: '/assets/icons/dummy.png',
        },
        {
          id: '102',
          title: 'Credit card from Swiss Bank',
          content: `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.`,
          img: '/assets/icons/dummy.png',
        },
        {
          id: '103',
          title: 'Electricity bill',
          content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation`,
          img: '/assets/icons/dummy.png',
        },
        {
          id: '104',
          title: 'Gas bill',
          content: `Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit`,
          img: '/assets/icons/dummy.png',
        },
        {
          id: '105',
          title: 'Internet bill',
          content: `But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system`,
          img: '/assets/icons/dummy.png',
        },
      ]
    },
    currentTask: { id: '', content: '', img: '', title: '' }
  };

  test('should return the current category data', () => {
    expect(appReducer(initialState, AppActions.getCurrentCategoryData({ id: 1 }))).toHaveProperty('currentCategoryData.id', 1);
  });

  test('should remove the category data', () => {
    const expectedCategory = [
      { id: 2, name: 'Onboarding', pendingTask: 5 },
      { id: 3, name: 'Mailbox', pendingTask: 3 },
      { id: 4, name: 'Office', pendingTask: 10 },
    ];
    expect(appReducer(initialState, AppActions.removeCategory({ id: 1 }))).toHaveProperty('category', expectedCategory);
  });

  test('should return current task', () => {
    const expectedCurrentTask = {
      id: '101',
      title: 'Order confirmation',
      content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries`,
      img: '/assets/icons/dummy.png',
    };
    expect(appReducer(initialState, AppActions.getCurrentTaskById({ id: '101' }))).toHaveProperty('currentTask', expectedCurrentTask);
  });
});

describe('actions', () => {
  test('create action [App] Get Current Task', () => {
    const expectedAction = {
      type: '[App] Get Current Task',
      id: 1
    };
    expect(AppActions.getCurrentCategoryData({ id: 1 })).toEqual(expectedAction);
  });

  test('create action [App] Remove Category', () => {
    const expectedAction = {
      type: '[App] Remove Category',
      id: 1
    };
    expect(AppActions.removeCategory({ id: 1 })).toEqual(expectedAction);
  });

  test('create action [App] Get Current Task By Id', () => {
    const expectedAction = {
      type: '[App] Get Current Task By Id',
      id: '101'
    };
    expect(AppActions.getCurrentTaskById({ id: '101' })).toEqual(expectedAction);
  });
});