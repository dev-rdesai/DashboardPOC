import { Component, OnInit, Input, Output, TemplateRef } from '@angular/core';
import {MatDialog} from '@angular/material';
import { SendMessageDialog } from './components/sendMessageDialog.component';

@Component({
  selector: 'lib-messager',
  templateUrl: './messager.component.html',
  styleUrls: ['./messager.component.css']
})
export class MessagerComponent implements OnInit {
  @Input() myId: number;
  @Input() msgList: Array<string>;
  @Output() broadcastMessageGlobally;
  messageToSend: string = '';
  receiverId: string = 'All';
  dialogRef: any;

  constructor(public dialog: MatDialog) { 
    this.msgList = [];
  }

  ngOnInit() {
  }

  openSendMessagePopup(templateRef: TemplateRef<any>): void {
    this.dialogRef = this.dialog.open(templateRef, {
      width: '400px'
    });

    // const dialogRefTemp = this.dialog.open(SendMessageDialog, {
    //   width: '250px',
    //   data: {messageToSend: this.messageToSend, receiverId: this.receiverId}
    // });

    // dialogRefTemp.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   // this.messageToSend = result.messageToSend;
    //   // this.receiverId = result.receiverId;
    //   if(this.broadcastMessageGlobally) {
    //     this.broadcastMessageGlobally(this.messageToSend);
    //   }
    // });
  }

  sendMessage(): void {
    this.dialogRef.close();
    this.broadcastMessageGlobally(this.myId, this.messageToSend);
  }

  onMessageReceived(senderId, msg){
    if(senderId != this.myId){
      this.msgList.push(msg);
    }
  }

}
