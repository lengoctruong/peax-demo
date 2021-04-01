import { Component, Input, OnInit, ViewChild, OnChanges } from '@angular/core';
import { CategoryData, Task } from '../model';

@Component({
  selector: 'app-task-indicator',
  templateUrl: './task-indicator.component.html',
  styleUrls: ['./task-indicator.component.scss'],
})
export class TaskIndicatorComponent implements OnInit, OnChanges {
  @Input() currentTask: CategoryData[] = [];
  taskContent: Task[] = [];
  constructor() {}

  @ViewChild('progressContainer') progressContainer;
  progress;
  ngOnInit(): void {}

  ngOnChanges(change) {
    if (change) {
      this.focusIcon();

      setTimeout(() => {
        this.runAnimation();
      }, 100);
    }
  }

  selectTask(data: Task) {
    this.taskContent = [data];
  }

  private runAnimation() {
    this.progress = Array.from(document.querySelectorAll('.progress-value'));
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
      this.progress.map((el) => {
        this.removeClass(el, 'active');
        this.removeClass(el, 'passed');
      });
      next = this.progress[0];
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

  private removeClass(element: HTMLElement, className: string = '') {
    if (!element) {
      return;
    }
    element.classList.remove(className);
  }

  private addClass(element: HTMLElement, className: string = '') {
    if (!element) {
      return;
    }
    element.classList.add(className);
  }
}
