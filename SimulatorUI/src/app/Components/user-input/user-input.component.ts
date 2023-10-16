import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SimulationInput } from 'src/app/Models/simulation-input.model';
import { SimulationOutput } from 'src/app/Models/simulation-output.model';
import { SimulationService } from 'src/app/Services/simulation.service';

@Component({
  selector: 'app-user-input',
  templateUrl: './user-input.component.html',
  styleUrls: ['./user-input.component.css'],
})
export class UserInputComponent implements OnInit {
  simulationForm!: FormGroup;
  simulationOutput: SimulationOutput | null = null;
  loading = false;
  description = '';

  constructor(private fb: FormBuilder, private simulationService: SimulationService) {}

  ngOnInit() {
    this.simulationForm = this.fb.group({
      simulationCount: [100, [Validators.required, Validators.pattern(/^[1-9]\d*$/)]],
      switchDoor: [false] 
    });
  }

  initForm() {
    this.simulationForm = this.fb.group({
      simulationCount: [null, [Validators.required, Validators.pattern(/^[1-9]\d*$/)]],
      switchDoor: [false],
    });
  }

  simulateGames() {
    if (this.simulationForm.valid) {
      const games = this.simulationForm.value.simulationCount;
      const switchDoor = this.simulationForm.value.switchDoor;
      if(switchDoor) {
        this.description = 'The results below are simulated from running the Monty Hall scenario ' + games + ' times where the player chooses to switch the door.';
      }else {
        this.description = 'The results below are simulated from running the Monty Hall scenario ' + games + ' times where the player chooses not to switch the door.';
      }

      this.loading = true;
      this.simulationOutput = null;
      const simulationInput: SimulationInput = {
        simulationCount: this.simulationForm.value.simulationCount,
        switchDoor: this.simulationForm.value.switchDoor,
      };

      this.simulationService
        .simulateMontyHallGames(simulationInput)
        .subscribe({
          next: (result: SimulationOutput) => {
            this.simulationOutput = result;
          },
          error: (error) => {
            console.error('Error:', error);
            this.loading = false;
            alert("The number of games entered was too long! Please enter a smaller value.");
            this.clearSimulation();
          },
          complete: () => {
            this.loading = false;
          }
        });
    }
  }

  clearSimulation(): void {
    this.loading = false;
    this.simulationForm.reset();
    this.simulationForm.patchValue({ switchDoor: false });
    this.simulationOutput = null;
  }
}
