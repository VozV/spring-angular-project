import {Component, Inject, ViewChild} from '@angular/core';
import {MatTable} from "@angular/material/table";
import {InstrumentService} from "../../_service/instrument.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {BaseEditDialog} from "../../base/base-edit-dialog";
import {StudentService} from "../../_service/student.service";
import {Student} from "../../_model/student";
import {DatePipe} from "@angular/common";
import {CourseList} from "../../_model/course-list";

@Component({
  selector: 'app-student-edit-dialog',
  templateUrl: './student-edit-dialog.component.html',
  styleUrls: ['../../base/style/base-edit-component-style.scss','./lesson-edit-component.scss']
})
export class StudentEditDialogComponent extends BaseEditDialog<StudentService>{

  @ViewChild(MatTable) matTable: MatTable<CourseList>;

  data:Student = new Student();

  courseDisplayedColumns: string [] = ['select', 'idd', 'firstName', 'middleName', 'lastName', 'passport', 'status','birthDate'];
  historyDisplayedColumns: string[] = ['id', 'number', 'block', 'deleteDate'];

  showStudentTable:boolean = false;

  constructor(
    _studentService:StudentService,
    private _instrumentService:InstrumentService,
    dialogR: MatDialogRef<StudentEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public idd: number,
    private datePipe : DatePipe,
    public dialog: MatDialog) {
    super(
      _studentService,
      idd,
      dialogR
    )
  }
/*
  setShowInstrumentsTable() {
    this.showInstrumentTable = !this.showInstrumentTable;
  }*/

  ngOnInit(): void {
    if (this.idd) {
      this._service.getByIdd(this.idd)
        .pipe()
        .subscribe(student => {this.data = student});
    } else {
      this.data.courses = [];
    }
  }

  onSaveClick() {
    this.data.birthDate = this.datePipe.transform(this.data.birthDate, 'yyyy-MM-dd');
    if (this.idd){
      this._service.update(this.idd, this.data)
        .toPromise()
        .then(res => this.dialogRef.close())
        .catch(error => console.log(error));
    } else {
      this._service.create(this.data)
        .toPromise()
        .then(res => this.dialogRef.close())
        .catch(error => console.log(error));
    }
  }


/*  onDeleteInstrument() {
    this.data.instruments
      = this.data.instruments.filter(obj => obj.idd !== this.selection.selected[0].idd);
    this.selection.clear();
    this.matTable.renderRows();
  }*/

/*  onAddInstrument() {
    const dialogRef = this.dialog.open(AddInstrumentDialogComponent, {
      width: '750px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.data.instruments.push(result);
      this.matTable.renderRows();
    });
  }*/
}
