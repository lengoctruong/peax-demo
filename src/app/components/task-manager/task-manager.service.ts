import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import * as TaskManagerModel from '@components/task-manager/models/task-manager.model';

@Injectable({
  providedIn: 'root',
})
export class TaskManagerService {
  private categoriesUrl = 'http://192.168.2.120:8080/api/category';

  constructor(private http: HttpClient) {}

  getAllCategories(): Observable<TaskManagerModel.CategoryModel[]> {
    return this.http
      .get<TaskManagerModel.CategoryModel[]>(this.categoriesUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(err: any) {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}
