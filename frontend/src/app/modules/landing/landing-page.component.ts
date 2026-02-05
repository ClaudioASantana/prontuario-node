import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <div class="min-h-screen bg-[#fafbfc] font-sans selection:bg-primary-100 italic-none">
      <!-- Floating Header -->
      <nav class="fixed top-0 left-0 right-0 z-50 px-4 py-4 pointer-events-none">
        <div
          class="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto bg-white/70 backdrop-blur-md border border-white/50 px-6 py-3 rounded-2xl shadow-sm"
        >
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <i class="bi bi-activity text-white text-xl"></i>
            </div>
            <span class="text-xl font-bold text-neutral-900 tracking-tight">Saúde Digital</span>
          </div>

          <!-- Desktop Nav -->
          <div class="hidden md:flex items-center gap-8 text-neutral-600 font-medium">
            <a href="#pacientes" class="hover:text-primary-600 transition-colors">Pacientes</a>
            <a href="#profissionais" class="hover:text-primary-600 transition-colors"
              >Profissionais</a
            >
            <a href="#clinicas" class="hover:text-primary-600 transition-colors">Clínicas</a>
            <a href="#convenios" class="hover:text-primary-600 transition-colors">Convênios</a>
          </div>

          <div class="flex items-center gap-3">
            <button
              (click)="navigateToLogin('patient')"
              class="px-5 py-2.5 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-all shadow-sm"
            >
              Cadastrar
            </button>
            <button
              (click)="navigateToLogin('patient')"
              class="px-5 py-2.5 bg-neutral-100 text-neutral-800 rounded-xl font-semibold hover:bg-neutral-200 transition-all"
            >
              Entrar
            </button>
          </div>
        </div>
      </nav>

      <!-- Hero Section -->
      <section class="relative pt-32 pb-20 md:pt-48 md:pb-32 px-4 overflow-hidden">
        <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div class="relative order-2 md:order-1">
            <!-- Decorative blob -->
            <div
              class="absolute -top-10 -left-10 w-64 h-64 bg-primary-200/50 rounded-full blur-3xl -z-10"
            ></div>
            <div
              class="glass p-4 rounded-3xl shadow-xl border border-white/80 overflow-hidden transform md:-rotate-2 hover:rotate-0 transition-transform duration-500"
            >
              <div
                class="bg-neutral-100 rounded-2xl h-[400px] flex items-center justify-center overflow-hidden"
              >
                <img
                  src="assets/images/doctor-hero-new.png"
                  alt="Médico profissional"
                  class="w-full h-full object-cover"
                />
                <div
                  class="absolute inset-0 bg-gradient-to-tr from-primary-600/10 to-transparent"
                ></div>
              </div>
            </div>
          </div>

          <div class="order-1 md:order-2 space-y-8">
            <h1
              class="text-5xl md:text-6xl font-black text-neutral-900 leading-[1.1] tracking-tight"
            >
              O prontuário único e <span class="text-primary-600">centralizado no paciente</span>
            </h1>
            <p class="text-lg md:text-xl text-neutral-500 leading-relaxed max-w-lg">
              Uma plataforma em nuvem completa para médicos, clínicas e convênios, garantindo que o
              histórico de saúde esteja sempre onde o paciente estiver. Segurança, agilidade e
              cuidado em um só lugar.
            </p>

            <div class="flex flex-col sm:flex-row gap-4">
              <button
                (click)="navigateToLogin('patient')"
                class="px-8 py-4 bg-primary-600 text-white rounded-2xl font-bold text-lg hover:bg-primary-700 transition-all shadow-lg shadow-primary-500/20 active:scale-95"
              >
                Sou Paciente
              </button>
              <button
                (click)="navigateToLogin('physician')"
                class="px-8 py-4 bg-white text-neutral-800 border-2 border-neutral-100 rounded-2xl font-bold text-lg hover:border-primary-100 hover:bg-primary-50 transition-all active:scale-95"
              >
                Sou Profissional
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Ecosystem Subtitle -->
      <section class="py-12 bg-white">
        <div class="max-w-7xl mx-auto text-center space-y-4">
          <span class="text-primary-600 font-bold tracking-[0.2em] uppercase text-sm"
            >ECOSSISTEMA</span
          >
          <h2 class="text-3xl md:text-4xl font-extrabold text-neutral-900">
            Uma solução completa para todo o ecossistema de saúde
          </h2>
        </div>
      </section>

      <!-- Benefits for Patients -->
      <section id="pacientes" class="px-4 py-20 bg-neutral-50/50">
        <div class="max-w-7xl mx-auto">
          <div class="bg-neutral-100/50 rounded-[40px] p-8 md:p-16">
            <div class="mb-12">
              <h2 class="text-3xl md:text-4xl font-extrabold text-neutral-900 mb-4">
                Benefícios para Pacientes
              </h2>
              <p class="text-neutral-500 text-lg">
                Tenha controle total sobre suas informações médicas e de seus dependentes na palma
                da mão.
              </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div
                class="bg-white p-10 rounded-[32px] shadow-sm hover:shadow-md transition-all group"
              >
                <div
                  class="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center mb-6 group-hover:bg-primary-600 transition-colors"
                >
                  <i class="bi bi-phone text-primary-600 text-xl group-hover:text-white"></i>
                </div>
                <h3 class="text-xl font-bold text-neutral-900 mb-3">Histórico na mão</h3>
                <p class="text-neutral-500 leading-relaxed text-sm">
                  Acesse exames, prescrições e orientações médicas de qualquer lugar do mundo.
                </p>
              </div>

              <div
                class="bg-white p-10 rounded-[32px] shadow-sm hover:shadow-md transition-all group"
              >
                <div
                  class="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center mb-6 group-hover:bg-primary-600 transition-colors"
                >
                  <i class="bi bi-people text-primary-600 text-xl group-hover:text-white"></i>
                </div>
                <h3 class="text-xl font-bold text-neutral-900 mb-3">Gestão de dependentes</h3>
                <p class="text-neutral-500 leading-relaxed text-sm">
                  Centralize o cuidado da saúde de toda a sua família em um único perfil
                  compartilhado.
                </p>
              </div>

              <div
                class="bg-white p-10 rounded-[32px] shadow-sm hover:shadow-md transition-all group"
              >
                <div
                  class="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center mb-6 group-hover:bg-primary-600 transition-colors"
                >
                  <i class="bi bi-shield-check text-primary-600 text-xl group-hover:text-white"></i>
                </div>
                <h3 class="text-xl font-bold text-neutral-900 mb-3">Segurança Máxima</h3>
                <p class="text-neutral-500 leading-relaxed text-sm">
                  Dados protegidos por criptografia de nível bancário e conformidade com a LGPD.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- For Doctors & Clinics -->
      <section id="profissionais" class="px-4 py-20 bg-white">
        <div class="max-w-7xl mx-auto space-y-24">
          <div class="text-center md:text-left">
            <h2 class="text-3xl md:text-4xl font-extrabold text-neutral-900 mb-4">
              Para Médicos e Clínicas
            </h2>
            <p class="text-neutral-500 text-lg max-w-2xl">
              Aumente a eficiência operacional e ofereça um atendimento verdadeiramente
              personalizado.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div
              class="bg-neutral-100 rounded-[40px] h-[400px] flex items-center justify-center overflow-hidden relative shadow-inner group"
            >
              <img
                src="assets/images/physician-working.png"
                alt="Médico trabalhando"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div
                class="absolute bottom-10 left-10 p-6 bg-white/90 backdrop-blur rounded-2xl border border-white/50 shadow-lg"
              >
                <div class="flex items-center gap-3 mb-2">
                  <i class="bi bi-eye-fill text-primary-600"></i>
                  <span class="font-bold text-neutral-900">Visão 360º do Paciente</span>
                </div>
                <p class="text-xs text-neutral-500 leading-relaxed">
                  Acesse o histórico completo compartilhado por outros profissionais e evite exames
                  desnecessários.
                </p>
              </div>
            </div>

            <div
              class="bg-neutral-100 rounded-[40px] h-[400px] flex items-center justify-center overflow-hidden relative shadow-inner group"
            >
              <img
                src="assets/images/modern-clinic-view.png"
                alt="Ambiente clínico moderno"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div
                class="absolute bottom-10 left-10 p-6 bg-white/90 backdrop-blur rounded-2xl border border-white/50 shadow-lg"
              >
                <div class="flex items-center gap-3 mb-2">
                  <i class="bi bi-chat-square-text-fill text-primary-600"></i>
                  <span class="font-bold text-neutral-900">Comunicação Integrada</span>
                </div>
                <p class="text-xs text-neutral-500 leading-relaxed">
                  Troque informações de forma segura com outros membros da equipe de cuidado do
                  paciente.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- For Clinics -->
      <section
        id="clinicas"
        class="px-4 py-20 bg-secondary-900 text-white overflow-hidden relative"
      >
        <div class="max-w-7xl mx-auto relative z-10">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <div class="space-y-10">
              <div>
                <span class="text-primary-400 font-bold tracking-widest uppercase text-sm"
                  >GESTÃO CORPORATIVA</span
                >
                <h2 class="text-4xl md:text-5xl font-black mt-4 leading-tight">
                  Potencialize sua Clínica ou Hospital
                </h2>
              </div>

              <div class="space-y-6">
                <div
                  class="flex gap-4 items-start p-6 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors"
                >
                  <div
                    class="w-12 h-12 bg-primary-600 rounded-2xl flex items-center justify-center shrink-0"
                  >
                    <i class="bi bi-bar-chart-fill text-xl"></i>
                  </div>
                  <div>
                    <h4 class="font-bold text-lg mb-1">Business Intelligence</h4>
                    <p class="text-neutral-400 text-sm">
                      Dashboards em tempo real para controle de produtividade e faturamento.
                    </p>
                  </div>
                </div>

                <div
                  class="flex gap-4 items-start p-6 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors"
                >
                  <div
                    class="w-12 h-12 bg-primary-600 rounded-2xl flex items-center justify-center shrink-0"
                  >
                    <i class="bi bi-shield-lock-fill text-xl"></i>
                  </div>
                  <div>
                    <h4 class="font-bold text-lg mb-1">Segurança e Permissões</h4>
                    <p class="text-neutral-400 text-sm">
                      Controle rígido de acesso por perfil e log completo de atividades.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div class="relative">
              <div
                class="absolute -top-10 -right-10 w-64 h-64 bg-primary-600/20 rounded-full blur-[80px]"
              ></div>
              <div
                class="bg-secondary-800 p-3 rounded-[3rem] border border-white/10 shadow-2xl overflow-hidden group"
              >
                <div class="rounded-[2.5rem] overflow-hidden h-[450px]">
                  <img
                    src="assets/images/clinic-management.png"
                    alt="Gestão de Clínica"
                    class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                  />
                </div>
              </div>
              <div
                class="absolute -bottom-6 -left-6 p-6 bg-primary-600 rounded-3xl shadow-xl shadow-primary-900/20 animate-fade-in"
              >
                <div class="text-center">
                  <div class="text-2xl font-black italic">+85%</div>
                  <div class="text-[10px] uppercase font-bold tracking-wider opacity-80">
                    Eficiência Operacional
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Abstract background elements -->
        <div
          class="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary-600/5 to-transparent"
        ></div>
      </section>

      <!-- Health Plans (Convênios) -->
      <section id="convenios" class="px-4 py-20 bg-white">
        <div class="max-w-7xl mx-auto">
          <div
            class="bg-gradient-to-br from-secondary-800 to-secondary-900 rounded-[40px] p-8 md:p-20 text-white flex flex-col md:flex-row items-center gap-12 overflow-hidden relative"
          >
            <div class="relative z-10 flex-1 space-y-8">
              <h2 class="text-4xl md:text-5xl font-black leading-tight">Soluções para Convênios</h2>
              <ul class="space-y-4">
                <li class="flex items-center gap-4">
                  <i class="bi bi-check-circle-fill text-primary-400 text-xl"></i>
                  <span class="text-lg opacity-90"
                    >Redução de custos com exames duplicados através do histórico
                    compartilhado.</span
                  >
                </li>
                <li class="flex items-center gap-4">
                  <i class="bi bi-check-circle-fill text-primary-400 text-xl"></i>
                  <span class="text-lg opacity-90"
                    >Melhor acompanhamento de pacientes crônicos e programas de prevenção.</span
                  >
                </li>
                <li class="flex items-center gap-4">
                  <i class="bi bi-check-circle-fill text-primary-400 text-xl"></i>
                  <span class="text-lg opacity-90"
                    >Integração via API com sistemas de autorização e faturamento.</span
                  >
                </li>
              </ul>
              <button
                class="px-8 py-4 bg-white text-secondary-900 rounded-2xl font-bold text-lg hover:bg-neutral-50 transition-all active:scale-95 shadow-xl"
              >
                Solicitar Parceria
              </button>
            </div>
            <div class="relative z-10 flex-1 flex justify-center">
              <div
                class="w-72 h-72 bg-white/10 backdrop-blur-2xl rounded-full flex items-center justify-center animate-bounce-slow overflow-hidden border border-white/20"
              >
                <img
                  src="assets/images/partnership-new.png"
                  alt="Parceria"
                  class="w-full h-full object-cover p-4"
                />
              </div>
            </div>
            <!-- Decorative spheres -->
            <div
              class="absolute -top-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"
            ></div>
            <div
              class="absolute -bottom-20 -left-20 w-80 h-80 bg-primary-400/20 rounded-full blur-3xl"
            ></div>
          </div>
        </div>
      </section>

      <!-- Full Footer -->
      <footer class="px-4 pt-24 pb-12 bg-white border-t border-neutral-100">
        <div class="max-w-7xl mx-auto">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20 text-center md:text-left">
            <div class="space-y-6">
              <div class="flex items-center gap-2 justify-center md:justify-start">
                <div class="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                  <i class="bi bi-activity text-white text-xl"></i>
                </div>
                <span class="text-2xl font-bold text-secondary-900 tracking-tight"
                  >Saúde Digital</span
                >
              </div>
              <p class="text-neutral-500 leading-relaxed text-sm">
                A tecnologia a serviço da vida. Transformando a gestão da saúde através da
                centralidade no paciente.
              </p>
            </div>

            <div class="space-y-6">
              <h4 class="font-bold text-secondary-900 text-lg">Plataforma</h4>
              <ul class="space-y-3 text-neutral-500 text-sm font-medium">
                <li>
                  <a href="#" class="hover:text-primary-600 transition-colors">Como funciona</a>
                </li>
                <li><a href="#" class="hover:text-primary-600 transition-colors">Segurança</a></li>
                <li><a href="#" class="hover:text-primary-600 transition-colors">Preços</a></li>
                <li><a href="#" class="hover:text-primary-600 transition-colors">FAQ</a></li>
              </ul>
            </div>

            <div class="space-y-6">
              <h4 class="font-bold text-secondary-900 text-lg">Legal</h4>
              <ul class="space-y-3 text-neutral-500 text-sm font-medium">
                <li>
                  <a href="#" class="hover:text-primary-600 transition-colors">Termos de Uso</a>
                </li>
                <li>
                  <a href="#" class="hover:text-primary-600 transition-colors">Privacidade</a>
                </li>
                <li><a href="#" class="hover:text-primary-600 transition-colors">LGPD</a></li>
                <li><a href="#" class="hover:text-primary-600 transition-colors">Compliance</a></li>
              </ul>
            </div>

            <div class="space-y-6">
              <h4 class="font-bold text-secondary-900 text-lg">Contato</h4>
              <div class="flex items-center gap-4 justify-center md:justify-start">
                <div
                  class="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-600 hover:bg-primary-600 hover:text-white transition-all cursor-pointer"
                >
                  <i class="bi bi-share"></i>
                </div>
                <div
                  class="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-600 hover:bg-primary-600 hover:text-white transition-all cursor-pointer"
                >
                  <i class="bi bi-envelope"></i>
                </div>
                <div
                  class="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-600 hover:bg-primary-600 hover:text-white transition-all cursor-pointer"
                >
                  <i class="bi bi-telephone"></i>
                </div>
              </div>
              <p class="text-neutral-500 text-sm">contato@saudedigital.com.br</p>
            </div>
          </div>

          <div class="pt-12 border-t border-neutral-100 text-center">
            <p class="text-neutral-400 text-sm font-medium">
              © 2026 Saúde Digital S.A. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  `,
  styles: [
    `
      .animate-fade-in {
        animation: fadeIn 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      }
      .animate-bounce-slow {
        animation: bounceSlow 4s ease-in-out infinite;
      }
      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      @keyframes bounceSlow {
        0%,
        100% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-15px);
        }
      }
      .glass {
        background: rgba(255, 255, 255, 0.7);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
      }
      .shadow-glass {
        box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.07);
      }
      .shadow-glass-lg {
        box-shadow: 0 12px 48px 0 rgba(31, 38, 135, 0.12);
      }
    `,
  ],
})
export class LandingPageComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  navigateToLogin(role: string): void {
    this.router.navigate(['/auth/login', role]);
  }
}
