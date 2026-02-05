import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { PatientService } from '../../../services/patient.service';
import { GlassCardComponent } from '../../../shared/components/ui/glass-card.component';
import { GlassButtonComponent } from '../../../shared/components/ui/glass-button.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-patient-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    GlassCardComponent,
    GlassButtonComponent,
    TranslateModule,
  ],
  template: `
    <div class="px-4 py-8 bg-gradient-mesh min-h-screen flex justify-center">
      <div class="w-full max-w-4xl">
        <!-- Header -->
        <div class="flex items-center justify-between mb-8">
          <div>
            <app-glass-button variant="ghost" (onClick)="goBack()">
              <i class="bi bi-arrow-left"></i> Voltar
            </app-glass-button>
          </div>
          <h1 class="text-3xl font-bold text-neutral-900 tracking-tight">
            {{ isEditMode ? 'Editar Paciente' : 'Novo Paciente' }}
          </h1>
        </div>

        <form [formGroup]="form" (ngSubmit)="onSubmit()">
          <!-- Photo & Basic Info -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <!-- Photo Upload Card -->
            <app-glass-card
              class="md:col-span-1 flex flex-col items-center justify-center text-center"
            >
              <div class="relative w-32 h-32 mb-4">
                <img
                  [src]="photoPreview || 'assets/images/default-avatar.png'"
                  class="w-full h-full rounded-full object-cover border-4 border-white shadow-lg"
                  alt="Patient Photo"
                />
                <button
                  type="button"
                  class="absolute bottom-0 right-0 bg-primary-500 text-white rounded-full p-2 shadow-md hover:bg-primary-600 transition-colors"
                  (click)="fileInput.click()"
                >
                  <i class="bi bi-camera-fill"></i>
                </button>
                <input
                  #fileInput
                  type="file"
                  hidden
                  accept="image/*"
                  (change)="onFileSelected($event)"
                />
              </div>
              <p class="text-sm text-neutral-500 font-medium">
                {{ isEditMode ? 'Atualizar Foto' : 'Adicionar Foto' }}
              </p>
            </app-glass-card>

            <!-- Main Identity -->
            <app-glass-card class="md:col-span-2">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="form-group col-span-2">
                  <label class="block text-sm font-semibold text-neutral-700 mb-1"
                    >Nome Completo *</label
                  >
                  <input
                    type="text"
                    formControlName="name"
                    class="form-input w-full rounded-xl border-neutral-200 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div class="form-group">
                  <label class="block text-sm font-semibold text-neutral-700 mb-1">CPF *</label>
                  <input
                    type="text"
                    formControlName="cpf"
                    class="form-input w-full rounded-xl border-neutral-200 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div class="form-group">
                  <label class="block text-sm font-semibold text-neutral-700 mb-1"
                    >Data de Nascimento *</label
                  >
                  <input
                    type="date"
                    formControlName="birthDate"
                    class="form-input w-full rounded-xl border-neutral-200 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div class="form-group">
                  <label class="block text-sm font-semibold text-neutral-700 mb-1">Gênero *</label>
                  <select
                    formControlName="gender"
                    class="form-select w-full rounded-xl border-neutral-200 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="male">Masculino</option>
                    <option value="female">Feminino</option>
                    <option value="other">Outro</option>
                  </select>
                </div>
                <div class="form-group">
                  <label class="block text-sm font-semibold text-neutral-700 mb-1"
                    >Tipo Sanguíneo</label
                  >
                  <select
                    formControlName="bloodType"
                    class="form-select w-full rounded-xl border-neutral-200 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="">Selecione</option>
                    <option *ngFor="let type of bloodTypes" [value]="type">{{ type }}</option>
                  </select>
                </div>
              </div>
            </app-glass-card>
          </div>

          <!-- Contact & Address -->
          <app-glass-card class="mb-6" header="Contato e Endereço">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div class="form-group">
                <label class="block text-sm font-semibold text-neutral-700 mb-1">Email *</label>
                <input
                  type="email"
                  formControlName="email"
                  class="form-input w-full rounded-xl border-neutral-200 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              <div class="form-group">
                <label class="block text-sm font-semibold text-neutral-700 mb-1">Telefone</label>
                <input
                  type="tel"
                  formControlName="phone"
                  class="form-input w-full rounded-xl border-neutral-200 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              <div class="form-group col-span-2">
                <label class="block text-sm font-semibold text-neutral-700 mb-1">Endereço</label>
                <input
                  type="text"
                  formControlName="address"
                  class="form-input w-full rounded-xl border-neutral-200 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              <div class="form-group">
                <label class="block text-sm font-semibold text-neutral-700 mb-1">Cidade</label>
                <input
                  type="text"
                  formControlName="city"
                  class="form-input w-full rounded-xl border-neutral-200 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              <div class="form-group">
                <label class="block text-sm font-semibold text-neutral-700 mb-1">Estado</label>
                <input
                  type="text"
                  formControlName="state"
                  class="form-input w-full rounded-xl border-neutral-200 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>
          </app-glass-card>

          <!-- Health & Insurance -->
          <app-glass-card class="mb-6" header="Informações de Saúde e Convênio">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <!-- Insurance -->
              <div class="space-y-4">
                <h4 class="font-semibold text-primary-700">Convênio</h4>
                <div class="form-group">
                  <label class="block text-sm font-semibold text-neutral-700 mb-1"
                    >Plano de Saúde</label
                  >
                  <input
                    type="text"
                    formControlName="insurancePlan"
                    class="form-input w-full rounded-xl border-neutral-200 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div class="form-group">
                  <label class="block text-sm font-semibold text-neutral-700 mb-1"
                    >Número da Carteirinha</label
                  >
                  <input
                    type="text"
                    formControlName="insuranceNumber"
                    class="form-input w-full rounded-xl border-neutral-200 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>

              <!-- Habits -->
              <div class="space-y-4">
                <h4 class="font-semibold text-primary-700">Hábitos e Histórico</h4>
                <div class="flex flex-col gap-3">
                  <label
                    class="flex items-center gap-3 p-3 rounded-lg border border-neutral-200 hover:bg-neutral-50 transition-colors cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      formControlName="isOrganDonor"
                      class="form-checkbox w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
                    />
                    <span class="text-sm font-medium text-neutral-700">Doador de Órgãos</span>
                  </label>
                  <label
                    class="flex items-center gap-3 p-3 rounded-lg border border-neutral-200 hover:bg-neutral-50 transition-colors cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      formControlName="smoker"
                      class="form-checkbox w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
                    />
                    <span class="text-sm font-medium text-neutral-700">Fumante</span>
                  </label>
                  <label
                    class="flex items-center gap-3 p-3 rounded-lg border border-neutral-200 hover:bg-neutral-50 transition-colors cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      formControlName="alcoholConsumption"
                      class="form-checkbox w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
                    />
                    <span class="text-sm font-medium text-neutral-700">Consome Álcool</span>
                  </label>
                  <label
                    class="flex items-center gap-3 p-3 rounded-lg border border-neutral-200 hover:bg-neutral-50 transition-colors cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      formControlName="receivedTransfusion10Years"
                      class="form-checkbox w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
                    />
                    <span class="text-sm font-medium text-neutral-700"
                      >Recebeu Transfusão (últimos 10 anos)</span
                    >
                  </label>
                </div>

                <div class="form-group mt-4">
                  <label class="block text-sm font-semibold text-neutral-700 mb-1"
                    >Nível de Atividade Física</label
                  >
                  <select
                    formControlName="activityLevel"
                    class="form-select w-full rounded-xl border-neutral-200 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option [value]="0">Baixo (Sedentário)</option>
                    <option [value]="1">Médio (Moderado)</option>
                    <option [value]="2">Alto (Intenso)</option>
                  </select>
                </div>
              </div>
            </div>
          </app-glass-card>

          <!-- Actions -->
          <div class="flex justify-end gap-4 mb-10">
            <app-glass-button variant="ghost" (onClick)="goBack()">Cancelar</app-glass-button>
            <app-glass-button
              variant="primary"
              type="submit"
              [disabled]="form.invalid || isLoading"
            >
              {{ isLoading ? 'Salvando...' : 'Salvar Paciente' }}
            </app-glass-button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [
    `
      .form-input,
      .form-select,
      .form-checkbox {
        @apply transition-shadow duration-200;
      }
    `,
  ],
})
export class PatientFormComponent implements OnInit {
  form: FormGroup;
  isEditMode = false;
  patientId: string | null = null;
  isLoading = false;
  photoPreview: string | null = null;
  selectedFile: File | null = null;

  bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  constructor(
    private fb: FormBuilder,
    private patientService: PatientService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', Validators.required], // Add mask/validator later
      birthDate: ['', Validators.required],
      gender: ['male', Validators.required],
      bloodType: [''],
      phone: [''],
      address: [''],
      city: [''],
      state: [''],
      insurancePlan: [''],
      insuranceNumber: [''],
      isOrganDonor: [false],
      smoker: [false],
      alcoholConsumption: [false],
      receivedTransfusion10Years: [false],
      activityLevel: [0],
    });
  }

  ngOnInit(): void {
    this.patientId = this.route.snapshot.paramMap.get('id');
    if (this.patientId && this.patientId !== 'new') {
      this.isEditMode = true;
      this.loadPatient(this.patientId);
    }
  }

  loadPatient(id: string) {
    this.isLoading = true;
    this.patientService.getById(id).subscribe({
      next: (patient) => {
        this.form.patchValue(patient);
        if (patient.photoUrl) {
          // Assuming backend serves uploads at /uploads or we need a helper
          // For now assuming relative path to domain
          this.photoPreview = `http://localhost:3000${patient.photoUrl}`;
        }
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        // Handle error toast
      },
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.photoPreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.form.invalid) return;

    this.isLoading = true;
    const patientData = this.form.value;

    const request$: Observable<string | any> =
      this.isEditMode && this.patientId
        ? this.patientService.update(this.patientId, patientData)
        : this.patientService.create(patientData);

    request$.subscribe({
      next: (result: string | any) => {
        const id = this.isEditMode ? this.patientId : result;

        if (this.selectedFile && id) {
          this.patientService.uploadPhoto(id, this.selectedFile).subscribe({
            next: () => this.finish(),
            error: () => this.finish(), // Finish anyway
          });
        } else {
          this.finish();
        }
      },
      error: (err: any) => {
        console.error(err);
        this.isLoading = false;
      },
    });
  }

  finish() {
    this.isLoading = false;
    this.router.navigate(['/dashboard/patients']);
  }

  goBack() {
    this.router.navigate(['/dashboard/patients']);
  }
}
