import { Component, ChangeDetectionStrategy, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { HealthPlanRepository } from '../../../core/domain/ports/health-plan.repository';
import { HealthPlan, HealthPlanType } from '../../../core/domain/models/health-plan.model';

@Component({
  selector: 'app-health-plan-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule, RouterModule],
  templateUrl: './health-plan-form.component.html',
  styleUrl: './health-plan-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HealthPlanFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private healthPlanRepository = inject(HealthPlanRepository);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  form!: FormGroup;
  isEditMode = signal(false);
  currentId: string | null = null;

  planTypes = Object.values(HealthPlanType);

  ngOnInit() {
    this.initForm();

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode.set(true);
        this.currentId = id;
        this.loadHealthPlan(id);
      }
    });
  }

  initForm() {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      code: ['', [Validators.required]],
      commercialName: [''],
      type: [HealthPlanType.INDIVIDUAL, [Validators.required]],
      active: [true]
    });
  }

  loadHealthPlan(id: string) {
    this.healthPlanRepository.findById(id).subscribe(plan => {
      this.form.patchValue(plan);
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    const data = this.form.value;

    if (this.isEditMode()) {
      this.healthPlanRepository.update({ ...data, id: this.currentId }).subscribe({
        next: () => this.router.navigate(['/health-plans']),
        error: (err) => console.error(err)
      });
    } else {
      this.healthPlanRepository.create(data).subscribe({
        next: () => this.router.navigate(['/health-plans']),
        error: (err) => console.error(err)
      });
    }
  }
}
