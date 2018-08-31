import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MessagerModule } from 'projects/messager/src/lib/messager.module';
import { HeaderModule } from 'projects/header/src/lib/header.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MessagerModule,
    HeaderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
