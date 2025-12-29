import { Component, ChangeDetectionStrategy, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { PatientRepository } from '../../../core/domain/ports/patient.repository';
import { Patient } from '../../../core/domain/models/patient.model';

@Component({
  selector: 'app-patient-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule, RouterModule],
  templateUrl: './patient-form.component.html',
  styleUrl: './patient-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PatientFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private patientRepository = inject(PatientRepository);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  form!: FormGroup;
  isEditMode = signal(false);
  currentPatientId: string | null = null;
  selectedFile: File | null = null;
  photoPreview = signal<string | null>(null);

  ngOnInit() {
    this.initForm();

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode.set(true);
        this.currentPatientId = id;
        this.loadPatient(id);
      }
    });
  }

  initForm() {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', [Validators.required]],
      birthDate: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      phone: [''],
      address: [''],
      city: [''],
      state: [''],

      // Health & Insurance
      bloodType: [''],
      isOrganDonor: [false],
      smoker: [false],
      alcoholConsumption: [false],
      activityLevel: [0],
      insurancePlan: [''],
      insuranceNumber: ['']
    });
  }

  loadPatient(id: string) {
    this.patientRepository.findById(id).subscribe(patient => {
      this.form.patchValue({
        ...patient,
        birthDate: patient.birthDate ? new Date(patient.birthDate).toISOString().substring(0, 10) : ''
      });
      if (patient.photoUrl) {
        // Assume backend serves photos from root or adjust URL if needed
        // For now, if it's a relative path, prepend API base or rely on valid absolute URL
         this.photoPreview.set(patient.photoUrl.startsWith('http') ? patient.photoUrl : `http://localhost:3000${patient.photoUrl}`);
      }
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      // Preview
      const reader = new FileReader();
      reader.onload = () => {
        this.photoPreview.set(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.form.invalid) return;

    const patientData = this.form.value;

    // Ensure numbers for activityLevel if needed, though reactive forms might keep it number if initialized as such

    if (this.isEditMode()) {
      this.updatePatient(patientData);
    } else {
      this.createPatient(patientData);
    }
  }

  createPatient(data: any) {
    // Create new object omitting ID
    const newPatient: Omit<Patient, 'id'> = data;

    this.patientRepository.create(newPatient as Patient).subscribe({
      next: (createdPatient) => {
        if (this.selectedFile && createdPatient.id) {
          this.uploadPhoto(createdPatient.id);
        } else {
          this.router.navigate(['/patients']);
        }
      },
      error: (err) => console.error(err)
    });
  }

  updatePatient(data: any) {
    if (!this.currentPatientId) return;

    const patientToUpdate = { ...data, id: this.currentPatientId };

    this.patientRepository.update(patientToUpdate).subscribe({
      next: () => {
        if (this.selectedFile) {
          this.uploadPhoto(this.currentPatientId!);
        } else {
          this.router.navigate(['/patients']);
        }
      },
      error: (err) => console.error(err)
    });
  }

  uploadPhoto(id: string) {
    this.patientRepository.uploadPhoto(id, this.selectedFile!).subscribe({
        next: () => this.router.navigate(['/patients']),
        error: (err) => console.error(err)
    });
  }
}
