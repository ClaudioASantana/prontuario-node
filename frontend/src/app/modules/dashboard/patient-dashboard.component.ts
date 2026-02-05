import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { GlassButtonComponent } from '../../shared/components/ui/glass-button.component';
import { GlassCardComponent } from '../../shared/components/ui/glass-card.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-patient-dashboard',
  standalone: true,
  imports: [CommonModule, TranslateModule, GlassButtonComponent, GlassCardComponent, RouterModule],
  template: `
    <div class="dashboard-container">
      <!-- Decorative Background -->
      <div class="mesh-gradient-1"></div>
      <div class="mesh-gradient-2"></div>

      <!-- Main Content -->
      <div class="relative z-10 p-6 md:p-12 max-w-7xl mx-auto">
        <!-- Welcome Header -->
        <header class="flex justify-between items-end mb-12">
          <div>
            <h1
              class="text-3xl md:text-4xl font-extrabold text-neutral-900 tracking-tight flex items-center gap-3"
            >
              Olá, Ana
              <span class="animate-bounce">👋</span>
            </h1>
            <p class="mt-2 text-neutral-500 font-medium flex items-center gap-2">
              <i class="bi bi-shield-check text-primary-500"></i>
              Member since 2024 • Unimed Gold
            </p>
          </div>
          <div class="hidden md:flex gap-4">
            <app-glass-button variant="glass">
              <i class="bi bi-bell"></i>
              <span
                class="absolute top-2 right-3 w-2 h-2 bg-red-500 rounded-full border-2 border-white"
              ></span>
            </app-glass-button>
            <button class="w-12 h-12 rounded-full border-2 border-white shadow-lg overflow-hidden">
              <img
                src="assets/images/default-avatar.png"
                alt="Profile"
                class="w-full h-full object-cover"
              />
            </button>
          </div>
        </header>

        <!-- Bento Grid Layout -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Next Appointment (Large) -->
          <app-glass-card
            class="md:col-span-2 relative overflow-hidden group hover:shadow-2xl transition-all duration-500"
          >
            <div
              class="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity"
            >
              <i class="bi bi-calendar-event text-9xl text-primary-500"></i>
            </div>

            <div class="relative z-10">
              <div class="flex items-center gap-3 mb-6">
                <span
                  class="px-3 py-1 rounded-full bg-primary-100 text-primary-700 text-xs font-bold uppercase tracking-wider"
                  >Próxima Consulta</span
                >
                <span class="text-neutral-400 text-sm font-medium">Em 2 dias</span>
              </div>

              <h2 class="text-2xl font-bold text-neutral-900 mb-2">Cardiologia Check-up</h2>
              <p class="text-neutral-500 mb-8 max-w-md">Dr. Roberto Silva • Clínica Central</p>

              <div class="flex items-center gap-6 mb-8">
                <div
                  class="flex items-center gap-3 bg-white/50 px-4 py-2 rounded-xl backdrop-blur-sm"
                >
                  <i class="bi bi-clock text-primary-500 text-xl"></i>
                  <div>
                    <div class="text-xs text-neutral-400 font-bold uppercase">Horário</div>
                    <div class="font-semibold text-neutral-800">14:30</div>
                  </div>
                </div>
                <div
                  class="flex items-center gap-3 bg-white/50 px-4 py-2 rounded-xl backdrop-blur-sm"
                >
                  <i class="bi bi-geo-alt text-primary-500 text-xl"></i>
                  <div>
                    <div class="text-xs text-neutral-400 font-bold uppercase">Local</div>
                    <div class="font-semibold text-neutral-800">Sala 304</div>
                  </div>
                </div>
              </div>

              <div class="flex gap-4">
                <app-glass-button variant="primary">Confirmar Presença</app-glass-button>
                <app-glass-button variant="ghost">Reagendar</app-glass-button>
              </div>
            </div>
          </app-glass-card>

          <!-- Quick Actions -->
          <div class="grid grid-rows-2 gap-6">
            <app-glass-card
              class="flex flex-col justify-center items-center text-center hover:scale-[1.02] transition-transform cursor-pointer"
            >
              <div
                class="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-400 to-teal-600 text-white flex items-center justify-center text-3xl shadow-lg shadow-teal-500/30 mb-4"
              >
                <i class="bi bi-prescription2"></i>
              </div>
              <h3 class="font-bold text-neutral-900">Minhas Receitas</h3>
              <p class="text-sm text-neutral-500 mt-1">2 ativas</p>
            </app-glass-card>

            <app-glass-card
              class="flex flex-col justify-center items-center text-center hover:scale-[1.02] transition-transform cursor-pointer"
            >
              <div
                class="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-400 to-indigo-600 text-white flex items-center justify-center text-3xl shadow-lg shadow-indigo-500/30 mb-4"
              >
                <i class="bi bi-file-earmark-medical"></i>
              </div>
              <h3 class="font-bold text-neutral-900">Resultados de Exames</h3>
              <p class="text-sm text-neutral-500 mt-1">1 novo resultado</p>
            </app-glass-card>
          </div>

          <!-- Recent Activity List -->
          <app-glass-card class="md:col-span-3">
            <div class="flex justify-between items-center mb-6">
              <h3 class="font-bold text-lg text-neutral-900">Histórico Recente</h3>
              <button class="text-primary-600 text-sm font-semibold hover:underline">
                Ver tudo
              </button>
            </div>
            <div class="space-y-4">
              <div
                class="flex items-center justify-between p-4 rounded-2xl bg-white/40 hover:bg-white/60 transition-colors border border-white/50"
              >
                <div class="flex items-center gap-4">
                  <div
                    class="w-12 h-12 rounded-xl bg-blue-100 text-primary-600 flex items-center justify-center text-xl"
                  >
                    <i class="bi bi-camera-video-fill"></i>
                  </div>
                  <div>
                    <h4 class="font-bold text-neutral-800">Teleconsulta - Dermatologia</h4>
                    <p class="text-xs text-neutral-500">Dra. Juliana Mendes • Ontem</p>
                  </div>
                </div>
                <span class="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold"
                  >Concluído</span
                >
              </div>

              <div
                class="flex items-center justify-between p-4 rounded-2xl bg-white/40 hover:bg-white/60 transition-colors border border-white/50"
              >
                <div class="flex items-center gap-4">
                  <div
                    class="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center text-xl"
                  >
                    <i class="bi bi-capsule"></i>
                  </div>
                  <div>
                    <h4 class="font-bold text-neutral-800">Renovação de Receita</h4>
                    <p class="text-xs text-neutral-500">Solicitação • 15 Jan</p>
                  </div>
                </div>
                <span
                  class="px-3 py-1 rounded-full bg-neutral-100 text-neutral-600 text-xs font-bold"
                  >Processando</span
                >
              </div>
            </div>
          </app-glass-card>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .dashboard-container {
        min-height: 100vh;
        width: 100%;
        position: relative;
        background-color: #fafafa;
        overflow: hidden;
      }
      .mesh-gradient-1 {
        position: absolute;
        top: -10%;
        right: -5%;
        width: 50vw;
        height: 50vw;
        background: radial-gradient(circle, rgba(19, 220, 242, 0.15), rgba(37, 99, 235, 0.05));
        filter: blur(80px);
        border-radius: 50%;
        z-index: 0;
      }
      .mesh-gradient-2 {
        position: absolute;
        bottom: -10%;
        left: -10%;
        width: 60vw;
        height: 60vw;
        background: radial-gradient(circle, rgba(13, 218, 236, 0.1), rgba(255, 255, 255, 0));
        filter: blur(100px);
        border-radius: 50%;
        z-index: 0;
      }
    `,
  ],
})
export class PatientDashboardComponent {
  // Logic to load patient data would go here
}
