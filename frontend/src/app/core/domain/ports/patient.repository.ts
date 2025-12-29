import { Observable } from 'rxjs';
import { Patient } from '../models/patient.model';

export abstract class PatientRepository {
  abstract findAll(): Observable<Patient[]>;
  abstract findById(id: string): Observable<Patient>; // Changed to strict Patient for better type safety if possible, or keep undefined
  abstract create(patient: Patient): Observable<Patient>;
  abstract update(patient: Patient): Observable<void>;
  abstract uploadPhoto(id: string, file: File): Observable<void>;
}
