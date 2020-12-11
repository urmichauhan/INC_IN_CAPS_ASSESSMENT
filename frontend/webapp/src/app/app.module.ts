import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// import { MyDatePickerModule } from 'mydatepicker';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SudokuComponent } from './sudoku/sudoku.component';
import { PrimecountComponent } from './primecount/primecount.component';
import { StudentformComponent } from './studentform/studentform.component';
import { WebservicesService } from './webservices.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SudokuComponent,
    PrimecountComponent,
    StudentformComponent
  ],
  imports: [
    BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule, HttpClientModule
  ],
  providers: [WebservicesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
