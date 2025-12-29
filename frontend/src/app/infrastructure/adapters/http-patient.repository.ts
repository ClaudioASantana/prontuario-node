import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PatientRepository } from '../../core/domain/ports/patient.repository';
import { Patient } from '../../core/domain/models/patient.model';

@Injectable({
  providedIn: 'root'
})
export class HttpPatientRepository extends PatientRepository {
  private apiUrl = 'http://localhost:3000/api/v1/patients'; // TODO: Move to environment config

  constructor(private http: HttpClient) {
    super();
  }

  findAll(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.apiUrl);
  }

  findById(id: string): Observable<Patient> {
    return this.http.get<Patient>(`${this.apiUrl}/${id}`);
  }

  create(patient: Patient): Observable<Patient> {
    return this.http.post<Patient>(this.apiUrl, patient);
  }

  update(patient: Patient): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${patient.id}`, patient);
  }

  uploadPhoto(id: string, file: File): Observable<void> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<void>(`${this.apiUrl}/${id}/photo`, formData);
  }

  // Deprecated usage from existing code if any, but clean up is better.
  // Previous save() was likely used as create.
  save(patient: Patient): Observable<Patient> {
    return this.create(patient);
  }
}
