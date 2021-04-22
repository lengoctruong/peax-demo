import { Category, CategoryData, Task } from '@components/task-manager/models/category.model';

export interface State {
  categoryState: CategoryState;
}

export interface CategoryState {
  category: Category[];
  data: CategoryData[];
  currentCategoryData: CategoryData;
  currentTask: Task;
  hasDone: boolean;
  error: string;
}
