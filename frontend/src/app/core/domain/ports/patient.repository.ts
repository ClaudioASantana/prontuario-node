import { Observable } from 'rxjs';
import { Patient } from '../models/patient.model';

export abstract class PatientRepository {
  abstract findAll(): Observable<Patient[]>;
  abstract findById(id: string): Observable<Patient | undefined>;
  abstract save(patient: Patient): Observable<Patient>;
}
