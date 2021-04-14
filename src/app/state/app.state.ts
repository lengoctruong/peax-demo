import { Category, CategoryData } from '../model';

export interface AppState {
  category: Category[];
  data: CategoryData[];
  currentCategoryData: CategoryData;
}
