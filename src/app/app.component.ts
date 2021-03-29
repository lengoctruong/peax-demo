import { Component, OnInit } from '@angular/core';
import { Category } from './model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'my-app';
  categories: any[] = [];
  tasks: any[] = [
    {
      id: 1,
      data: [
        {
          id: '101',
          title: 'Verify Email Address',
          content: 'The Task Manager helps the user to complete pending tasks easily and clearly. Tasks that have been completed disappear from the Task Manager.'
        },
        {
          id: '102',
          title: 'Upgrade ID level 2',
          content: 'The Task Manager helps the user to complete pending tasks easily and clearly. Tasks that have been completed disappear from the Task Manager.'
        },
        {
          id: '103',
          title: 'Turn on notification',
          content: 'The Task Manager helps the user to complete pending tasks easily and clearly. Tasks that have been completed disappear from the Task Manager.'
        },
        {
          id: '104',
          title: 'Subscription detail',
          content: 'The Task Manager helps the user to complete pending tasks easily and clearly. Tasks that have been completed disappear from the Task Manager.'
        },
        {
          id: '105',
          title: 'New mail from PEAX',
          content: 'The Task Manager helps the user to complete pending tasks easily and clearly. Tasks that have been completed disappear from the Task Manager.'
        }
      ]
    },
    {
      id: 2,
      data: [
        {
          id: '201',
          title: 'Add payment',
          content: 'The Task Manager helps the user to complete pending tasks easily and clearly. Tasks that have been completed disappear from the Task Manager.'
        },
        {
          id: '202',
          title: 'News',
          content: 'The Task Manager helps the user to complete pending tasks easily and clearly. Tasks that have been completed disappear from the Task Manager.'
        },
        {
          id: '203',
          title: 'Confirm change address',
          content: 'The Task Manager helps the user to complete pending tasks easily and clearly. Tasks that have been completed disappear from the Task Manager.'
        }
      ]
    },
    {
      id: 3,
      data: [
        {
          id: '301',
          title: 'Order confirmation',
          content: 'The Task Manager helps the user to complete pending tasks easily and clearly. Tasks that have been completed disappear from the Task Manager.'
        },
        {
          id: '302',
          title: 'Credit card from Swiss Bank',
          content: 'The Task Manager helps the user to complete pending tasks easily and clearly. Tasks that have been completed disappear from the Task Manager.'
        },
        {
          id: '303',
          title: 'Electricity bill',
          content: 'The Task Manager helps the user to complete pending tasks easily and clearly. Tasks that have been completed disappear from the Task Manager.'
        },
        {
          id: '304',
          title: 'Gas bill',
          content: 'The Task Manager helps the user to complete pending tasks easily and clearly. Tasks that have been completed disappear from the Task Manager.'
        },
        {
          id: '305',
          title: 'Internet bill',
          content: 'The Task Manager helps the user to complete pending tasks easily and clearly. Tasks that have been completed disappear from the Task Manager.'
        },
        {
          id: '306',
          title: 'Money transfer detail',
          content: 'The Task Manager helps the user to complete pending tasks easily and clearly. Tasks that have been completed disappear from the Task Manager.'
        },
        {
          id: '307',
          title: 'ABC Service',
          content: 'The Task Manager helps the user to complete pending tasks easily and clearly. Tasks that have been completed disappear from the Task Manager.'
        },
        {
          id: '308',
          title: 'Spa bill',
          content: 'The Task Manager helps the user to complete pending tasks easily and clearly. Tasks that have been completed disappear from the Task Manager.'
        },
        {
          id: '309',
          title: 'Promotion from PEAX',
          content: 'The Task Manager helps the user to complete pending tasks easily and clearly. Tasks that have been completed disappear from the Task Manager.'
        },
        {
          id: '310',
          title: 'New friend on PEAX',
          content: 'The Task Manager helps the user to complete pending tasks easily and clearly. Tasks that have been completed disappear from the Task Manager.'
        }
      ]
    }
  ];
  currentTasks: any = [];
  initId = 1
  constructor() {}

  ngOnInit() {
    this.getCategory();
    if (this.categories.length > 0) {
      this.getCurrentTaskById(this.categories[0].id);
    }
  }

  getSelectedCategory(event: Category) {
    this.getCurrentTaskById(event.id)
  }

  private getCurrentTaskById(id: number) {
    this.currentTasks = this.tasks.filter(item => item.id === id).map(value => value.data)
  }

  private getCategory() {
    this.categories = [
      { id: 1, name: 'onboarding', pendingTask: 5 },
      { id: 2, name: 'mailbox', pendingTask: 3},
      { id: 3, name: 'office', pendingTask: 10 }
    ];
  }
}
