import {
  Component,
  OnInit,
  AfterViewInit,
  Input,
  OnChanges,
  ViewChild,
  ElementRef,
  // Renderer2,
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

// Animations
import * as Animations from '@app/@shared/animations';

@Component({
  selector: 'app-task-indicator',
  templateUrl: './task-indicator.component.html',
  styleUrls: ['./task-indicator.component.scss'],
})
export class TaskIndicatorComponent
  implements OnInit, AfterViewInit, OnChanges {
  // TODO: ngOnChanges not able to triggered if remove Input
  @Input() currentTask: CategoryData = { id: 0, data: [] };

  @ViewChild('taskIndicator') taskIndicator!: ElementRef;

  currentCategoryData$: Observable<CategoryData> = of();
  currentCategoryData: CategoryData = { id: 0, data: [] };
  progress;

  // UI variables
  LastItem = TaskIndicator.LastItem;
  ItemWithTitle = TaskIndicator.ItemWithTitle;

  Icon = 'icon';
  Flex0 = 'flex-0';
  Active = 'active';
  Passed = 'passed';
  BgIcon = 'bgicon';
  BgGrey = 'bg-grey';
  MoveLeft = 'move-left';
  MoveRight = 'move-right';
  BorderIcon = 'border-icon';
  ProgressBar = 'progress-bar';
  DisplayNone = 'display-none';
  ProgressValue = 'progress-value';

  // TransX
  // count = 1;
  // transX;

  constructor(
    private appState: Store<TaskManagerState.State> // private renderer: Renderer2
  ) {}

  ngOnInit() {}

  ngOnChanges(change) {
    if (change) {
      this.currentCategoryData$ = this.appState.select(
        TaskManagerSelectors.getCurrentCategoryDataSelector
      );
      this.currentCategoryData$.subscribe(
        (res) => (this.currentCategoryData = res)
      );

      this.focusIcon();

      setTimeout(() => {
        if (this.currentCategoryData.data.length > TaskIndicator.LastItem) {
          this.hideLastItem();
        }
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
    const idTemp = Animations.concatClassName(this.ProgressBar, '', '_');
    const classElement = Animations.getElementWithClass(this.ProgressBar);
    const classLength = classElement.length;
    const item: Element[] = [];

    for (let i = 0; i < classLength; i++) {
      // Reset style
      Animations.removeClass(classElement[i], this.BgGrey);

      // Find elements to run animation
      if (parseInt(classElement[i].id.replace(idTemp, ''), 0) >= index) {
        item.push(classElement[i].children[0]);
      } else {
        // Add background color for elements, which do not run animation
        Animations.addClass(classElement[i], this.BgGrey);
      }
    }

    this.runAnimation(item);
    this.appState.dispatch(
      TaskManagerActions.getCurrentTaskById({ id: data.id })
    );
  }

  scrollLeft() {
    Animations.scrollLeft(this.ProgressBar, this.Flex0, this.DisplayNone);
  }

  private runAnimation(currentElement: Element[] = []) {
    this.progress =
      currentElement.length > 0
        ? currentElement
        : Array.from(Animations.queryAll(this.ProgressValue, '.'));

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

      Animations.removeClass(current, this.Active);
      Animations.addClass(current, this.Passed);

      if (currentIndex === this.progress.length - 1 && e !== undefined) {
        let id = 0;
        this.currentCategoryData$.subscribe((item) => (id = item.id));

        if (id) {
          const iconId = this.Icon.concat('-') + (id + 1);
          setTimeout(() => {
            Animations.getElementWithId(iconId)?.click();
          }, 200);
        }
      }
    }
    if (!next) {
      next = this.removeState();
    }
    if (next) {
      Animations.addClass(next, this.Active);
      // Get task content
      setTimeout(() => {
        // Fix: Expression has changed after it was checked
        this.getTaskContent(next.id);
      }, 100);
    }
  };

  private removeState() {
    this.progress.map((el) => {
      Animations.removeClass(el, this.Active);
      Animations.removeClass(el, this.Passed);
    });
    return this.progress[0];
  }

  private focusIcon() {
    let id = 0;
    this.currentCategoryData$.subscribe((item) => (id = item.id));
    if (id) {
      Animations.focusIcon(id, this.BgIcon, this.BorderIcon);
    }
  }

  private getTaskContent(id: string) {
    this.appState.dispatch(TaskManagerActions.getCurrentTaskById({ id }));
  }

  private slideLeft() {
    // Animation is triggered when a task done
    Animations.slideLeftLastItem(
      this.ProgressBar,
      this.MoveRight,
      this.MoveLeft
    );
  }

  // moveTaskIndicator() {
  //   // const taskIndicatorContainer = document.querySelector('#task-indicatior');

  //   const progressbar: HTMLParagraphElement = this.renderer.createElement(
  //     'div'
  //   );
  //   const progressvalue: HTMLParagraphElement = this.renderer.createElement(
  //     'div'
  //   );
  //   this.addClass(progressvalue, 'task-indicator-count');
  //   this.renderer.appendChild(this.taskIndicator.nativeElement, progressbar);
  //   progressbar.appendChild(progressvalue);
  //   // Count move left
  //   this.transX = -112 * this.count;
  //   this.count++;
  //   // Add width into task container
  //   const widthTaskContainer = this.taskIndicator.nativeElement.offsetWidth;
  //   const increaseContainer = widthTaskContainer + 112;
  //   this.renderer.setStyle(
  //     this.taskIndicator.nativeElement,
  //     'width',
  //     increaseContainer + 'px'
  //   );
  // }

  private hideLastItem() {
    Animations.hideLastItem(this.ProgressBar, this.Flex0);
  }
}
