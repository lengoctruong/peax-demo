import { Component, EventEmitter, Input, OnInit, Output, ViewChild, AfterViewInit,} from '@angular/core';
import { Category, CategoryData } from '../model';

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

  moveLeftBgIconCount = 0;

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
    console.log("removeItem item.id=" + item.id + "--" + event.target);

    let catElement: any = this.getCategoryElementById(item.id);
    if (catElement == null || catElement == undefined) {
      return;
    }

    let icon:any = catElement.lastElementChild;
    icon.children[1].classList.add('display-none');

    icon.children[0].classList.remove('paused');
    icon.children[0].classList.add('icon-move');
    icon.children[0].addEventListener('animationend', () => this.onIconAnimationEnd(item));

    let bgIcon:any = catElement.firstElementChild;
    bgIcon.classList.remove('paused');
    bgIcon.classList.add('bgicon-opacity');
    bgIcon.addEventListener('animationend', () => this.onBgiconAnimationEnd(item));    
  }

  private onIconAnimationEnd(item: Category) {
    let catElement: any = this.getCategoryElementById(item.id);
    if (catElement == null || catElement == undefined) {
      return;
    }
    let icon: any = catElement.lastElementChild;
    icon.children[0].removeEventListener('animationend', () => this.onIconAnimationEnd(item));
    icon.children[0].classList.remove('icon-move')
    icon.children[0].classList.add('display-none');
  }

  private onBgiconAnimationEnd(item: Category) {
    let catElement: any = this.getCategoryElementById(item.id);
    if (catElement == null || catElement == undefined) {
      return;
    }
    var bgIcon: any = catElement.firstElementChild;
    bgIcon.removeEventListener('animationend', () => this.onBgiconAnimationEnd(item));
    bgIcon.classList.remove('bgicon-opacity');
    bgIcon.classList.add('display-none');
    
    this.moveLeftAllCategories(item);
  }

  private moveLeftAllCategories(item: Category) {
    let children = this.categoryContainer.nativeElement.children;
    let count:Number = children.length;
    for(let i = 0; i < count; i++) {
      let element:any = children[i];
    
      let elementId:string = element.firstElementChild.id;
      let id:string[] = elementId.split("-");
      if (Number(id[1]) != item.id) {
        this.moveLeftBgIconCount++;
        //  icon
        element.lastElementChild.classList.remove('paused');
        element.lastElementChild.classList.add('icon-bgicon-move-left');
        element.lastElementChild.addEventListener('animationend', () => this.onIconMoveLeftAnimationEnd(element.lastElementChild));

        //  bgIcon
        element.firstElementChild.classList.remove('paused');
        element.firstElementChild.classList.add('icon-bgicon-move-left');
        element.firstElementChild.addEventListener('animationend', () => this.onBgiconMoveLeftAnimationEnd(element.firstElementChild));
      }
    }
  }
  
  private onIconMoveLeftAnimationEnd(eventTarget?: any) {
    if (eventTarget) {
      console.log("Icon move to left end - id: " + eventTarget.id)
      eventTarget.removeEventListener('animationend', () => this.onIconMoveLeftAnimationEnd(eventTarget));
      eventTarget.classList.remove('icon-bgicon-move-left');
    }
  }

  private onBgiconMoveLeftAnimationEnd(eventTarget?: any) {
    if (eventTarget) {
      console.log("Bgicon move to left end - id: " + eventTarget.id)
      eventTarget.removeEventListener('animationend', () => this.onBgiconMoveLeftAnimationEnd(eventTarget));
      eventTarget.classList.remove('icon-bgicon-move-left');

      // eventTarget.classList.add('paused');
      this.moveLeftBgIconCount--;
      if (this.moveLeftBgIconCount == 0) {
        //  TODO: Temprarily remove first category
        let id: string[] = eventTarget.id.split("-");
        let cat: any = this.getCategoryById(Number(id[1]));
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
}
