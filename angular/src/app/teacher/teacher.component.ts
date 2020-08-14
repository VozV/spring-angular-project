import {Component} from '@angular/core';
import {BaseList} from "../base/base-list";
import {MatDialog} from "@angular/material/dialog";
import {Observable} from "rxjs";
import {Page} from "../_model/page";
import {TeacherService} from "../_service/teacher.service";

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['../base/style/base-component-style.scss']
})
export class TeacherComponent extends BaseList<TeacherService>{

  displayedColumns = ['idd', 'firstName', 'middleName', 'lastName', 'passport', 'status', 'birthDate', 'createDate', 'edit'];

  constructor(
    private _teacherService: TeacherService,
    public dialog: MatDialog) {
    super();
  }

  getListPage(sort: string, order: string, page: number, pageSize: number): Observable<Page> {
    return this._teacherService.getList(
      this.sort.active, this.sort.direction, this.paginator.pageIndex, this.paginator.pageSize);
  }

  openEditDialog(idd?:number) {
/*    const dialogRef = this.dialog.open(TeacherEditDialogComponent, {
      width: '80%',
      data: idd
    });

    dialogRef.afterClosed().subscribe(result => {
      this.refresh();
    });*/
  }

}
