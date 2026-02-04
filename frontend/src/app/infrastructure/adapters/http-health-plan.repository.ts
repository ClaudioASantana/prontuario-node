import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HealthPlanRepository } from '../../core/domain/ports/health-plan.repository';
import { HealthPlan } from '../../core/domain/models/health-plan.model';

@Injectable({
  providedIn: 'root'
})
export class HttpHealthPlanRepository extends HealthPlanRepository {
  private apiUrl = 'http://localhost:3000/api/v1/health-plans'; // TODO: Move to environment config

  constructor(private http: HttpClient) {
    super();
  }

  findAll(): Observable<HealthPlan[]> {
    return this.http.get<HealthPlan[]>(this.apiUrl);
  }

  findById(id: string): Observable<HealthPlan> {
    return this.http.get<HealthPlan>(`${this.apiUrl}/${id}`);
  }

  create(healthPlan: Partial<HealthPlan>): Observable<HealthPlan> {
    return this.http.post<HealthPlan>(this.apiUrl, healthPlan);
  }

  update(healthPlan: Partial<HealthPlan>): Observable<HealthPlan> {
    return this.http.put<HealthPlan>(`${this.apiUrl}/${healthPlan.id}`, healthPlan);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
