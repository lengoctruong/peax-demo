import {
  Component,
  Input,
  OnInit,
  HostListener,
  ViewChild,
} from '@angular/core';

// Animations
import * as Animations from '@app/@shared/animations';

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

  // UI Variables
  Error = 'error';
  ActivationCode = 'activation-code';

  @HostListener('keyup', ['$event']) onKeyDown(e: any) {
    const key = e.keyCode || e.charCode;
    const previous: any = e.srcElement.previousSibling;
    if (key === 8) {
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

  constructor() {
    this.numbers = [0, 1, 2, 3, 4, 5, 6, 7];
  }

  ngOnInit() {}

  private addError() {
    const numberArray = Animations.queryAll(this.activationCode, '.');

    numberArray.forEach((element) => {
      Animations.addClass(element, this.Error);
    });
    setTimeout(() => {
      this.removeError(numberArray);
    }, 850);
    this.clearNumberField();
  }

  private removeError(numberArray: any) {
    numberArray.forEach((element) => {
      Animations.removeClass(element, this.Error);
    });
  }

  private clearNumberField() {
    const children = this.activationCode.nativeElement.children;
    for (const child of children) {
      child.value = '';
    }
    children[0].focus();
  }
}
