import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Patient } from '../models/patient.model';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  private apiUrl = 'http://localhost:3000/api/v1/patients';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.apiUrl);
  }

  getById(id: string): Observable<Patient> {
    return this.http.get<Patient>(`${this.apiUrl}/${id}`);
  }

  create(patient: Partial<Patient>): Observable<string> {
    // Returns ID
    return this.http.post<string>(this.apiUrl, patient);
  }

  update(id: string, patient: Partial<Patient>): Observable<Patient> {
    return this.http.put<Patient>(`${this.apiUrl}/${id}`, patient);
  }

  uploadPhoto(id: string, file: File): Observable<Patient> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<Patient>(`${this.apiUrl}/${id}/photo`, formData);
  }
}
