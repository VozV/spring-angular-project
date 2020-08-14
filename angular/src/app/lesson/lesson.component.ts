import {Component} from '@angular/core';
import {BaseList} from "../base/base-list";
import {LessonList} from "../_model/lesson-list";
import {LessonService} from "../_service/lesson.service";
import {MatDialog} from "@angular/material/dialog";
import {merge, Observable, of as observableOf} from "rxjs";
import {Page} from "../_model/page";
import {LessonEditDialogComponent} from "./lesson-edit-dialog/lesson-edit-dialog.component";
import {CourseService} from "../_service/course.service";
import {catchError, map, startWith, switchMap} from "rxjs/operators";

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['../base/style/base-component-style.scss']
})
export class LessonComponent extends BaseList<LessonList>{

  displayedColumns = ['idd', 'name', 'description', 'lessonDateStart', 'lessonDateEnd', 'createDate', 'edit'];

  constructor(
    private _lessonService: LessonService,
    private _courseService: CourseService,
    public dialog: MatDialog) {
    super();
  }

  refresh() {
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.getListPage(
            this.sort.active, this.sort.direction, this.paginator.pageIndex, this.paginator.pageSize);
        }),
        map(data => {
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data.totalCount;

          return data.list;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe(data => this.data = data);


  }

  getListPage(sort: string, order: string, page: number, pageSize: number): Observable<Page> {
    return this._lessonService.getList(
      this.sort.active, this.sort.direction, this.paginator.pageIndex, this.paginator.pageSize);
  }

  openEditDialog(id?:number) {
    const dialogRef = this.dialog.open(LessonEditDialogComponent, {
      width: '80%',
      data: id
    });

    dialogRef.afterClosed().subscribe(result => {
      this.refresh();
    });
  }

}
