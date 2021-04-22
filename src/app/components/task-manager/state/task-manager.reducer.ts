import { createReducer, on } from '@ngrx/store';
import { Category } from '@components/task-manager/models/category.model';
import * as TaskManagerActions from '@components/task-manager/state/task-manager.action';
import { CategoryState } from '@components/task-manager/state/task-manager.state';

export const initialState: CategoryState = {
  category: [],
  data: [],
  currentCategoryData: {
    id: 0,
    data: [],
  },
  currentTask: { id: '', content: '', img: '', title: '' },
  hasDone: false,
  error: ''
};

export const appReducer = createReducer(
  initialState,
  on(TaskManagerActions.getCurrentCategoryData, (state, action) => {
    return {
      ...state,
      currentCategoryData:
        state.data.filter((item) => item.id === action.id)[0] || {},
    };
  }),
  on(TaskManagerActions.removeCategory, (state, action) => {
    return {
      ...state,
      category: state.category.filter((item) => item.id !== action.id),
    };
  }),
  on(TaskManagerActions.getCurrentTaskById, (state, action) => {
    return {
      ...state,
      currentTask:
        state.currentCategoryData.data.filter(
          (item) => item.id === action.id
        )[0] || {},
    };
  }),
  on(TaskManagerActions.completeTask, (state) => {
    return {
      ...state,
      hasDone: true,
    };
  }),
  on(TaskManagerActions.setCurrentCategoryData, (state, action) => {
    return {
      ...state,
      currentCategoryData: action.data,
    };
  }),
  on(TaskManagerActions.setCurrentTask, (state, action) => {
    return {
      ...state,
      hasDone: false,
      currentTask: action.task,
    };
  }),
  on(TaskManagerActions.removeTask, (state, action) => {
    let categories: Category[] = [];
    let currentCate = state.category.filter(
      (item) => item.id === action.cateId
    )[0];
    if (currentCate.pendingTask > 1) {
      currentCate = {
        id: currentCate.id,
        name: currentCate.name,
        pendingTask: currentCate.pendingTask - 1,
      };
      categories = [
        ...state.category.filter((item) => item.id !== action.cateId),
        currentCate,
      ].sort((a, b) => a.id - b.id);
    } else {
      categories = [
        ...state.category.filter((item) => item.id !== action.cateId),
      ].sort((a, b) => a.id - b.id);
    }

    let apiData = state.data.filter((item) => item.id === action.cateId)[0];
    apiData = {
      id: apiData.id,
      data: apiData.data.filter((i) => i.id !== action.taskId),
    };

    return {
      ...state,
      category: [...categories],
      data: [
        ...state.data.filter((item) => item.id !== action.cateId),
        apiData,
      ].sort((a, b) => a.id - b.id),
      currentCategoryData: {
        id: state.currentCategoryData.id,
        data: state.currentCategoryData.data.filter(
          (item) => item.id !== action.taskId
        ),
      },
    };
  }),
  on(TaskManagerActions.getAllCategoriesSuccess, (state, action) => {
    return {
      ...state,
      hasDone: false,
      category: action.category,
      data: action.data,
      currentCategoryData: action.data[0]
    };
  }),
  on(TaskManagerActions.getAllCategoriesFailure, (state, action) => {
    return {
      ...state,
      error: action.error
    };
  })
);
