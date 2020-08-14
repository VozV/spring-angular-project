import {AfterViewInit, Component, OnInit} from '@angular/core';
import {BaseList} from "../base/base-list";
import {CourseList} from "../_model/course-list";
import {CourseService} from "../_service/course.service";
import {MatDialog} from "@angular/material/dialog";
import {Observable} from "rxjs";
import {Page} from "../_model/page";
import {CourseEditDialogComponent} from "./course-edit-dialog/course-edit-dialog.component";

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['../base/style/base-component-style.scss']
})
export class CourseComponent extends BaseList<CourseList> implements AfterViewInit  {

  displayedColumns = ['idd', 'name', 'description', 'status', 'startDate', 'endDate', 'edit'];

  constructor(private _courseService: CourseService, public dialog: MatDialog) {super();}


  openEditDialog(idd?:number) {
    const dialogRef = this.dialog.open(CourseEditDialogComponent, {
      width: '80%',
      data: idd
    });

    dialogRef.afterClosed().subscribe(result => {
      this.refresh();
    });
  }

  getListPage(sort: string, order: string, page: number, pageSize: number): Observable<Page> {
    return this._courseService.getList(
      this.sort.active, this.sort.direction, this.paginator.pageIndex, this.paginator.pageSize);
  }
}
