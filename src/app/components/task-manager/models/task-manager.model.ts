export interface CategoryModel {
    categoryId: string;
    name: string;
    tasks: TaskModel[];
}

export interface TaskModel {
    taskId: string;
    title: string;
    content: string;
    img: string;
}
