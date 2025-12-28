import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { PatientRepository } from '../../../../core/domain/ports/patient.repository';
import { Patient } from '../../../../core/domain/models/patient.model';
import { switchMap, of, catchError } from 'rxjs';

@Component({
  selector: 'app-patient-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="container mx-auto p-4 max-w-2xl">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold text-gray-800">{{ isEditMode ? 'Edit' : 'New' }} Patient</h1>
      </div>

      <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <form [formGroup]="form" (ngSubmit)="onSubmit()">
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
              Name
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Full Name"
              formControlName="name"
            >
            <div *ngIf="form.get('name')?.touched && form.get('name')?.invalid" class="text-red-500 text-xs italic">
              Name is required.
            </div>
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="cpf">
              CPF
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="cpf"
              type="text"
              placeholder="000.000.000-00"
              formControlName="cpf"
            >
          </div>

          <div class="mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
              Email
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="email@example.com"
              formControlName="email"
            >
          </div>

          <div class="flex items-center justify-between">
            <button
              class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
              type="submit"
              [disabled]="form.invalid || isSubmitting"
            >
              {{ isSubmitting ? 'Saving...' : 'Save' }}
            </button>
            <a routerLink="/patients" class="inline-block align-baseline font-bold text-sm text-blue-600 hover:text-blue-800">
              Cancel
            </a>
          </div>

          <div *ngIf="errorMessage" class="mt-4 text-red-500 text-sm">
            {{ errorMessage }}
          </div>
        </form>
      </div>
    </div>
  `,
  styles: []
})
export class PatientFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private patientRepository = inject(PatientRepository);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  form!: FormGroup;
  isEditMode = false;
  patientId: string | null = null;
  isSubmitting = false;
  errorMessage: string | null = null;

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      cpf: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });

    this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        if (id) {
          this.isEditMode = true;
          this.patientId = id;
          return this.patientRepository.findById(id);
        }
        return of(null);
      })
    ).subscribe(patient => {
      if (patient) {
        this.form.patchValue(patient);
      }
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.isSubmitting = true;
      const patientData = this.form.value;
      if (this.isEditMode && this.patientId) {
        patientData.id = this.patientId;
      }

      this.patientRepository.save(patientData).pipe(
        catchError(err => {
          this.errorMessage = 'Error saving patient.';
          this.isSubmitting = false;
          return of(null);
        })
      ).subscribe(result => {
        if (result) {
          this.router.navigate(['/patients']);
        }
      });
    }
  }
}
