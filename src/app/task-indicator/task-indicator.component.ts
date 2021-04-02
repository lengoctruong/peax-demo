import {
  Component,
  Input,
  OnInit,
  OnChanges,
  AfterViewInit,
} from '@angular/core';
import { CategoryData, Task } from '../model';

@Component({
  selector: 'app-task-indicator',
  templateUrl: './task-indicator.component.html',
  styleUrls: ['./task-indicator.component.scss'],
})
export class TaskIndicatorComponent
  implements OnInit, OnChanges, AfterViewInit {
  @Input() currentTask: CategoryData[] = [];
  taskContent: Task[] = [];
  progress;

  constructor() {}

  ngOnInit(): void {}

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
    const id = 'progress-bar_' + index;
    const classElement = this.getElementWithClass('progress-bar');
    const classLength = classElement.length;
    const item: Element[] = [];

    for (let i = 0; i < classLength; i++) {
      // Reset style
      this.removeClass(classElement[i].children[0], 'bg-grey');

      // Find elements to run animation
      if (classElement[i].id >= id) {
        item.push(classElement[i].children[0]);
      } else {
        // Add background color for elements, which do not run animation
        this.addClass(classElement[i].children[0], 'bg-grey');
      }
    }

    this.runAnimation(item);
    this.taskContent = [data];
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
        const id = this.currentTask[0].id;
        if (id) {
          const iconId = 'icon-' + (id + 1);
          setTimeout(() => {
            document.getElementById(iconId)?.click();
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
    const id = this.currentTask[0].id;
    if (id) {
      const iconId = 'bgicon-' + id;
      const element = document.getElementById(iconId);

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
    this.taskContent = this.currentTask[0].data.filter(
      (task) => task.id === id
    );
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
}
