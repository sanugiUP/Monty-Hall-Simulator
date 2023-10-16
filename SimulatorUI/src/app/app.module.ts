import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgChartsModule } from 'ng2-charts';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BarChartComponent } from './Components/bar-chart/bar-chart.component';
import { HttpClientModule } from '@angular/common/http';
import { UserInputComponent } from './Components/user-input/user-input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PercentageBarComponent } from './Components/percentage-bar/percentage-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    BarChartComponent,
    UserInputComponent,
    PercentageBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgChartsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
