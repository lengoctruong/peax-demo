import { Component, Input, OnInit, AfterViewInit, ViewChild, OnChanges, SimpleChange } from '@angular/core';

@Component({
  selector: 'app-task-indicator',
  templateUrl: './task-indicator.component.html',
  styleUrls: ['./task-indicator.component.scss']
})
export class TaskIndicatorComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() currentTask: any;
  constructor() { }


  @ViewChild('progressContainer') progressContainer;
  progress;
  ngOnInit(): void {
  }

ngOnChanges(change){
  if(change){
    setTimeout(()=>{
      this.runAnimation()
    }, 100);
  }
}
  ngAfterViewInit() {
    this.runAnimation()
  }

  runAnimation(){
    this.progress = [...this.progressContainer.nativeElement.children];
    this.playNext();
    this.progress.map(el => {
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
    }
    if (!next) {
      this.progress.map(el => {
        el.classList.remove('active');
        el.classList.remove('passed');
      });
      next = this.progress[0];
    }
    if (next){
      next.classList.add('active');
    }
  };
}
