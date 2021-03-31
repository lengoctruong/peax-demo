import { Component, OnInit , ViewChild} from '@angular/core';
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
          title: 'Order confirmation',
          content: 'The Task Manager helps the user to complete pending tasks easily and clearly. Tasks that have been completed disappear from the Task Manager.'
        },
        {
          id: '102',
          title: 'Credit card from Swiss Bank',
          content: 'The Task Manager helps the user to complete pending tasks easily and clearly. Tasks that have been completed disappear from the Task Manager.'
        },
        {
          id: '103',
          title: 'Electricity bill',
          content: 'The Task Manager helps the user to complete pending tasks easily and clearly. Tasks that have been completed disappear from the Task Manager.'
        },
        {
          id: '104',
          title: 'Gas bill',
          content: 'The Task Manager helps the user to complete pending tasks easily and clearly. Tasks that have been completed disappear from the Task Manager.'
        },
        {
          id: '105',
          title: 'Internet bill',
          content: 'The Task Manager helps the user to complete pending tasks easily and clearly. Tasks that have been completed disappear from the Task Manager.'
        }
      ]
    },
    {
      id: 2,
      data: [
        {
          id: '201',
          title: 'Verify Email Address',
          content: 'The Task Manager helps the user to complete pending tasks easily and clearly. Tasks that have been completed disappear from the Task Manager.'
        },
        {
          id: '202',
          title: 'Upgrade ID level 2',
          content: 'The Task Manager helps the user to complete pending tasks easily and clearly. Tasks that have been completed disappear from the Task Manager.'
        },
        {
          id: '303',
          title: 'Turn on notification',
          content: 'The Task Manager helps the user to complete pending tasks easily and clearly. Tasks that have been completed disappear from the Task Manager.'
        },
        {
          id: '404',
          title: 'Subscription detail',
          content: 'The Task Manager helps the user to complete pending tasks easily and clearly. Tasks that have been completed disappear from the Task Manager.'
        },
        {
          id: '505',
          title: 'New mail from PEAX',
          content: 'The Task Manager helps the user to complete pending tasks easily and clearly. Tasks that have been completed disappear from the Task Manager.'
        }
      ]
    },
    {
      id: 3,
      data: [
        {
          id: '301',
          title: 'Add payment',
          content: 'The Task Manager helps the user to complete pending tasks easily and clearly. Tasks that have been completed disappear from the Task Manager.'
        },
        {
          id: '302',
          title: 'News',
          content: 'The Task Manager helps the user to complete pending tasks easily and clearly. Tasks that have been completed disappear from the Task Manager.'
        },
        {
          id: '303',
          title: 'Confirm change address',
          content: 'The Task Manager helps the user to complete pending tasks easily and clearly. Tasks that have been completed disappear from the Task Manager.'
        }
      ]
    },
    {
      id: 4,
      data: [
        {
          id: '401',
          title: 'Order confirmation',
          content: 'The Task Manager helps the user to complete pending tasks easily and clearly. Tasks that have been completed disappear from the Task Manager.'
        },
        {
          id: '402',
          title: 'Credit card from Swiss Bank',
          content: 'The Task Manager helps the user to complete pending tasks easily and clearly. Tasks that have been completed disappear from the Task Manager.'
        },
        {
          id: '403',
          title: 'Electricity bill',
          content: 'The Task Manager helps the user to complete pending tasks easily and clearly. Tasks that have been completed disappear from the Task Manager.'
        },
        {
          id: '404',
          title: 'Gas bill',
          content: 'The Task Manager helps the user to complete pending tasks easily and clearly. Tasks that have been completed disappear from the Task Manager.'
        },
        {
          id: '405',
          title: 'Internet bill',
          content: 'The Task Manager helps the user to complete pending tasks easily and clearly. Tasks that have been completed disappear from the Task Manager.'
        },
        {
          id: '406',
          title: 'Money transfer detail',
          content: 'The Task Manager helps the user to complete pending tasks easily and clearly. Tasks that have been completed disappear from the Task Manager.'
        },
        {
          id: '407',
          title: 'ABC Service',
          content: 'The Task Manager helps the user to complete pending tasks easily and clearly. Tasks that have been completed disappear from the Task Manager.'
        },
        {
          id: '408',
          title: 'Spa bill',
          content: 'The Task Manager helps the user to complete pending tasks easily and clearly. Tasks that have been completed disappear from the Task Manager.'
        },
        {
          id: '409',
          title: 'Promotion from PEAX',
          content: 'The Task Manager helps the user to complete pending tasks easily and clearly. Tasks that have been completed disappear from the Task Manager.'
        },
        {
          id: '410',
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
      { id: 1, name: 'Rocket', pendingTask: 0 },
      { id: 2, name: 'Onboarding', pendingTask: 5 },
      { id: 3, name: 'Mailbox', pendingTask: 3},
      { id: 4, name: 'Office', pendingTask: 10 }
    ];
  }

  removeCategory(event: Category) {
    // let index = this.categories.findIndex(item => item.id === event.id);
    this.categories.shift();
  }
}
