import { Directive, EventEmitter, HostListener, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmActionDialogComponent } from './confirm-action-dialog/confirm-action-dialog.component';

@Directive({
  selector: '[appConfirmAction]'
})
export class ConfirmActionDirective {

  @Output() confirm = new EventEmitter();


  constructor(public dialog: MatDialog) { }

  @HostListener('click') onClick(){
    const dialogRef = this.dialog.open(ConfirmActionDialogComponent, );
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.confirm.emit()
      }
    });
  }
}
