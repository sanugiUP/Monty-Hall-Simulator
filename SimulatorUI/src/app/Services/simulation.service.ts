import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SimulationInput } from '../Models/simulation-input.model';
import { SimulationOutput } from '../Models/simulation-output.model';

@Injectable({
  providedIn: 'root'
})
export class SimulationService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  simulateMontyHallGames(simulationInput: SimulationInput): Observable<SimulationOutput> {
    const url = `${this.apiUrl}/simulator/start`;
    return this.http.post<SimulationOutput>(url, simulationInput);
  }
}
