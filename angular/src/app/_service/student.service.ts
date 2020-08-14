import { Injectable } from '@angular/core';
import {BaseService} from "../base/base-service";
import {Student} from "../_model/student";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Page} from "../_model/page";
import {PageParams} from "../_model/page-params";

@Injectable({
  providedIn: 'root'
})
export class StudentService implements BaseService<Student>{
  readonly  href = '/api/student';

  constructor(private _httpClient: HttpClient) {}

  create(data: Student): Observable<Object> {
    return this._httpClient.post(this.href, data);
  }

  delete(idd: number): Observable<Object> {
    return undefined;
  }

  getByIdd(idd: number): Observable<Student> {
    const url = this.href + '/' + idd;
    return this._httpClient.get<Student>(url);
  }

  getList(sort: string, order: string, page: number, pageSize: number): Observable<Page> {
    const url = this.href + '/list';
    return this._httpClient.post<Page>(url, new PageParams(page*pageSize, pageSize, {
      orderBy:sort,
      orderDir:order
    }));
  }

  update(idd: number, data: Student): Observable<Object> {
    const url = this.href + '/' + idd;
    return this._httpClient.patch(url, data);
  }
}
