import {
  Component,
  Input,
  OnInit,
  HostListener,
  ViewChild,
} from '@angular/core';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';

// Model
import { CategoryData, Task } from 'src/app/@shared/models';

// State
import * as AppState from 'src/app/@state/app.state';

// Selectors
import * as AppSelectors from 'src/app/@state/app.selector';

// Actions
import * as AppActions from 'src/app/@state/app.action';

@Component({
  selector: 'app-task-content',
  templateUrl: './task-content.component.html',
  styleUrls: ['./task-content.component.scss'],
})
export class TaskContentComponent implements OnInit {
  @Input() content = '';
  @Input() img = '';
  @ViewChild('activationCode') activationCode;
  numbers;

  apiData$: Observable<CategoryData[]> = of();
  currentTask$: Observable<Task> = of();
  currentCategoryData$: Observable<CategoryData> = of();

  @HostListener('keyup', ['$event']) onKeyDown(e: any) {
    const key = e.keyCode || e.charCode;
    const previous: any = e.srcElement.previousSibling;
    if (key === 8 || key === 46) {
      if (previous != null) {
        previous.focus();
        return;
      }
    }
    if (e.srcElement.maxLength === e.srcElement.value.length) {
      e.preventDefault();

      let nextControl: any = e.srcElement.nextElementSibling;
      let addErrorFlag = true;
      while (addErrorFlag) {
        if (nextControl) {
          if (nextControl.type === e.srcElement.type) {
            nextControl.focus();
            return;
          } else {
            nextControl = nextControl.nextElementSibling;
          }
        } else {
          this.addError();
          addErrorFlag = false;
        }
      }
    }
  }

  constructor(private appState: Store<AppState.State>) {
    this.numbers = [0, 1, 2, 3, 4, 5, 6, 7];
  }

  ngOnInit() {
    this.apiData$ = this.appState.select(AppSelectors.getCategoryDataSelector);

    this.currentTask$ = this.appState.select(
      AppSelectors.getCurrentTaskSelector
    );

    this.currentCategoryData$ = this.appState.select(
      AppSelectors.getCurrentCategoryDataSelector
    );
  }

  addError() {
    const numberArray = document.querySelectorAll('.activation-code');

    numberArray.forEach((element) => {
      element.classList.add('error');
    });
    setTimeout(() => {
      this.removeError(numberArray);
    }, 850);
    this.clearNumberField();
  }

  removeError(numberArray: any) {
    numberArray.forEach((element) => {
      element.classList.remove('error');
    });
  }

  clearNumberField() {
    const children = this.activationCode.nativeElement.children;
    for (const child of children) {
      child.value = '';
    }
    children[0].focus();
  }

  execute(event: any) {
    const action = this.getAction(event);

    // Temp variables
    let apiData: CategoryData[] = [];
    let currentCategoryData: CategoryData = { id: 0, data: [] };
    let currentTask: Task = { id: '', title: '', img: '', content: '' };

    // Assign value to [Temp variables]
    this.currentTask$.subscribe((data) => (currentTask = data));
    this.currentCategoryData$.subscribe((data) => (currentCategoryData = data));

    // Find task index
    const taskIndex = currentCategoryData.data.findIndex(
      (item) => item.id === currentTask.id
    );

    this.appState.dispatch(action);

    setTimeout(() => {
      // If index === currentCategoryData.data.length: then next category
      if (taskIndex === currentCategoryData.data.length - 1) {
        this.apiData$.subscribe((data) => (apiData = data));

        // Find current category index
        const curCategogyIndex = apiData.findIndex(
          (item) => item.id === currentCategoryData.id
        );

        this.removeTask(currentCategoryData.id, currentTask.id);

        this.appState.dispatch(
          AppActions.setCurrentCategoryData({
            data: apiData[curCategogyIndex + 1],
          })
        );

        // Next task
        // taskIndex no need to +1 due to - (1)
        this.setCurrentTask(currentCategoryData.data[taskIndex]);
      } else {
        // (1) - Remove current task
        this.removeTask(currentCategoryData.id, currentTask.id);

        // Next task
        this.setCurrentTask(currentCategoryData.data[taskIndex]);
      }
    }, 2000);
  }

  private removeTask(cateId: number, taskId: string) {
    this.appState.dispatch(
      AppActions.removeTask({
        cateId,
        taskId,
      })
    );
  }

  private setCurrentTask(task: Task) {
    this.appState.dispatch(
      AppActions.setCurrentTask({
        task,
      })
    );
  }

  private getAction(actionName: string) {
    let action;
    switch (actionName) {
      case 'completeTask':
        action = AppActions.completeTask();
        break;
      default:
        break;
    }

    return action;
  }
}
