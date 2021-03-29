import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Category } from '../model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  @Input() category: Category[] = [];
  @Output() selectedCate = new EventEmitter<Category>();

  constructor() { }

  ngOnInit(): void {
  }

  getIcon(id: number) {
    switch(id) {
      case 1: return '/assets/icons/Message.png';
      case 2: return '/assets/icons/Contact.png';
      case 3: return '/assets/icons/BussinessAcount.png';
      default: return '';
    }
  }

  selectedItem(item: Category) {
    this.selectedCate.emit(item);
  }

}
