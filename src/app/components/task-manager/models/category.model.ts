import { CategoryModel, TaskModel } from './task-manager.model';

export interface Category {
  id: number;
  name: string;
  pendingTask: number;
}

export interface Task {
  id: string;
  title: string;
  content: string;
  img: string;
}

export interface CategoryData {
  id: number;
  data: Task[];
}

export function createTaskFromTaskModel(taskModel: TaskModel): Task {
  const task: Task = { id: taskModel.taskId, title: taskModel.title, content: taskModel.content, img: taskModel.content };
  return task;
}

export function createCategoryDataFromCategoryModel(categoryModels: CategoryModel[]): CategoryData[] {
  const categoryDatas: CategoryData[] = [];

  categoryModels.forEach (model => {
    const tasks: Task[] = [];
    model.tasks.forEach(taskModel => {
      tasks.push(createTaskFromTaskModel(taskModel));
    });
    const data: CategoryData = { id: model.categoryId, data: tasks };
    categoryDatas.push(data);
  });
  return categoryDatas;
}

export function createCategoryFromCategoryModel(categoryModels: CategoryModel[]): Category[] {
  const categories: Category[] = [];

  categoryModels.forEach (model => {
    const category: Category = { id: model.categoryId, name: model.name, pendingTask: model.tasks.length };
    categories.push(category);
  });

  return categories;
}
