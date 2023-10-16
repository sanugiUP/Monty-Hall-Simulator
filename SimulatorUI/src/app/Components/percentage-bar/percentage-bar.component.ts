import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { SimulationOutput } from 'src/app/Models/simulation-output.model';

@Component({
  selector: 'app-percentage-bar',
  templateUrl: './percentage-bar.component.html',
  styleUrls: ['./percentage-bar.component.css']
})
export class PercentageBarComponent implements OnInit, OnDestroy {
  @Input() simulationOutput: SimulationOutput | null = null;
  @Input() title: string | null = '';
  @Input() displayType: boolean = false;
 
  private _counter = 0;
  private intervalId: any;
  dashOffset: string = '0';
  probability = 0;

  get counter(): number {
    return this._counter;
  }

  ngOnInit(): void {
    if(this.displayType) {
      this.probability = this.simulationOutput!?.winRate;
    } else {
      this.probability = this.simulationOutput!?.lossRate;
    }
    this.startInterval();
  }

  ngOnDestroy(): void {
    this.clearInterval();
  }

  private startInterval(): void {
    if (this.simulationOutput) {
      this.intervalId = setInterval(() => {
        var offset = ((1 - (this.probability / 100)) * 450).toString();
        document.documentElement.style.setProperty('--dashOffset', offset);
        console.log('O' + offset);
        
        if (this._counter >= this.probability) {
          this.dashOffset = ((1 - (this._counter / 100)) * 450).toString();
          console.log('O' + this.dashOffset);
          this.clearInterval();
        } else {
          this._counter += 1;
        }
      }, 30);
    }
    
  }

  private clearInterval(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
