import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Category } from '../model';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  animations: [
    trigger('flyInOut', [
      state('in', style({  })),
      transition('void => *', [
        style({ transform: 'translateX(-100%)' })
        // animate(1000)
      ]),
      transition('* => void', [
        animate(2000, style({ transform: 'translate(-20px, -40px)', opacity: 0 }))
      ])
    ])
  ]
})
export class CategoryComponent implements OnInit {
  @Input() category: Category[] = [];
  @Output() selectedCate = new EventEmitter<Category>();
  @Output() removeCate = new EventEmitter<Category>();

  constructor() { }

  ngOnInit(): void {
  }

  getIcon(id: number) {
    switch (id) {
      case 1: return '/assets/icons/Rocket.png';
      case 2: return '/assets/icons/Message.png';
      case 3: return '/assets/icons/Contact.png';
      case 4: return '/assets/icons/BussinessAcount.png';
      default: return '';
    }
  }

  selectedItem(item: Category) {
    this.selectedCate.emit(item);
  }

  removeItem(item: Category) {
    this.removeCate.emit(item);
  }
}
