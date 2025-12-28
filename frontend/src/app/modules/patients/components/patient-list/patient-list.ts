import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PatientRepository } from '../../../../core/domain/ports/patient.repository';
import { Patient } from '../../../../core/domain/models/patient.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="container mx-auto p-4">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold text-gray-800">Patients</h1>
        <a routerLink="new" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          New Patient
        </a>
      </div>

      <div class="bg-white shadow-md rounded my-6 overflow-x-auto">
        <table class="min-w-full table-auto">
          <thead>
            <tr class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th class="py-3 px-6 text-left">Name</th>
              <th class="py-3 px-6 text-left">CPF</th>
              <th class="py-3 px-6 text-left">Email</th>
              <th class="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody class="text-gray-600 text-sm font-light">
            <tr *ngFor="let patient of patients$ | async" class="border-b border-gray-200 hover:bg-gray-100">
              <td class="py-3 px-6 text-left whitespace-nowrap">
                <div class="flex items-center">
                  <span class="font-medium">{{ patient.name }}</span>
                </div>
              </td>
              <td class="py-3 px-6 text-left">
                <span>{{ patient.cpf }}</span>
              </td>
              <td class="py-3 px-6 text-left">
                <span>{{ patient.email }}</span>
              </td>
              <td class="py-3 px-6 text-center">
                <div class="flex item-center justify-center">
                  <a [routerLink]="[patient.id, 'edit']" class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </a>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div *ngIf="(patients$ | async)?.length === 0" class="p-4 text-center text-gray-500">
          No patients found.
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class PatientListComponent implements OnInit {
  private patientRepository = inject(PatientRepository);
  patients$!: Observable<Patient[]>;

  ngOnInit(): void {
    this.patients$ = this.patientRepository.findAll();
  }
}
