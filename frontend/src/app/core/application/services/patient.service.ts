import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PatientRepository } from '../../domain/ports/patient.repository';
import { Patient } from '../../domain/models/patient.model';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  constructor(private patientRepository: PatientRepository) {}

  getAllPatients(): Observable<Patient[]> {
    return this.patientRepository.findAll();
  }

  getPatientById(id: string): Observable<Patient | undefined> {
    return this.patientRepository.findById(id);
  }

  registerPatient(patient: Patient): Observable<Patient> {
    return this.patientRepository.save(patient);
  }
}
