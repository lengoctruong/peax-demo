import { Component, OnInit } from '@angular/core';
import { Category, CategoryData } from './model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'my-app';
  categories: Category[] = [];
  categoryData: CategoryData[] = [
    {
      id: 1,
      data: [
        {
          id: '101',
          title: 'Order confirmation',
          content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries`,
        },
        {
          id: '102',
          title: 'Credit card from Swiss Bank',
          content: `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.`,
        },
        {
          id: '103',
          title: 'Electricity bill',
          content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation`,
        },
        {
          id: '104',
          title: 'Gas bill',
          content: `Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit`,
        },
        {
          id: '105',
          title: 'Internet bill',
          content: `But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system`,
        },
      ],
    },
    {
      id: 2,
      data: [
        {
          id: '201',
          title: 'Verify Email Address',
          content: `At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium`,
        },
        {
          id: '202',
          title: 'Upgrade ID level 2',
          content: `voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa`,
        },
        {
          id: '303',
          title: 'Turn on notification',
          content: `qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore`,
        },
        {
          id: '404',
          title: 'Subscription detail',
          content: `cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis`,
        },
        {
          id: '505',
          title: 'New mail from PEAX',
          content: `dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus`,
        },
      ],
    },
    {
      id: 3,
      data: [
        {
          id: '301',
          title: 'Add payment',
          content:
            'The Task Manager helps the user to complete pending tasks easily and clearly. Tasks that have been completed disappear from the Task Manager.',
        },
        {
          id: '302',
          title: 'News',
          content:
            'The Task Manager helps the user to complete pending tasks easily and clearly. Tasks that have been completed disappear from the Task Manager.',
        },
        {
          id: '303',
          title: 'Confirm change address',
          content:
            'The Task Manager helps the user to complete pending tasks easily and clearly. Tasks that have been completed disappear from the Task Manager.',
        },
      ],
    },
    {
      id: 4,
      data: [
        {
          id: '401',
          title: 'Order confirmation',
          content: `saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut`,
        },
        {
          id: '402',
          title: 'Credit card from Swiss Bank',
          content: `reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.`,
        },
        {
          id: '403',
          title: 'Electricity bill',
          content: `On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire`,
        },
        {
          id: '404',
          title: 'Gas bill',
          content: `that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness`,
        },
        {
          id: '405',
          title: 'Internet bill',
          content: `of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish`,
        },
        {
          id: '406',
          title: 'Money transfer detail',
          content: `In a free hour, when our power of choice is untrammelled and when`,
        },
        {
          id: '407',
          title: 'ABC Service',
          content: `nothing prevents our being able to do what we like best`,
        },
        {
          id: '408',
          title: 'Spa bill',
          content: `every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business`,
        },
        {
          id: '409',
          title: 'Promotion from PEAX',
          content: `it will frequently occur that pleasures have to be repudiated and annoyances accepted.`,
        },
        {
          id: '410',
          title: 'New friend on PEAX',
          content: `The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.`,
        },
      ],
    },
  ];
  currentTasks: any = [];
  constructor() {}

  ngOnInit() {
    this.getCategory();
    if (this.categories.length > 0) {
      this.getCurrentTaskById(this.categories[0].id);
    }
  }

  getSelectedCategory(event: Category) {
    this.getCurrentTaskById(event.id);
  }

  private getCurrentTaskById(id: number) {
    this.currentTasks = this.categoryData.filter((item) => item.id === id);
  }

  private getCategory() {
    this.categories = [
      { id: 1, name: 'Rocket', pendingTask: 5 },
      { id: 2, name: 'Onboarding', pendingTask: 5 },
      { id: 3, name: 'Mailbox', pendingTask: 3 },
      { id: 4, name: 'Office', pendingTask: 10 },
    ];
  }

  removeCategory(event: Category) {
    // let index = this.categories.findIndex(item => item.id === event.id);
    this.categories.shift();
  }
}
