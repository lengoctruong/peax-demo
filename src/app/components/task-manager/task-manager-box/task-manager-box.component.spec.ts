import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskContentComponent } from '../task-content/task-content.component';
import { TaskTitleComponent } from '../task-title/task-title.component';
import { TaskManagerBoxComponent } from './task-manager-box.component';

describe('TaskManagerComponent', () => {
  let component: TaskManagerBoxComponent;
  let fixture: ComponentFixture<TaskManagerBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TaskManagerBoxComponent,
        TaskContentComponent,
        TaskTitleComponent,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskManagerBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
