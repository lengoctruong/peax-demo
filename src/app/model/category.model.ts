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
