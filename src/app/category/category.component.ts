import { Component, EventEmitter, Input, OnInit, Output, ViewChild, AfterViewInit,} from '@angular/core';
import { Category, CategoryData } from '../model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit, AfterViewInit {

  private readonly ONE_CATEGORY: number = 1;

  @Input() category: Category[] = [];
  @Output() selectedCate = new EventEmitter<Category>();
  @Output() removeCate = new EventEmitter<Category>();

  @ViewChild('categoryContainer') public categoryContainer;

  private moveLeftBgIconCount = 0;

  private bgiconEventListener: EventListener | undefined;
  private bgiconMoveLeftEventListener = new Map();

  private iconEventListener: EventListener | undefined;
  private iconMoveLeftEventListener = new Map();

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
    //console.log("\n\n 1-- removeItem item.id=" + item.id + "--" + event.target + " -- this.category.length:" + this.category.length);

    let catElement: any = this.getCategoryElementById(item.id);
    if (catElement == null || catElement == undefined) {
      return;
    }

    let icon:any = catElement.lastElementChild;
    icon.children[1].classList.add('display-none');

    icon.children[0].classList.remove('paused');
    this.iconEventListener = () => this.onIconAnimationEnd(item);
    icon.children[0].addEventListener('animationend', this.iconEventListener);
    icon.children[0].classList.add('icon-move');    

    let bgIcon:any = catElement.firstElementChild;
    bgIcon.classList.remove('paused');
    this.bgiconEventListener = () => this.onBgiconAnimationEnd(item);
    bgIcon.addEventListener('animationend', this.bgiconEventListener);    
    bgIcon.classList.add('bgicon-opacity');    
  }

  private onIconAnimationEnd(item: Category) {
    let catElement: any = this.getCategoryElementById(item.id);
    if (catElement == null || catElement == undefined) {
      return;
    }
    let icon: any = catElement.lastElementChild;    
    icon.children[0].removeEventListener('animationend', this.iconEventListener);
    icon.children[0].classList.remove('icon-move')
    icon.children[0].classList.add('display-none');
  }

  private onBgiconAnimationEnd(item: Category) {
    let catElement: any = this.getCategoryElementById(item.id);
    if (catElement == null || catElement == undefined) {
      return;
    }
    var bgIcon: any = catElement.firstElementChild;
    //console.log("2 -- onBgiconAnimationEnd item.id:", item.id);
    bgIcon.removeEventListener('animationend', this.bgiconEventListener);
    bgIcon.classList.remove('bgicon-opacity');
    bgIcon.classList.add('display-none');

    if (this.category.length > this.ONE_CATEGORY) {
      this.moveLeftAllCategories(item);
    } else {
      this.removeCate.emit(this.category.pop());
    }    
  }

  private moveLeftAllCategories(item: Category) {
    const children = this.categoryContainer.nativeElement.children;
    const count: Number = children.length;
    const rightCategories: Array<Category> = this.getRightCategoriesOfSelectedCategory(item);
    for (let i = 0; i < count; i++) {
      let element:any = children[i];
    
      let elementId:string = element.firstElementChild.id;
      const id: string[] = elementId.split("-");
      if (Number(id[1]) != item.id && rightCategories.findIndex(cat => cat.id == Number(id[1])) > -1) {
        this.moveLeftBgIconCount++;
        //  icon
        element.lastElementChild.classList.remove('paused');        
        this.iconMoveLeftEventListener.set(element.lastElementChild.id, () => this.onIconMoveLeftAnimationEnd(element.lastElementChild));
        element.lastElementChild.addEventListener('animationend', this.iconMoveLeftEventListener.get(element.lastElementChild.id));
        element.lastElementChild.classList.add('icon-bgicon-move-left');        

        //  bgIcon
        //console.log("3 -- moveLeftAllCategories elementId:", elementId);
        element.firstElementChild.classList.remove('paused');
        this.bgiconMoveLeftEventListener.set(elementId, () => this.onBgiconMoveLeftAnimationEnd(element.firstElementChild, item));
        element.firstElementChild.addEventListener('animationend', this.bgiconMoveLeftEventListener.get(elementId));
        element.firstElementChild.classList.add('icon-bgicon-move-left');        
      }
    }
  }
  
  private onIconMoveLeftAnimationEnd(eventTarget: any) {
    if (eventTarget) {
      //console.log("Icon move to left end - id: " + eventTarget.id)
      eventTarget.removeEventListener('animationend', this.iconMoveLeftEventListener.get(eventTarget.id));
      eventTarget.classList.remove('icon-bgicon-move-left');
    }
  }

  private onBgiconMoveLeftAnimationEnd(eventTarget: any, removedItem: Category) {
    if (eventTarget) {
      //console.log("Bgicon move to left end - id: " + eventTarget.id + " -- this.moveLeftBgIconCount:" + this.moveLeftBgIconCount);
      eventTarget.removeEventListener('animationend', this.bgiconMoveLeftEventListener.get(eventTarget.id));
      eventTarget.classList.remove('icon-bgicon-move-left');

      this.moveLeftBgIconCount--;
      if (this.moveLeftBgIconCount == 0) {
        let cat: any = this.getCategoryById(removedItem.id);
        if (cat) {
          this.removeCate.emit(cat);
        }
      }
    }
  }

  private getCategoryElementById(categoryId: Number) {
    let children = this.categoryContainer.nativeElement.children;
    let count: Number = children.length;
    for (let i = 0; i < count; i++) {
      let element: any = children[i];

      let elementId: string = element.firstElementChild.id;
      let id: string[] = elementId.split("-");
      if (Number(id[1]) == categoryId) {
        return element;
      }
    }
    return null;
  }

  private getCategoryById(categoryId: Number) {
    if (this.category.length == 0) {
      return null;
    }
    let result: any;
    this.category.forEach(cat => {
      if (cat.id == categoryId) {
        result = cat;
      }
    })
    return result;
  }

  //  Get all right categories of selected category
  private getRightCategoriesOfSelectedCategory(item: Category) {
    if (this.category.length == 0) {
      return new Array();
    }
    const itemIndex: number = this.category.findIndex(cat => cat.id == item.id);
    let result = new Array();
    for (let i = itemIndex + 1; i < this.category.length; i++) {
      result.push(this.category[i]);
    }
    return result;
  }
}
