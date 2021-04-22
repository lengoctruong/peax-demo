export interface CategoryModel {
    categoryId: number;
    name: string;
    tasks: TaskModel[];
}

export interface TaskModel {
    taskId: string;
    title: string;
    content: string;
    img: string;
}
