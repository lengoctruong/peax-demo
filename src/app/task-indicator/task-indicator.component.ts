import {
  Component,
  Input,
  OnInit,
  AfterViewInit,
  ViewChild,
  OnChanges,
} from '@angular/core';
import { CategoryData } from '../model';

@Component({
  selector: 'app-task-indicator',
  templateUrl: './task-indicator.component.html',
  styleUrls: ['./task-indicator.component.scss'],
})
export class TaskIndicatorComponent
  implements OnInit, AfterViewInit, OnChanges {
  @Input() currentTask: CategoryData[] = [];
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
  ngAfterViewInit() {
    this.focusIcon();
    this.runAnimation();
  }

  runAnimation() {
    this.progress = [...this.progressContainer.nativeElement.children];
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
        //call next category
        //  this.taskId;
        //  this.currentTask;
        //const iconId = document.getElementById('icon-'+ 1);
        const elementClick = document.getElementById('icon-2')?.click();
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
}
