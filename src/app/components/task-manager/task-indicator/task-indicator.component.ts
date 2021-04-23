import {
  Component,
  OnInit,
  AfterViewInit,
  Input,
  OnChanges,
  ViewChild,
  ElementRef,
  Renderer2,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';

// Model
import {
  CategoryData,
  Task,
} from '@components/task-manager/models/category.model';

// State
import * as TaskManagerState from '@components/task-manager/state/task-manager.state';

// Selectors
import * as TaskManagerSelectors from '@components/task-manager/state/task-manager.selector';

// Actions
import * as TaskManagerActions from '@components/task-manager/state/task-manager.action';

// Enums
import { TaskIndicator } from '@app/@shared/enums/task-indicator.enum';

@Component({
  selector: 'app-task-indicator',
  templateUrl: './task-indicator.component.html',
  styleUrls: ['./task-indicator.component.scss'],
})
export class TaskIndicatorComponent
  implements OnInit, AfterViewInit, OnChanges {
  constructor(
    private appState: Store<TaskManagerState.State>,
    private renderer: Renderer2
  ) {}
  // TODO: ngOnChanges not able to triggered if remove Input
  @Input() currentTask: CategoryData = { id: 0, data: [] };

  @ViewChild('taskIndicator') taskIndicator!: ElementRef;

  currentCategoryData$: Observable<CategoryData> = of({ id: 0, data: [] });
  progress;

  // UI variables
  LastItem = TaskIndicator.LastItem;
  ItemWithTitle = TaskIndicator.ItemWithTitle;
  // TransX
  count = 1;
  transX;

  ngOnInit() {
    this.currentCategoryData$ = this.appState.select(
      TaskManagerSelectors.getCurrentCategoryDataSelector
    );
  }

  ngOnChanges(change) {
    if (change) {
      this.focusIcon();

      setTimeout(() => {
        this.runAnimation();
      }, 100);
    }
  }

  ngAfterViewInit() {
    this.focusIcon();
  }

  selectTask(data: Task, index: number) {
    if (index === 9) {
      return;
    }
    const idTemp = 'progress-bar_';
    const classElement = this.getElementWithClass('progress-bar');
    const classLength = classElement.length;
    const item: Element[] = [];

    for (let i = 0; i < classLength; i++) {
      // Reset style
      this.removeClass(classElement[i], 'bg-grey');

      // Find elements to run animation
      if (parseInt(classElement[i].id.replace(idTemp, ''), 0) >= index) {
        item.push(classElement[i].children[0]);
      } else {
        // Add background color for elements, which do not run animation
        this.addClass(classElement[i], 'bg-grey');
      }
    }

    this.runAnimation(item);
    this.appState.dispatch(
      TaskManagerActions.getCurrentTaskById({ id: data.id })
    );
  }

  private runAnimation(currentElement: Element[] = []) {
    this.progress =
      currentElement.length > 0
        ? currentElement
        : Array.from(document.querySelectorAll('.progress-value'));

    this.playNext();
    this.progress.map((el) => {
      el.addEventListener('animationend', (e) => this.playNext(e));
    });
  }

  private playNext = (e?: any) => {
    const current = e && e.target;
    let next;
    if (current) {
      const currentIndex = this.progress.indexOf(current);
      if (currentIndex < this.progress.length) {
        next = this.progress[currentIndex + 1];
      }
      this.removeClass(current, 'active');
      this.addClass(current, 'passed');
      if (currentIndex === this.progress.length - 1 && e !== undefined) {
        let id = 0;
        this.currentCategoryData$.subscribe((item) => (id = item.id));
        if (id) {
          const iconId = 'icon-' + (id + 1);
          setTimeout(() => {
            this.getElementWithId(iconId)?.click();
          }, 200);
        }
      }
    }
    if (!next) {
      next = this.removeAnimation();
    }
    if (next) {
      this.addClass(next, 'active');
      // Get task content
      setTimeout(() => {
        // Fix: Expression has changed after it was checked
        this.getTaskContent(next.id);
      }, 100);
    }
  };

  private removeAnimation() {
    this.progress.map((el) => {
      this.removeClass(el, 'active');
      this.removeClass(el, 'passed');
    });
    return this.progress[0];
  }

  private focusIcon() {
    let id = 0;
    this.currentCategoryData$.subscribe((item) => (id = item.id));
    if (id) {
      const iconId = 'bgicon-' + id;
      const element = this.getElementWithId(iconId);

      // Remove focus
      const bgIcon = document.querySelectorAll('.bgicon') as any;
      if (bgIcon.length > 0) {
        bgIcon.forEach((ele) => this.removeClass(ele, 'border-icon'));
      }

      // Add focus to active category
      if (element) {
        this.addClass(element, 'border-icon');
      }
    }
  }

  private getTaskContent(id: string) {
    this.appState.dispatch(TaskManagerActions.getCurrentTaskById({ id }));
  }

  private removeClass(element: HTMLElement | Element, className: string = '') {
    if (!element) {
      return;
    }
    element.classList.remove(className);
  }

  private addClass(element: HTMLElement | Element, className: string = '') {
    if (!element) {
      return;
    }
    element.classList.add(className);
  }

  private getElementWithId(id: string) {
    return document.getElementById(id);
  }

  private getElementWithClass(className: string) {
    return document.getElementsByClassName(className);
  }
  moveTaskIndicator() {
    const taskIndicatorContainer = document.querySelector('#task-indicatior');

    const progressbar: HTMLParagraphElement = this.renderer.createElement(
      'div'
    );
    const progressvalue: HTMLParagraphElement = this.renderer.createElement(
      'div'
    );
    this.addClass(progressvalue, 'task-indicator-count');
    this.renderer.appendChild(this.taskIndicator.nativeElement, progressbar);
    progressbar.appendChild(progressvalue);
    // Count move left
    this.transX = -112 * this.count;
    this.count++;
    // Add width into task container
    const widthTaskContainer = this.taskIndicator.nativeElement.offsetWidth;
    const increaseContainer = widthTaskContainer + 112;
    this.renderer.setStyle(
      this.taskIndicator.nativeElement,
      'width',
      increaseContainer + 'px'
    );
  }
}
