import {
  Component,
  Input,
  OnInit,
  HostListener,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-task-content',
  templateUrl: './task-content.component.html',
  styleUrls: ['./task-content.component.scss'],
})
export class TaskContentComponent implements OnInit {
  @Input() content = '';
  @Input() img = '';
  @ViewChild('activationCode') activationCode;
  constructor() {}

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
  @HostListener('keyup', ['$event']) onKeyDown(e: any) {
    var key = e.keyCode || e.charCode;
    let previous: any = e.srcElement.previousSibling;
    if (key == 8 || key == 46) {
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

  clearNumberField() {
    const children = this.activationCode.nativeElement.children;
    for (let child of children) {
      child.value = '';
    }
    children[0].focus();
  }
}
