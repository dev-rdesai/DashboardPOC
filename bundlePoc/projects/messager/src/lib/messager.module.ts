import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { 
  MatButtonModule,
  MatDialogModule,
  MatInputModule
} from '@angular/material';

import { MessagerComponent } from './messager.component';
import { SendMessageDialog } from './components/sendMessageDialog.component';
import { Sample } from './components/sample.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    HttpClientModule
  ],
  declarations: [
    MessagerComponent,
    SendMessageDialog,
    Sample
  ],
  exports: [MessagerComponent],
  entryComponents: [
    SendMessageDialog
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MessagerModule { }
