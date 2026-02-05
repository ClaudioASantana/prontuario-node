import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { GlassCardComponent } from '../../shared/components/ui/glass-card.component';
import { GlassButtonComponent } from '../../shared/components/ui/glass-button.component';

interface HealthPlan {
  id: string;
  name: string;
  code: string;
  commercialName: string;
  type: string;
  active: boolean;
}

@Component({
  selector: 'app-health-plans',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule, GlassCardComponent, GlassButtonComponent],
  template: `
    <div class="px-8 py-10 bg-gradient-mesh min-h-screen">
      <!-- Header Section -->
      <div class="flex justify-between items-center mb-10">
        <div>
          <h1 class="text-4xl font-bold text-neutral-900 tracking-tight">
            {{ 'HEALTH_PLANS.LIST.TITLE' | translate }}
          </h1>
          <p class="text-neutral-500 mt-2 text-lg">
            {{ 'HEALTH_PLANS.LIST.SUBTITLE' | translate }}
          </p>
        </div>
        <app-glass-button variant="primary" label="Novo Convênio" routerLink="new">
          <i class="bi bi-shield-plus text-xl" icon></i>
        </app-glass-button>
      </div>

      <!-- Plans Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <app-glass-card
          *ngFor="let plan of healthPlans"
          [header]="plan.name"
          [subHeader]="plan.commercialName"
          class="group"
        >
          <div class="mt-4 flex flex-col gap-4">
            <div class="flex justify-between items-center">
              <span class="text-xs font-bold text-neutral-400 uppercase tracking-widest"
                >Código</span
              >
              <span class="text-sm font-mono text-neutral-700 bg-neutral-100 px-2 py-1 rounded">{{
                plan.code
              }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-xs font-bold text-neutral-400 uppercase tracking-widest">Tipo</span>
              <span
                class="px-3 py-1 rounded-full text-xs font-bold shadow-sm"
                [ngClass]="{
                  'bg-blue-100 text-blue-700': plan.type === 'Individual',
                  'bg-teal-100 text-teal-700': plan.type === 'Company',
                  'bg-indigo-100 text-indigo-700': plan.type === 'Family',
                }"
              >
                {{ plan.type }}
              </span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-xs font-bold text-neutral-400 uppercase tracking-widest"
                >Status</span
              >
              <div class="flex items-center gap-2">
                <span
                  class="w-2 h-2 rounded-full"
                  [class.bg-green-500]="plan.active"
                  [class.bg-red-500]="!plan.active"
                ></span>
                <span
                  class="text-sm font-bold"
                  [class.text-green-600]="plan.active"
                  [class.text-red-600]="!plan.active"
                >
                  {{ plan.active ? 'Ativo' : 'Inativo' }}
                </span>
              </div>
            </div>

            <div class="pt-4 border-t border-neutral-100/50 flex gap-2 mt-2">
              <app-glass-button
                variant="glass"
                class="flex-1 !py-2 text-sm"
                [routerLink]="[plan.id, 'edit']"
              >
                Editar
              </app-glass-button>
              <app-glass-button variant="ghost" class="!px-3 !py-2 text-red-500 hover:bg-red-50">
                <i class="bi bi-trash"></i>
              </app-glass-button>
            </div>
          </div>
        </app-glass-card>
      </div>

      <!-- Empty State -->
      <div *ngIf="healthPlans.length === 0" class="flex flex-col items-center justify-center py-20">
        <div class="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center mb-4">
          <i class="bi bi-shield-slash text-3xl text-neutral-400"></i>
        </div>
        <h3 class="text-xl font-bold text-neutral-900">Nenhum convênio encontrado</h3>
        <p class="text-neutral-500 mt-1">Comece adicionando seu primeiro convênio médico.</p>
      </div>
    </div>
  `,
  styles: [],
})
export class HealthPlansComponent implements OnInit {
  healthPlans: HealthPlan[] = [];
  private apiUrl = 'http://localhost:3000/api/v1/health-plans';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadHealthPlans();
  }

  loadHealthPlans(): void {
    this.http.get<HealthPlan[]>(this.apiUrl).subscribe({
      next: (data) => (this.healthPlans = data),
      error: () => {
        // Mock data
        this.healthPlans = [
          {
            id: '1',
            name: 'Unimed',
            code: 'UNM-001',
            commercialName: 'Unimed Nacional Pleno',
            type: 'Individual',
            active: true,
          },
          {
            id: '2',
            name: 'Bradesco Saúde',
            code: 'BRD-042',
            commercialName: 'Bradesco Top Nacional',
            type: 'Company',
            active: true,
          },
          {
            id: '3',
            name: 'Amil',
            code: 'AML-999',
            commercialName: 'Amil One S2500',
            type: 'Family',
            active: false,
          },
          {
            id: '4',
            name: 'SulAmérica',
            code: 'SLA-123',
            commercialName: 'SulAmérica Direto SP',
            type: 'Individual',
            active: true,
          },
        ];
      },
    });
  }
}
