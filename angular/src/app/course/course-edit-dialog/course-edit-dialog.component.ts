import {Component, Inject} from '@angular/core';
import {InstrumentService} from "../../_service/instrument.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Instrument} from "../../_model/instrument";
import {BaseEditDialog} from "../../base/base-edit-dialog";
import {ErrorDialogComponent} from "../../error-dialog/error-dialog.component";
import {CourseService} from "../../_service/course.service";
import {Course} from "../../_model/course";

@Component({
  selector: 'app-course-edit-dialog',
  templateUrl: './course-edit-dialog.component.html',
  styleUrls: ['../../base/style/base-edit-component-style.scss']
})
export class CourseEditDialogComponent extends BaseEditDialog<CourseService>{
  data:Course = new Course();
  historyDisplayedColumns: string[] = ['id', 'name', 'description', 'status', 'deleteDate', 'students'];

  constructor(
    _courseService:CourseService,
    dialogRef: MatDialogRef<CourseEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) idd: number,
    public dialog: MatDialog) {
    super(
      _courseService,
      idd,
      dialogRef
    )
  }

  ngOnInit(): void {
    if (this.idd) {
      this._service.getByIdd(this.idd)
        .pipe()
        .subscribe(courses => {this.data = courses});
    } else {
      //this.data.students = [];
    }
  }

/*  onDelete(id: number){
    if (this.data.students.length > 0) {
      this.dialog.open(ErrorDialogComponent, {
        width: '30%',
        data: {
          title:'Невозможно удалить обьект',
          message: 'Инструмент используется:' + this.getRowFromDataRooms()
        }
      });
    } else {
      this._service.delete(id)
        .toPromise()
        .then(res => this.dialogRef.close())
        .catch(error => console.log(error));
    }
  }*/
}



