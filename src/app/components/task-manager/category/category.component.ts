import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';

// Models
import { Category } from '@components/task-manager/models/category.model';

// State
import * as TaskManagerState from '@components/task-manager/state/task-manager.state';

// Actions
import * as TaskManagerActions from '@components/task-manager/state/task-manager.action';

// Animations
import * as Animations from '@app/@shared/animations';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  private readonly ONE_CATEGORY: number = 1;
  private readonly DELIMITER: string = '-';

  @Input() category: Category[] = [];
  @ViewChild('categoryContainer') public categoryContainer;

  private moveLeftBgIconCount = 0;

  private bgiconEventListener: EventListener | undefined;
  private bgiconMoveLeftEventListener = new Map();

  private iconEventListener: EventListener | undefined;
  private iconMoveLeftEventListener = new Map();

  // UI Variables
  RocketIcon = '/assets/icons/Rocket.png';
  MessageIcon = '/assets/icons/Message.png';
  ContactIcon = '/assets/icons/Contact.png';
  BusinessAccountIcon = '/assets/icons/BussinessAcount.png';

  Paused = 'paused';
  IconMove = 'icon-move';
  DisplayNone = 'display-none';
  BgiconOpacity = 'bgicon-opacity';
  IconBgiconMoveLeft = 'icon-bgicon-move-left';

  constructor(private store: Store<TaskManagerState.State>) {}

  ngOnInit(): void {}

  getIcon(id: number) {
    switch (id) {
      case 1:
        return this.RocketIcon;
      case 2:
        return this.MessageIcon;
      case 3:
        return this.ContactIcon;
      case 4:
        return this.BusinessAccountIcon;
      default:
        return '';
    }
  }

  selectedItem(item: Category) {
    this.store.dispatch(
      TaskManagerActions.getCurrentCategoryData({ id: item.id })
    );
  }

  removeItem(item: Category) {
    const catElement = this.getCategoryElementById(item.id);
    if (!catElement) {
      return;
    }

    const icon: any = catElement.lastElementChild;
    Animations.addClass(icon.children[1], this.DisplayNone);

    Animations.removeClass(icon.children[0], this.Paused);

    this.iconEventListener = () => this.onIconAnimationEnd(item);

    icon.children[0].addEventListener('animationend', this.iconEventListener);

    Animations.addClass(icon.children[0], this.IconMove);

    const bgIcon: any = catElement.firstElementChild;
    Animations.removeClass(bgIcon, this.Paused);

    this.bgiconEventListener = () => this.onBgiconAnimationEnd(item);
    bgIcon.addEventListener('animationend', this.bgiconEventListener);

    Animations.addClass(bgIcon, this.BgiconOpacity);
  }

  private onIconAnimationEnd(item: Category) {
    const catElement: any = this.getCategoryElementById(item.id);
    if (!catElement) {
      return;
    }
    const icon: any = catElement.lastElementChild;
    icon.children[0].removeEventListener(
      'animationend',
      this.iconEventListener
    );

    Animations.removeClass(icon.children[0], this.IconMove);
    Animations.addClass(icon.children[0], this.DisplayNone);
  }

  private onBgiconAnimationEnd(item: Category) {
    const catElement: any = this.getCategoryElementById(item.id);
    if (!catElement) {
      return;
    }
    const bgIcon: any = catElement.firstElementChild;
    bgIcon.removeEventListener('animationend', this.bgiconEventListener);

    Animations.removeClass(bgIcon, this.BgiconOpacity);
    Animations.addClass(bgIcon, this.DisplayNone);

    //  If category item is not last category, move all right categories of that item
    if (
      this.category.length > this.ONE_CATEGORY &&
      !this.isLastCategory(item)
    ) {
      this.moveLeftAllCategories(item);
    } else {
      this.store.dispatch(
        TaskManagerActions.removeCategory({
          id: this.category[this.category.length - 1].id,
        })
      );
    }
  }

  private moveLeftAllCategories(item: Category) {
    const children = this.categoryContainer.nativeElement.children;
    const count: number = children.length;
    const rightCategories: Array<Category> = this.getRightCategoriesOfSelectedCategory(
      item
    );
    for (let i = 0; i < count; i++) {
      const element: any = children[i];

      const elementId: string = element.firstElementChild.id;
      const id: string[] = elementId.split(this.DELIMITER);
      if (
        Number(id[1]) !== item.id &&
        rightCategories.findIndex((cat) => cat.id === Number(id[1])) > -1
      ) {
        this.moveLeftBgIconCount++;

        //  icon
        Animations.removeClass(element.lastElementChild, this.Paused);

        this.iconMoveLeftEventListener.set(element.lastElementChild.id, () =>
          this.onIconMoveLeftAnimationEnd(element.lastElementChild)
        );

        element.lastElementChild.addEventListener(
          'animationend',
          this.iconMoveLeftEventListener.get(element.lastElementChild.id)
        );

        Animations.addClass(element.lastElementChild, this.IconBgiconMoveLeft);

        //  bgIcon
        Animations.removeClass(element.firstElementChild, this.Paused);

        this.bgiconMoveLeftEventListener.set(elementId, () =>
          this.onBgiconMoveLeftAnimationEnd(element.firstElementChild, item)
        );

        element.firstElementChild.addEventListener(
          'animationend',
          this.bgiconMoveLeftEventListener.get(elementId)
        );

        Animations.addClass(element.firstElementChild, this.IconBgiconMoveLeft);
      }
    }
  }

  private onIconMoveLeftAnimationEnd(eventTarget: any) {
    if (eventTarget) {
      eventTarget.removeEventListener(
        'animationend',
        this.iconMoveLeftEventListener.get(eventTarget.id)
      );

      Animations.removeClass(eventTarget, this.IconBgiconMoveLeft);
    }
  }

  private onBgiconMoveLeftAnimationEnd(
    eventTarget: any,
    removedItem: Category
  ) {
    if (eventTarget) {
      eventTarget.removeEventListener(
        'animationend',
        this.bgiconMoveLeftEventListener.get(eventTarget.id)
      );

      Animations.removeClass(eventTarget, this.IconBgiconMoveLeft);

      this.moveLeftBgIconCount--;
      if (this.moveLeftBgIconCount === 0) {
        const cat: any = this.getCategoryById(removedItem.id);
        if (cat) {
          this.store.dispatch(
            TaskManagerActions.removeCategory({ id: cat.id })
          );
        }
      }
    }
  }

  private getCategoryElementById(categoryId: number): any {
    const children = this.categoryContainer.nativeElement.children;
    const count: number = children.length;
    for (let i = 0; i < count; i++) {
      const element: any = children[i];

      const elementId: string = element.firstElementChild.id;
      const id: string[] = elementId.split(this.DELIMITER);
      if (Number(id[1]) === categoryId) {
        return element;
      }
    }
    return null;
  }

  private getCategoryById(categoryId: number): any {
    if (this.category.length === 0) {
      return null;
    }
    let result: any;
    this.category.forEach((cat) => {
      if (cat.id === categoryId) {
        result = cat;
      }
    });
    return result;
  }

  //  Get all right categories of selected category
  private getRightCategoriesOfSelectedCategory(
    item: Category
  ): Array<Category> {
    if (this.category.length === 0) {
      return new Array();
    }
    const itemIndex: number = this.category.findIndex(
      (cat) => cat.id === item.id
    );
    const result = new Array();
    for (let i = itemIndex + 1; i < this.category.length; i++) {
      result.push(this.category[i]);
    }
    return result;
  }

  private isLastCategory(item: Category): boolean {
    if (item) {
      const itemIndex = this.category.findIndex((cat) => cat.id === item.id);
      if (itemIndex > -1 && itemIndex === this.category.length - 1) {
        return true;
      }
    }
    return false;
  }
}
