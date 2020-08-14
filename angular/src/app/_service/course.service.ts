import { Injectable } from '@angular/core';
import {BaseService} from "../base/base-service";
import {Instrument} from "../_model/instrument";
import {Course} from "../_model/course";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Room} from "../_model/room";
import {Page} from "../_model/page";
import {PageParams} from "../_model/page-params";

@Injectable({
  providedIn: 'root'
})
export class CourseService implements BaseService<Course>{

  constructor(private _httpClient: HttpClient) {}

  create(data: Course): Observable<Object> {
    const href = '/api/course';
    return this._httpClient.post(href, data);
  }

  getByIdd(idd: number): Observable<Course> {
    const href = '/api/course/' + idd;
    return this._httpClient.get<Course>(href);
  }

  getList(sort: string, order: string, page: number, pageSize: number): Observable<Page> {
    const href = '/api/course/list';

    return this._httpClient.post<Page>(href, new PageParams(page*pageSize, pageSize, {
      orderBy:sort,
      orderDir:order
    }));
  }

  update(idd: number, data: Course): Observable<Object> {
    const href = '/api/course/' + idd;
    return this._httpClient.patch(href, data);
  }

  delete(idd: number):Observable<Object> {
    return null;
  }


}
