import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'lib-sendmessagedialog',
  templateUrl: './sendMessageDialog.component.html'
})
export class SendMessageDialog implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<SendMessageDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit() {
  }

  sendMessage(): void {
    this.dialogRef.close();
  }

}

export interface DialogData {
  messageToSend: string;
  receiverId: string;
}
