import {
  Component,
  Input,
  OnInit,
  HostListener,
  ViewChild,
} from '@angular/core';
import { Observable, of } from 'rxjs';
import { CategoryData, Task } from '../_model';
import * as AppState from '../state/app.state';
import { Store } from '@ngrx/store';
import {
  getCategoryDataSelector,
  getCurrentCategoryDataSelector,
  getCurrentTaskSelector,
} from '../state/app.selector';
import {
  completeTask,
  setCurrentCategoryData,
  setCurrentTask,
} from '../state/app.action';

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
      while (true) {
        if (nextControl) {
          if (nextControl.type === e.srcElement.type) {
            nextControl.focus();
            return;
          } else {
            nextControl = nextControl.nextElementSibling;
          }
        } else {
          return;
        }
      }
    }
  }

  constructor(private appState: Store<AppState.State>) {
    this.numbers = [0, 1, 2, 3, 4, 5, 6, 7];
  }

  ngOnInit(): void {}

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

  execute(event: string) {
    // Temp variables
    let apiData: CategoryData[] = [];
    let currentCategoryData: CategoryData = { id: 0, data: [] };
    let currentTask: Task = { id: '', title: '', img: '', content: '' };

    // Select data from AppState
    this.currentTask$ = this.appState.select(getCurrentTaskSelector);
    this.currentCategoryData$ = this.appState.select(
      getCurrentCategoryDataSelector
    );

    // Assign value to [Temp variables]
    this.currentTask$.subscribe((data) => (currentTask = data));
    this.currentCategoryData$.subscribe((data) => (currentCategoryData = data));

    // Find task index
    const taskIndex = currentCategoryData.data.findIndex(
      (item) => item.id === currentTask.id
    );

    this.addError();
    this.appState.dispatch(completeTask());

    setTimeout(() => {
      // If index === currentCategoryData.data.length: then next category
      if (taskIndex - 1 === currentCategoryData.data.length) {
        this.apiData$ = this.appState.select(getCategoryDataSelector);
        this.apiData$.subscribe((data) => (apiData = data));

        // Find current category index
        const curCategogyIndex = apiData.findIndex(
          (item) => item.id === currentCategoryData.id
        );

        this.appState.dispatch(
          setCurrentCategoryData({ data: apiData[curCategogyIndex + 1] })
        );
      } else {
        // Next task
        this.appState.dispatch(
          setCurrentTask({ task: currentCategoryData.data[taskIndex + 1] })
        );
      }
    }, 2000);
  }
}
