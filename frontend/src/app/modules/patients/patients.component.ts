import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { GlassCardComponent } from '../../shared/components/ui/glass-card.component';
import { GlassButtonComponent } from '../../shared/components/ui/glass-button.component';
import { PatientService } from '../../services/patient.service';
import { Patient } from '../../models/patient.model';

@Component({
  selector: 'app-patients',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule, GlassCardComponent, GlassButtonComponent],
  template: `
    <div class="px-8 py-10 bg-gradient-mesh min-h-screen">
      <!-- Header Section -->
      <div class="flex justify-between items-center mb-10">
        <div>
          <h1 class="text-4xl font-bold text-neutral-900 tracking-tight">
            {{ 'PATIENTS.LIST.TITLE' | translate }}
          </h1>
          <p class="text-neutral-500 mt-2 text-lg">{{ 'PATIENTS.LIST.SUBTITLE' | translate }}</p>
        </div>
        <app-glass-button variant="primary" label="Novo Paciente" routerLink="new">
          <i class="bi bi-person-plus text-xl" icon></i>
        </app-glass-button>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <app-glass-card
          header="Total"
          subHeader="Pacientes ativos"
          class="border-l-4 border-l-primary-500"
        >
          <div class="text-3xl font-bold text-primary-600 mt-2">1,284</div>
        </app-glass-card>
        <app-glass-card header="Novos" subHeader="Este mês" class="border-l-4 border-l-teal-500">
          <div class="text-3xl font-bold text-teal-600 mt-2">+42</div>
        </app-glass-card>
        <app-glass-card
          header="Agendados"
          subHeader="Para hoje"
          class="border-l-4 border-l-indigo-500"
        >
          <div class="text-3xl font-bold text-indigo-600 mt-2">18</div>
        </app-glass-card>
        <app-glass-card
          header="Retornos"
          subHeader="Pendentes"
          class="border-l-4 border-l-amber-500"
        >
          <div class="text-3xl font-bold text-amber-600 mt-2">5</div>
        </app-glass-card>
      </div>

      <!-- Main Content: Patients Table/Grid -->
      <app-glass-card [noPadding]="true">
        <div class="overflow-x-auto shadow-sm">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-neutral-50/50 border-b border-neutral-100">
                <th
                  class="px-6 py-4 text-sm font-semibold text-neutral-600 uppercase tracking-wider"
                >
                  {{ 'PATIENTS.LIST.NAME' | translate }}
                </th>
                <th
                  class="px-6 py-4 text-sm font-semibold text-neutral-600 uppercase tracking-wider"
                >
                  {{ 'PATIENTS.LIST.CONTACT' | translate }}
                </th>
                <th
                  class="px-6 py-4 text-sm font-semibold text-neutral-600 uppercase tracking-wider"
                >
                  {{ 'PATIENTS.LIST.CITY' | translate }}
                </th>
                <th
                  class="px-6 py-4 text-sm font-semibold text-neutral-600 uppercase tracking-wider text-right"
                >
                  {{ 'PATIENTS.LIST.ACTIONS' | translate }}
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-neutral-100/50">
              <tr *ngFor="let patient of patients" class="hover:bg-primary-50/30 transition-colors">
                <td class="px-6 py-5">
                  <div class="flex items-center">
                    <div
                      class="w-10 h-10 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold mr-4 text-sm shadow-sm ring-2 ring-white"
                    >
                      {{ patient.name | slice: 0 : 1 }}
                    </div>
                    <div>
                      <div class="font-bold text-neutral-900">{{ patient.name }}</div>
                      <div class="text-xs text-neutral-500 font-medium">CPF: {{ patient.cpf }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-5">
                  <div class="text-sm text-neutral-700 font-medium">{{ patient.email }}</div>
                  <div class="text-xs text-neutral-400 mt-0.5">{{ patient.phone }}</div>
                </td>
                <td class="px-6 py-5">
                  <span
                    class="px-3 py-1 rounded-full bg-neutral-100 text-neutral-600 text-xs font-bold border border-neutral-200"
                  >
                    {{ patient.city }}
                  </span>
                </td>
                <td class="px-6 py-5 text-right">
                  <div class="flex justify-end gap-2">
                    <app-glass-button
                      variant="ghost"
                      class="!px-3 !py-2"
                      [routerLink]="[patient.id, 'edit']"
                    >
                      <i class="bi bi-pencil text-primary-500"></i>
                    </app-glass-button>
                    <app-glass-button variant="danger" class="!px-3 !py-2">
                      <i class="bi bi-trash"></i>
                    </app-glass-button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </app-glass-card>
    </div>
  `,
  styles: [],
})
export class PatientsComponent implements OnInit {
  patients: Patient[] = [];

  constructor(private patientService: PatientService) {}

  ngOnInit(): void {
    this.loadPatients();
  }

  loadPatients(): void {
    this.patientService.getAll().subscribe({
      next: (data) => (this.patients = data),
      error: () => {
        // Mock data for display if API fails
        this.patients = [
          {
            id: '1',
            name: 'Ana Oliveira',
            email: 'ana@email.com',
            cpf: '123.456.789-00',
            phone: '(11) 98765-4321',
            city: 'São Paulo',
            bloodType: 'O+',
            gender: 'female',
            isOrganDonor: true,
            smoker: false,
            alcoholConsumption: false,
            activityLevel: 1,
            receivedTransfusion10Years: false,
            birthDate: new Date('1990-01-01'),
          },
          // ... add more mocks if needed, ensuring they match interface
        ];
      },
    });
  }
}
