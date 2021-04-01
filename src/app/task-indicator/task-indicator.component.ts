import {
  Component,
  Input,
  OnInit,
  AfterViewInit,
  ViewChild,
  OnChanges,
} from '@angular/core';
import { CategoryData, Task } from '../model';

@Component({
  selector: 'app-task-indicator',
  templateUrl: './task-indicator.component.html',
  styleUrls: ['./task-indicator.component.scss'],
})
export class TaskIndicatorComponent
  implements OnInit, AfterViewInit, OnChanges {
  @Input() currentTask: CategoryData[] = [];
  taskContent: Task[] = [];
  constructor() {}

  @ViewChild('progressContainer') progressContainer;
  progress;
  ngOnInit(): void {
    // this.taskContent = [];
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
    this.runAnimation();
  }

  runAnimation() {
    //this.progress = [...this.progressContainer.nativeElement.children];
    this.progress = Array.from(document.querySelectorAll(".progress-value"))
    this.playNext();
    this.progress.map((el) => {
      el.addEventListener('animationend', (e) => this.playNext(e));
    });
  }

  playNext = (e?: any) => {
    const current = e && e.target;
    let next;
    if (current) {
      const currentIndex = this.progress.indexOf(current);
      if (currentIndex < this.progress.length) {
        next = this.progress[currentIndex + 1];
      }
      current.classList.remove('active');
      current.classList.add('passed');
      if (currentIndex === this.progress.length - 1) {
        const id = this.currentTask[0].id;
        if (id) {
        const iconId = 'icon-' + (id + 1);
        document.getElementById(iconId)?.click();        
      }
    }
    }
    if (!next) {
      this.progress.map((el) => {
        el.classList.remove('active');
        el.classList.remove('passed');
      });
      next = this.progress[0];
    }
    if (next) {
      next.classList.add('active');

      // Get task content
      setTimeout(() => {
        // Fix: Expression has changed after it was checked
        this.getTaskContent(next.id);
      }, 100);
    }
  };

  focusIcon() {
    const id = this.currentTask[0].id;
    if (id) {
      const iconId = 'icon-' + (id - 1);
      const element = document.getElementById(iconId);

      // Remove focus
      const bgIcon = document.querySelectorAll('.bgicon') as any;
      if (bgIcon.length > 0) {
        bgIcon.forEach((ele) => ele.classList.remove('border-icon'));
      }

      // Add focus to active category
      element?.classList.add('border-icon');
    }
  }

  getTaskContent(id: string) {
    this.taskContent = this.currentTask[0].data.filter(
      (task) => task.id === id
    );
    return this.taskContent;
  }
}
