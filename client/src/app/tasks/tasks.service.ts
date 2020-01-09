import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {HttpHeaders} from "@angular/common/http";

import {Observable} from "rxjs";
import {catchError} from "rxjs/operators";

import {Task} from "./task";
import {HttpErrorHandler, HandleError} from "../http-error-handler.service";

@Injectable()
export class TaskService{
  private handleError: HandleError;

  constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler){
    this.handleError = httpErrorHandler.createHandleError("TaskService");
  }

  getTasks(): Observable<Task[]> {
    return this.http
      .get<Task[]>("api/todos")
      .pipe(catchError(this.handleError("getTasks", [])));
  }

  addTask(task: Task): Observable<Task> {
    return this.http
      .post<Task>("api/todo", task)
      .pipe(catchError(this.handleError("addTask", task)));
  }

  deleteTask(id: number): Observable<{}> {
    const url = `api/todo/${id}`;
    return this.http
      .delete(url)
      .pipe(catchError(this.handleError("deleteTask")));
  }

  updateTask(task: Task): Observable<Task> {
    return this.http
      .put<Task>(`api/todo/${task._id}`, task)
      .pipe(catchError(this.handleError("updateTask", task)));
  }
}

