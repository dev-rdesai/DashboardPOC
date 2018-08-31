import { ModuleService } from './services/module.services';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { GridsterModule } from 'angular-gridster2';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatDialogModule,
  MatInputModule,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material';
import { PortalComponentComponent } from './components/portal-component/portal-component.component';

@NgModule({
  declarations: [
    AppComponent,
    PortalComponentComponent
  ],
  imports: [
    BrowserModule,
    GridsterModule,
    HttpModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    FormsModule
  ],
  providers: [ModuleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
