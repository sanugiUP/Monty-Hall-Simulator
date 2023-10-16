import { SimulationInput } from './simulation-input.model';

export class SimulationOutput {
  userInput?: SimulationInput;
  winRate: number = 0.0;
  lossRate: number = 0.0;
}