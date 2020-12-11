import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SudokuComponent } from './sudoku/sudoku.component';
import { PrimecountComponent } from './primecount/primecount.component';
import { StudentformComponent } from './studentform/studentform.component';

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "form", component: StudentformComponent },
  { path: "primecount", component: PrimecountComponent },
  { path: "sudoku", component: SudokuComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
