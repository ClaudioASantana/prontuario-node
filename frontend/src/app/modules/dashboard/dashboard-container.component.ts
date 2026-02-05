import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth.service';
import { Observable } from 'rxjs';
import { DashboardComponent } from './dashboard.component';
import { PatientDashboardComponent } from './patient-dashboard.component';

@Component({
  selector: 'app-dashboard-container',
  standalone: true,
  imports: [CommonModule, DashboardComponent, PatientDashboardComponent],
  template: `
    <ng-container *ngIf="userRole$ | async as role">
      <app-patient-dashboard *ngIf="role === 'patient'"></app-patient-dashboard>
      <app-dashboard *ngIf="role !== 'patient'"></app-dashboard>
    </ng-container>
  `,
})
export class DashboardContainerComponent implements OnInit {
  userRole$: Observable<string | null>;

  constructor(private authService: AuthService) {
    this.userRole$ = this.authService.currentUserRole$;
  }

  ngOnInit(): void {}
}
