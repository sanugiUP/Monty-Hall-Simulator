import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BarChartComponent } from './Components/bar-chart/bar-chart.component';
import { UserInputComponent } from './Components/user-input/user-input.component';
import { PercentageBarComponent } from './Components/percentage-bar/percentage-bar.component';

const routes: Routes = [
  {path: 'user-input', component: UserInputComponent },
  {path: 'percentage-bar', component: PercentageBarComponent },
  {path: '**', component: UserInputComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
