import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskContentComponent } from '../task-content/task-content.component';
import { TaskManagerComponent } from '../task-manager-box/task-manager-box.component';
import { TaskTitleComponent } from '../task-title/task-title.component';
import { TaskIndicatorComponent } from './task-indicator.component';

describe('TaskIndicatorComponent', () => {
  let component: TaskIndicatorComponent;
  let fixture: ComponentFixture<TaskIndicatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TaskIndicatorComponent,
        TaskManagerComponent,
        TaskTitleComponent,
        TaskContentComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskIndicatorComponent);
    component = fixture.debugElement.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
