import { Category, CategoryData, Task } from '../_model';

export interface State {
  categoryState: CategoryState;
}

export interface CategoryState {
  category: Category[];
  data: CategoryData[];
  currentCategoryData: CategoryData;
  currentTask: Task;
  hasDone: boolean;
}
