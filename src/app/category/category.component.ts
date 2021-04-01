import { Component, EventEmitter, Input, OnInit, Output, ViewChild, AfterViewInit,} from '@angular/core';
import { Category } from '../model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']  
})
export class CategoryComponent implements OnInit, AfterViewInit {
  @Input() category: Category[] = [];
  @Output() selectedCate = new EventEmitter<Category>();
  @Output() removeCate = new EventEmitter<Category>();

  @ViewChild('categoryContainer') public categoryContainer;

  moveLeftIconCount = 0;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    console.log("Children number of category container:" + this.categoryContainer.nativeElement.children.length);
  }

  getIcon(id: number) {
    switch (id) {
      case 1:
        return '/assets/icons/Rocket.png';
      case 2:
        return '/assets/icons/Message.png';
      case 3:
        return '/assets/icons/Contact.png';
      case 4:
        return '/assets/icons/BussinessAcount.png';
      default:
        return '';
    }
  }

  selectedItem(item: Category) {
    this.selectedCate.emit(item);
  }

  removeItem(item: Category, event: any) {
    console.log("item.id=" + item.id + "--" + event.target);

    let catElement:any = this.getCategoryElementById(item.id);
    let icon:any = catElement.lastElementChild;
    icon.children[1].classList.add('display-none');

    icon.children[0].classList.remove('paused');
    icon.children[0].classList.add('icon-move');
    icon.children[0].addEventListener('animationend', () => this.onIconAnimationEnd(item));

    let bgIcon:any = catElement.firstElementChild;
    bgIcon.classList.remove('paused');
    bgIcon.classList.add('bgicon-opacity');
    bgIcon.addEventListener('animationend', () => this.onBgiconAnimationEnd(item));

    // this.removeCate.emit(item);
  }

  private onIconAnimationEnd(item: Category) {    
    let icon:any = this.getCategoryElementById(item.id).lastElementChild;
    icon.removeEventListener('animationend', () => this.onIconAnimationEnd(item));
    icon.children[0].classList.remove('icon-move')
    icon.children[0].classList.add('display-none');
  }

  private onBgiconAnimationEnd(item: Category) {
    var bgIcon:any = this.getCategoryElementById(item.id).firstElementChild;
    bgIcon.removeEventListener('animationend', () => this.onBgiconAnimationEnd(item));
    bgIcon.classList.remove('bgicon-opacity');
    bgIcon.classList.add('display-none');

    // this.removeCate.emit(this.category[0]);
    this.moveLeftAllCategories(item);
  }

  private moveLeftAllCategories(item: Category) {
    let children = this.categoryContainer.nativeElement.children;
    let count:Number = children.length;
    for(let i = 0; i < count; i++) {
      let element:any = children[i];
    
      let elementId:string = element.firstElementChild.id;
      let id:string[] = elementId.split("_");
      if (Number(id[1]) != item.id) {
        this.moveLeftIconCount++;
        //  icon
        element.lastElementChild.classList.remove('paused');
        element.lastElementChild.classList.add('icon-move-left');
        element.lastElementChild.addEventListener('animationend', () => this.onCategoryMoveLeftAnimationEnd(element.lastElementChild));

        //  bgIcon
        element.firstElementChild.classList.remove('paused');
        element.firstElementChild.classList.add('icon-move-left');
        element.firstElementChild.addEventListener('animationend', () => this.onCategoryMoveLeftAnimationEnd(element.firstElementChild));
      }
    }
  }
  
  private onCategoryMoveLeftAnimationEnd(eventTarget?:any) {    
    if (eventTarget) {
      console.log(eventTarget)
      eventTarget.removeEventListener('animationend', () => this.onCategoryMoveLeftAnimationEnd());
      eventTarget.classList.remove('icon-move-left');
      
      // eventTarget.classList.add('paused');
      this.moveLeftIconCount--;
      if (this.moveLeftIconCount == 0) {
        this.removeCate.emit(this.category[0]);
      }
    }
  }

  private getCategoryElementById(categoryId:Number) {
    let children = this.categoryContainer.nativeElement.children;
    let count:Number = children.length;
    for(let i = 0; i < count; i++) {
      let element:any = children[i];
    
      let elementId:string = element.firstElementChild.id;
      let id:string[] = elementId.split("_");
      if (Number(id[1]) == categoryId) {
        return element;
      }
    }
    return null;
  }
}
