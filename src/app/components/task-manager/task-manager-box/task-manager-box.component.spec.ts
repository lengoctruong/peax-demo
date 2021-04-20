import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskContentComponent } from '../task-content/task-content.component';
import { TaskTitleComponent } from '../task-title/task-title.component';
import { TaskManagerComponent } from './task-manager-box.component';

describe('TaskManagerComponent', () => {
  let component: TaskManagerComponent;
  let fixture: ComponentFixture<TaskManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TaskManagerComponent,
        TaskContentComponent,
        TaskTitleComponent,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
