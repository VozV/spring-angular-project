import {Component, Inject} from '@angular/core';
import {InstrumentService} from "../../_service/instrument.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Instrument} from "../../_model/instrument";
import {BaseEditDialog} from "../../base/base-edit-dialog";
import {ErrorDialogComponent} from "../../error-dialog/error-dialog.component";

@Component({
  selector: 'app-instrument-edit-dialog',
  templateUrl: './instrument-edit-dialog.component.html',
  styleUrls: ['../../base/style/base-edit-component-style.scss']
})
export class InstrumentEditDialogComponent extends BaseEditDialog<InstrumentService>{
  data:Instrument = new Instrument();
  historyDisplayedColumns: string[] = ['id', 'number', 'name', 'deleteDate'];

  constructor(
    _instrumentService:InstrumentService,
    dialogRef: MatDialogRef<InstrumentEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) idd: number,
    public dialog: MatDialog) {
      super(
        _instrumentService,
        idd,
        dialogRef
      )
  }

  ngOnInit(): void {
    if (this.idd) {
      this._service.getByIdd(this.idd)
        .pipe()
        .subscribe(instruments => {this.data = instruments});
    } else {
      this.data.rooms = [];
    }
  }

  onDelete(id: number){
    if (this.data.rooms.length > 0) {
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
  }

  private getRowFromDataRooms() : String {
    const lastRooms = new Map(this.data.rooms.map(i => [i.idd, i]));
    let str = '';
    lastRooms.forEach(value => {
      str +=  '\nАудитория: ' + value.number + ', Корпус: ' + value.block;
    });
    return str;
  }
}


