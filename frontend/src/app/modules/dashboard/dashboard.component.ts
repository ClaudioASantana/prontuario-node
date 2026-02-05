import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { GlassButtonComponent } from '../../shared/components/ui/glass-button.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, TranslateModule, GlassButtonComponent],
  template: `
    <div class="dashboard-container">
      <!-- Decorative Background Elements -->
      <div class="mesh-gradient-1"></div>
      <div class="mesh-gradient-2"></div>

      <!-- Main Content -->
      <div class="dashboard-content">
        <!-- Header Section -->
        <header class="dashboard-header">
          <div class="header-text">
            <h1 class="welcome-title">
              {{ 'DASHBOARD.TITLE' | translate }}
              <span class="emoji-wave">👋</span>
            </h1>
            <p class="date-display">
              <i class="bi bi-calendar4-week"></i>
              {{ today | date: 'EEEE, d MMMM' }}
            </p>
          </div>
          <div class="header-actions">
            <app-glass-button variant="glass">
              <i class="bi bi-search"></i>
            </app-glass-button>
            <app-glass-button variant="glass">
              <i class="bi bi-bell"></i>
              <span
                class="notification-dot"
                style="position: absolute; top: 10px; right: 10px; width: 8px; height: 8px; background: #ef4444; border-radius: 50%; border: 2px solid white;"
              ></span>
            </app-glass-button>
            <app-glass-button
              variant="primary"
              label="Novo Atendimento"
              (onClick)="onNewAppointment()"
            >
              <i class="bi bi-plus-lg" icon></i>
            </app-glass-button>
          </div>
        </header>

        <!-- KPI / Stats Grid -->
        <section class="stats-grid">
          <div class="glass-card stat-card">
            <div class="stat-icon-wrapper gradient-blue">
              <i class="bi bi-people-fill"></i>
            </div>
            <div class="stat-details">
              <span class="stat-value">1,245</span>
              <span class="stat-label">{{ 'DASHBOARD.STATS.PATIENTS' | translate }}</span>
            </div>
            <div class="stat-trend positive">
              <i class="bi bi-graph-up-arrow"></i>
              <span>+12%</span>
            </div>
          </div>

          <div class="glass-card stat-card">
            <div class="stat-icon-wrapper gradient-teal">
              <i class="bi bi-calendar-check-fill"></i>
            </div>
            <div class="stat-details">
              <span class="stat-value">28</span>
              <span class="stat-label">{{ 'DASHBOARD.STATS.APPOINTMENTS' | translate }}</span>
            </div>
            <div class="stat-trend neutral">
              <i class="bi bi-dash"></i>
              <span>0%</span>
            </div>
          </div>

          <div class="glass-card stat-card">
            <div class="stat-icon-wrapper gradient-rose">
              <i class="bi bi-clipboard-check-fill"></i>
            </div>
            <div class="stat-details">
              <span class="stat-value">12</span>
              <span class="stat-label">{{ 'DASHBOARD.STATS.TASKS' | translate }}</span>
            </div>
            <div class="stat-trend negative">
              <i class="bi bi-exclamation-circle-fill"></i>
              <span>3 pendentes</span>
            </div>
          </div>
        </section>

        <!-- Main Grid: Agenda & Quick Actions -->
        <section class="main-grid">
          <!-- Left Col: Agenda -->
          <div class="glass-card agenda-section">
            <div class="card-header">
              <h3>
                <i class="bi bi-clock-history text-primary"></i>
                Próximos Atendimentos
              </h3>
              <button class="btn-link">Ver Agenda Completa</button>
            </div>
            <div class="card-body">
              <ul class="agenda-list">
                <li *ngFor="let apt of appointments" class="agenda-item">
                  <div class="time-badge">
                    {{ apt.time }}
                  </div>
                  <div class="agenda-info">
                    <span class="patient-name">{{ apt.patient }}</span>
                    <span class="apt-type">{{ apt.type }}</span>
                  </div>
                  <div class="agenda-status">
                    <span class="status-pill" [ngClass]="apt.status">
                      {{ apt.status }}
                    </span>
                  </div>
                  <button class="btn-icon-action">
                    <i class="bi bi-three-dots-vertical"></i>
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <!-- Right Col: Tasks & Shortcuts -->
          <div class="side-column">
            <!-- Shortcuts / Quick Actions -->
            <div class="glass-card actions-card">
              <div class="card-header">
                <h3>Acesso Rápido</h3>
              </div>
              <div class="actions-grid">
                <button class="action-btn">
                  <div class="icon-box gradient-purple">
                    <i class="bi bi-file-earmark-medical-fill"></i>
                  </div>
                  <span>Prontuário</span>
                </button>
                <button class="action-btn">
                  <div class="icon-box gradient-orange">
                    <i class="bi bi-capsule-pill"></i>
                  </div>
                  <span>Prescrição</span>
                </button>
                <button class="action-btn">
                  <div class="icon-box gradient-green">
                    <i class="bi bi-person-plus-fill"></i>
                  </div>
                  <span>Paciente</span>
                </button>
              </div>
            </div>

            <!-- Pending Tasks -->
            <div class="glass-card tasks-card">
              <div class="card-header">
                <h3>Pendências</h3>
                <span class="badge-count">{{ tasks.length }}</span>
              </div>
              <ul class="task-list">
                <li *ngFor="let task of tasks" class="task-item">
                  <label class="custom-checkbox">
                    <input type="checkbox" />
                    <span class="checkmark"></span>
                  </label>
                  <div class="task-content">
                    <span class="task-text">{{ task.title }}</span>
                    <span class="task-meta" [ngClass]="'priority-' + task.priority">
                      {{ task.due }} • {{ task.priority }}
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  `,
  styles: [
    `
      /* Temporarily removed SCSS import - will migrate to Tailwind later */

      /* --- Animation Keyframes --- */
      @keyframes float {
        0% {
          transform: translateY(0px);
        }
        50% {
          transform: translateY(-10px);
        }
        100% {
          transform: translateY(0px);
        }
      }

      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .dashboard-container {
        position: relative;
        min-height: 100vh;
        overflow: hidden;
        background-color: #fafafa;
        font-family: 'Inter', sans-serif; /* Ensure modern font */
      }

      /* --- Background Ambience --- */
      .mesh-gradient-1,
      .mesh-gradient-2 {
        position: absolute;
        width: 60vw;
        height: 60vw;
        border-radius: 50%;
        filter: blur(80px);
        opacity: 0.15;
        z-index: 0;
      }
      .mesh-gradient-1 {
        top: -10%;
        left: -10%;
        background: radial-gradient(circle, #60a5fa, #bfdbfe);
        animation: float 20s infinite ease-in-out;
      }
      .mesh-gradient-2 {
        bottom: -10%;
        right: -10%;
        background: radial-gradient(circle, #bfdbfe, #93c5fd);
        animation: float 25s infinite ease-in-out reverse;
      }

      .dashboard-content {
        position: relative;
        z-index: 10;
        padding: 2rem 3rem;
        max-width: 1600px;
        margin: 0 auto;
        animation: fadeIn 0.6s ease-out;
      }

      /* --- Header --- */
      .dashboard-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        margin-bottom: 3rem;

        .header-text {
          .welcome-title {
            font-size: 2.5rem;
            font-weight: 800;
            letter-spacing: -0.05rem;
            color: #18181b;
            margin: 0;
            display: flex;
            align-items: center;
            gap: 1rem;

            .emoji-wave {
              font-size: 2rem;
              animation: float 3s infinite ease-in-out;
            }
          }

          .date-display {
            margin-top: 0.5rem;
            font-size: 1.1rem;
            color: #71717a;
            font-weight: 500;
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }
        }

        .header-actions {
          display: flex;
          gap: 1rem;
        }
      }

      /* --- Buttons & Inputs --- */
      .btn-glass {
        width: 48px;
        height: 48px;
        border-radius: 14px;
        border: 1px solid rgba(255, 255, 255, 0.6);
        background: rgba(255, 255, 255, 0.4);
        backdrop-filter: blur(8px);
        color: #18181b;
        font-size: 1.2rem;
        cursor: pointer;
        transition: all 0.2s ease;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;

        &:hover {
          background: rgba(255, 255, 255, 0.7);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }

        .notification-dot {
          position: absolute;
          top: 10px;
          right: 12px;
          width: 8px;
          height: 8px;
          background: #ef4444;
          border-radius: 50%;
          border: 2px solid white;
        }
      }

      .btn-primary-gradient {
        background: linear-gradient(135deg, #2563eb, #3b82f6);
        color: white;
        border: none;
        height: 48px;
        padding: 0 1.5rem;
        border-radius: 14px;
        font-weight: 600;
        font-size: 1rem;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 0 4px 6px rgba(#2563eb, 0.25);

        &:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 8px 15px rgba(#2563eb, 0.35);
        }

        i {
          font-size: 1.2rem;
        }
      }

      /* --- Glass Cards --- */
      .glass-card {
        background: rgba(255, 255, 255, 0.7);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        border: 1px solid rgba(255, 255, 255, 0.8);
        border-radius: 24px;
        box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.05);
        padding: 1.5rem;
        transition:
          transform 0.3s ease,
          box-shadow 0.3s ease;

        &:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px 0 rgba(31, 38, 135, 0.1);
        }
      }

      .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;

        h3 {
          font-size: 1.25rem;
          font-weight: 700;
          color: #18181b;
          margin: 0;
          display: flex;
          align-items: center;
          gap: 0.75rem;

          i {
            font-size: 1.1rem;
          }
        }

        .btn-link {
          background: none;
          border: none;
          color: #2563eb;
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          &:hover {
            text-decoration: underline;
          }
        }
      }

      /* --- Stats Grid --- */
      .stats-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 2rem;
        margin-bottom: 2.5rem;

        @media (max-width: 900px) {
          grid-template-columns: 1fr;
          gap: 1.25rem;
        }
      }

      .stat-card {
        display: flex;
        align-items: center;
        gap: 1.25rem;
        padding: 1.75rem;

        @media (max-width: 768px) {
          padding: 1.25rem;
          gap: 1rem;
        }

        .stat-icon-wrapper {
          width: 64px;
          height: 64px;
          border-radius: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.75rem;
          color: white;

          &.gradient-blue {
            background: linear-gradient(135deg, #3b82f6, #2563eb);
            box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
          }
          &.gradient-teal {
            background: linear-gradient(135deg, #10b981, #059669);
            box-shadow: 0 4px 12px rgba(5, 150, 105, 0.3);
          }
          &.gradient-rose {
            background: linear-gradient(135deg, #f43f5e, #e11d48);
            box-shadow: 0 4px 12px rgba(225, 29, 72, 0.3);
          }
        }

        .stat-details {
          flex: 1;
          display: flex;
          flex-direction: column;

          .stat-value {
            font-size: 2rem;
            font-weight: 800;
            color: #18181b;
            line-height: 1.1;
          }
          .stat-label {
            font-size: 0.9rem;
            color: #71717a;
            font-weight: 500;
          }
        }

        .stat-trend {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          font-size: 0.85rem;
          font-weight: 700;

          &.positive {
            color: #10b981;
            i {
              transform: rotate(45deg);
            }
          }
          &.neutral {
            color: #71717a;
          }
          &.negative {
            color: #f43f5e;
          }
        }
      }

      /* --- Main Grid --- */
      .main-grid {
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: 2rem;

        @media (max-width: 1100px) {
          grid-template-columns: 1fr;
        }
      }

      /* --- Agenda List --- */
      .agenda-list {
        list-style: none;
        padding: 0;
        margin: 0;

        .agenda-item {
          display: flex;
          align-items: center;
          padding: 1rem 0;
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
          position: relative;

          &:last-child {
            border-bottom: none;
          }
          &:hover {
            .btn-icon-action {
              opacity: 1;
            }
          }

          .time-badge {
            background: #f4f4f5;
            color: #18181b;
            padding: 0.5rem 0.75rem;
            border-radius: 10px;
            font-weight: 700;
            font-size: 0.9rem;
            margin-right: 1.25rem;
          }

          .agenda-info {
            flex: 1;
            display: flex;
            flex-direction: column;

            .patient-name {
              font-weight: 600;
              color: #18181b;
              font-size: 1.05rem;
            }
            .apt-type {
              font-size: 0.85rem;
              color: #71717a;
            }
          }

          .status-pill {
            padding: 0.35rem 0.85rem;
            border-radius: 30px;
            font-size: 0.75rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.05em;

            &.confirmed {
              background: rgba(37, 99, 235, 0.1);
              color: #2563eb;
            }
            &.waiting {
              background: rgba(245, 158, 11, 0.1);
              color: #d97706;
            }
            &.pending {
              background: #f4f4f5;
              color: #71717a;
            }
          }

          .btn-icon-action {
            background: none;
            border: none;
            color: #71717a;
            cursor: pointer;
            padding: 0.5rem;
            margin-left: 0.5rem;
            opacity: 0;
            transition: opacity 0.2s;
            &:hover {
              color: #2563eb;
            }
          }
        }
      }

      /* --- Quick Actions --- */
      .side-column {
        display: flex;
        flex-direction: column;
        gap: 2rem;
      }

      .actions-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1rem;

        @media (max-width: 768px) {
          grid-template-columns: repeat(2, 1fr);
          gap: 0.75rem;
        }

        .action-btn {
          background: rgba(255, 255, 255, 0.5);
          border: 1px solid white;
          border-radius: 20px;
          padding: 1.25rem 0.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
          cursor: pointer;
          transition: all 0.2s;

          @media (max-width: 768px) {
            padding: 1rem 0.5rem;
          }

          .icon-box {
            width: 48px;
            height: 48px;
            border-radius: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 1.5rem;
            &.gradient-purple {
              background: linear-gradient(135deg, #8b5cf6, #7c3aed);
            }
            &.gradient-orange {
              background: linear-gradient(135deg, #f97316, #ea580c);
            }
            &.gradient-green {
              background: linear-gradient(135deg, #10b981, #059669);
            }
          }

          span {
            font-size: 0.85rem;
            font-weight: 600;
            color: #18181b;
          }

          &:hover {
            background: white;
            transform: translateY(-4px);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
          }
        }
      }

      /* --- Task List --- */
      .badge-count {
        background: #ef4444;
        color: white;
        font-size: 0.75rem;
        padding: 0.15rem 0.5rem;
        border-radius: 10px;
        font-weight: 700;
      }

      .task-list {
        list-style: none;
        padding: 0;
        margin: 0;

        .task-item {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          padding: 0.85rem 0;
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);

          &:last-child {
            border-bottom: none;
          }

          .custom-checkbox {
            position: relative;
            cursor: pointer;
            width: 20px;
            height: 20px;

            input {
              opacity: 0;
              width: 0;
              height: 0;
              &:checked + .checkmark {
                background-color: #3b82f6;
                border-color: #3b82f6;
                &:after {
                  display: block;
                }
              }
            }
            .checkmark {
              position: absolute;
              top: 0;
              left: 0;
              height: 20px;
              width: 20px;
              border: 2px solid #a1a1aa;
              border-radius: 6px;
              transition: all 0.2s;
              &:after {
                content: '';
                position: absolute;
                display: none;
                left: 6px;
                top: 2px;
                width: 5px;
                height: 10px;
                border: solid white;
                border-width: 0 2px 2px 0;
                transform: rotate(45deg);
              }
            }
          }

          .task-content {
            display: flex;
            flex-direction: column;

            .task-text {
              font-size: 0.95rem;
              color: #18181b;
              font-weight: 500;
            }
            .task-meta {
              font-size: 0.75rem;
              margin-top: 0.25rem;
              font-weight: 600;

              &.priority-high {
                color: #ef4444;
              }
              &.priority-medium {
                color: #f59e0b;
              }
              &.priority-low {
                color: #71717a;
              }
            }
          }
        }
      }
    `,
  ],
})
export class DashboardComponent {
  today = new Date();

  // Mock data for "Today's Agenda"
  appointments = [
    { time: '09:00', patient: 'Ana Silva', type: 'Consulta Inicial', status: 'confirmed' },
    { time: '10:30', patient: 'Carlos Oliveira', type: 'Retorno', status: 'waiting' },
    { time: '14:00', patient: 'Mariana Santos', type: 'Exames', status: 'pending' },
  ];

  // Mock data for "Pending Tasks"
  tasks = [
    { title: 'Revisar exames de João P.', priority: 'high', due: 'Hoje' },
    { title: 'Assinar evolução de Maria C.', priority: 'medium', due: 'Hoje' },
    { title: 'Atualizar estoque', priority: 'low', due: 'Amanhã' },
  ];

  onNewAppointment() {
    console.log('Open new appointment modal');
  }
}
