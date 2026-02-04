import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { HealthPlanRepository } from '../../core/domain/ports/health-plan.repository';
import { HealthPlan } from '../../core/domain/models/health-plan.model';

@Component({
  selector: 'app-health-plans',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './health-plans.component.html',
  styleUrl: './health-plans.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HealthPlansComponent {
  private healthPlanRepository = inject(HealthPlanRepository);

  healthPlans = signal<HealthPlan[]>([]);

  constructor() {
    this.loadHealthPlans();
  }

  loadHealthPlans() {
    this.healthPlanRepository.findAll().subscribe(data => {
      this.healthPlans.set(data);
    });
  }
}
