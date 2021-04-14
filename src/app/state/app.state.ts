import { Category, CategoryData } from '../model';

export interface AppState {
  category: Category[];
  data: CategoryData[];
  currentTask: CategoryData;
}
