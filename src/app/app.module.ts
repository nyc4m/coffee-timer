import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ElapsedTimePipe } from './elapsed-time.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ElapsedTimePipe
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
