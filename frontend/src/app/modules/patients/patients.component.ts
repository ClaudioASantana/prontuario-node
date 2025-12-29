import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { PatientRepository } from '../../core/domain/ports/patient.repository';
import { Patient } from '../../core/domain/models/patient.model';

import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-patients',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterModule],
  templateUrl: './patients.component.html',
  styleUrl: './patients.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PatientsComponent {
  private patientRepository = inject(PatientRepository);

  patients = signal<Patient[]>([]);

  constructor() {
    this.loadPatients();
  }

  loadPatients() {
    this.patientRepository.findAll().subscribe(data => {
      this.patients.set(data);
    });
  }
}
