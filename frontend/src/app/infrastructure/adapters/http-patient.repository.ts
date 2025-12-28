import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PatientRepository } from '../../core/domain/ports/patient.repository';
import { Patient } from '../../core/domain/models/patient.model';

@Injectable({
  providedIn: 'root'
})
export class HttpPatientRepository extends PatientRepository {
  private apiUrl = 'http://localhost:3000/patients'; // TODO: Move to environment config

  constructor(private http: HttpClient) {
    super();
  }

  findAll(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.apiUrl);
  }

  findById(id: string): Observable<Patient | undefined> {
    return this.http.get<Patient>(`${this.apiUrl}/${id}`);
  }

  save(patient: Patient): Observable<Patient> {
    return this.http.post<Patient>(this.apiUrl, patient);
  }
}
