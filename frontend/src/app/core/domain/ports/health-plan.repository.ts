import { Observable } from 'rxjs';
import { HealthPlan } from '../models/health-plan.model';

export abstract class HealthPlanRepository {
  abstract findAll(): Observable<HealthPlan[]>;
  abstract findById(id: string): Observable<HealthPlan>;
  abstract create(healthPlan: Partial<HealthPlan>): Observable<HealthPlan>;
  abstract update(healthPlan: Partial<HealthPlan>): Observable<HealthPlan>;
  abstract delete(id: string): Observable<void>;
}
