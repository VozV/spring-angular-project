import {Component, Inject, OnInit} from '@angular/core';
import {BaseEditDialog} from "../../base/base-edit-dialog";
import {LessonService} from "../../_service/lesson.service";
import {Lesson} from "../../_model/lesson";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {InstrumentService} from "../../_service/instrument.service";
import {CourseService} from "../../_service/course.service";
import {TeacherService} from "../../_service/teacher.service";
import {InstrumentList} from "../../_model/instrument-list";
import {CourseList} from "../../_model/course-list";
import {TeacherList} from "../../_model/teacher-list";

@Component({
  selector: 'app-lesson-edit-dialog',
  templateUrl: './lesson-edit-dialog.component.html',
  styleUrls: ['../../base/style/base-edit-component-style.scss']
})
export class LessonEditDialogComponent extends BaseEditDialog<LessonService>{
  data:Lesson = new Lesson();
/*
  instrumentList: InstrumentList[];
  courseList: CourseList[];
  teacherList: TeacherList[];
*/

  constructor(
    _lessonService:LessonService,
    private _instrumentService:InstrumentService,
    private _courseService:CourseService,
    private _teacherService:TeacherService,
    dialogRef: MatDialogRef<LessonEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) idd: number,
    public dialog: MatDialog) {
    super(
      _lessonService,
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
