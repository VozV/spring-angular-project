import {Component} from '@angular/core';
import {BaseList} from "../base/base-list";
import {StudentList} from "../_model/student-list";
import {MatDialog} from "@angular/material/dialog";
import {StudentService} from "../_service/student.service";
import {Observable} from "rxjs";
import {Page} from "../_model/page";
import {StudentEditDialogComponent} from "./student-edit-dialog/student-edit-dialog.component";

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['../base/style/base-component-style.scss']
})
export class StudentComponent extends BaseList<StudentList>{

  displayedColumns = ['idd', 'firstName', 'middleName', 'lastName', 'passport', 'status', 'birthDate', 'createDate', 'edit'];

  constructor(
    private _studentService: StudentService,
    public dialog: MatDialog) {
    super();
  }

  getListPage(sort: string, order: string, page: number, pageSize: number): Observable<Page> {
    return this._studentService.getList(
      this.sort.active, this.sort.direction, this.paginator.pageIndex, this.paginator.pageSize);
  }

  openEditDialog(idd?:number) {
    const dialogRef = this.dialog.open(StudentEditDialogComponent, {
      width: '80%',
      data: idd
    });

    dialogRef.afterClosed().subscribe(result => {
      this.refresh();
    });
  }

}
