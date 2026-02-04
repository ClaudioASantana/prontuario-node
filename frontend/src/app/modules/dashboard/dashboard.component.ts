import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <div class="dashboard-container">
      <!-- Header Section -->
      <div class="dashboard-header">
        <div>
          <h1 class="welcome-title">
            {{ 'DASHBOARD.TITLE' | translate }}
            <span class="subtitle">{{ today | date: 'EEEE, d MMMM' }}</span>
          </h1>
          <p class="welcome-subtitle">Visão geral da sua clínica hoje.</p>
        </div>
        <div class="header-actions">
          <button class="btn-secondary"><i class="bi bi-calendar3"></i> Ver Agenda</button>
          <button class="btn-primary"><i class="bi bi-plus-lg"></i> Novo Atendimento</button>
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="icon-wrapper bg-blue">
            <i class="bi bi-people-fill"></i>
          </div>
          <div class="stat-info">
            <span class="value">1,245</span>
            <span class="label">{{ 'DASHBOARD.STATS.PATIENTS' | translate }}</span>
          </div>
          <div class="stat-trend positive"><i class="bi bi-arrow-up-short"></i> 12%</div>
        </div>

        <div class="stat-card">
          <div class="icon-wrapper bg-teal">
            <i class="bi bi-calendar-check"></i>
          </div>
          <div class="stat-info">
            <span class="value">28</span>
            <span class="label">{{ 'DASHBOARD.STATS.APPOINTMENTS' | translate }}</span>
          </div>
          <div class="stat-trend neutral"><i class="bi bi-dash"></i> 0%</div>
        </div>

        <div class="stat-card">
          <div class="icon-wrapper bg-rose">
            <i class="bi bi-list-task"></i>
          </div>
          <div class="stat-info">
            <span class="value">12</span>
            <span class="label">{{ 'DASHBOARD.STATS.TASKS' | translate }}</span>
          </div>
          <div class="stat-trend negative">
            <i class="bi bi-exclamation-circle"></i> 3 pendentes
          </div>
        </div>
      </div>

      <!-- Main Content Grid -->
      <div class="content-grid">
        <!-- Agenda Section -->
        <div class="content-card agenda-card">
          <div class="card-header">
            <h3>Agenda do Dia</h3>
            <button class="btn-icon"><i class="bi bi-three-dots"></i></button>
          </div>
          <div class="card-body">
            <ul class="agenda-list">
              <li *ngFor="let apt of appointments" class="agenda-item">
                <div class="time-col">
                  <span class="time">{{ apt.time }}</span>
                </div>
                <div class="info-col">
                  <span class="patient-name">{{ apt.patient }}</span>
                  <span class="apt-type">{{ apt.type }}</span>
                </div>
                <div class="status-col">
                  <span class="status-badge" [ngClass]="apt.status">
                    {{ apt.status }}
                  </span>
                </div>
                <div class="action-col">
                  <button class="btn-icon-sm"><i class="bi bi-chevron-right"></i></button>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <!-- Tasks / Quick Actions Section -->
        <div class="side-column">
          <div class="content-card tasks-card">
            <div class="card-header">
              <h3>Pendências</h3>
            </div>
            <div class="card-body">
              <ul class="task-list">
                <li *ngFor="let task of tasks" class="task-item">
                  <div class="task-check">
                    <input type="checkbox" />
                  </div>
                  <div class="task-info">
                    <span class="task-title">{{ task.title }}</span>
                    <span class="task-due text-{{ task.priority }}">{{ task.due }}</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div class="content-card quick-actions">
            <h3>Acesso Rápido</h3>
            <div class="actions-grid">
              <button class="action-item">
                <i class="bi bi-file-earmark-medical"></i>
                <span>Prontuário</span>
              </button>
              <button class="action-item">
                <i class="bi bi-capsule"></i>
                <span>Prescrição</span>
              </button>
              <button class="action-item">
                <i class="bi bi-person-plus"></i>
                <span>Novo Paciente</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      @import '../../../variables';

      .dashboard-container {
        padding: 2rem 2.5rem;
        max-width: 1600px;
        margin: 0 auto;
        min-height: 100%;
      }

      /* Header */
      .dashboard-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        margin-bottom: 2.5rem;
        padding-bottom: 1.5rem;
        border-bottom: 1px solid $border-light;

        .welcome-title {
          font-size: 1.75rem;
          font-weight: 700;
          color: $text-main;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;

          .subtitle {
            font-size: 1rem;
            font-weight: 400;
            color: $text-secondary;
            text-transform: capitalize;
          }
        }

        .welcome-subtitle {
          color: $text-secondary;
          margin-top: 0.5rem;
          font-size: 0.95rem;
        }

        .header-actions {
          display: flex;
          gap: 1rem;
        }
      }

      /* Stats Grid */
      .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 1.5rem;
        margin-bottom: 2.5rem;
      }

      .stat-card {
        background: $background-card;
        border-radius: $border-radius-base;
        padding: 1.5rem;
        box-shadow: $shadow-sm;
        border: 1px solid $border-light;
        display: flex;
        align-items: center;
        gap: 1.25rem;
        transition: all 0.2s;
        position: relative;
        overflow: hidden;

        &:hover {
          transform: translateY(-2px);
          box-shadow: $shadow-md;
        }

        .icon-wrapper {
          width: 3.5rem;
          height: 3.5rem;
          border-radius: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          flex-shrink: 0;

          &.bg-blue {
            background-color: $primary-50;
            color: $primary-600;
          }
          &.bg-teal {
            background-color: rgba(16, 185, 129, 0.1);
            color: #10b981;
          }
          &.bg-rose {
            background-color: rgba(239, 68, 68, 0.1);
            color: #ef4444;
          }
        }

        .stat-info {
          flex-grow: 1;
          display: flex;
          flex-direction: column;

          .value {
            font-size: 1.75rem;
            font-weight: 700;
            color: $text-main;
            line-height: 1.2;
          }
          .label {
            font-size: 0.875rem;
            color: $text-secondary;
            font-weight: 500;
          }
        }

        .stat-trend {
          font-size: 0.85rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.25rem;
          padding: 0.25rem 0.5rem;
          border-radius: 99px;

          &.positive {
            background-color: rgba(16, 185, 129, 0.1);
            color: #10b981;
          }
          &.neutral {
            background-color: $neutral-100;
            color: $text-secondary;
          }
          &.negative {
            background-color: rgba(239, 68, 68, 0.1);
            color: #ef4444;
          }
        }
      }

      /* Content Grid */
      .content-grid {
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: 2rem;

        @media (max-width: 1024px) {
          grid-template-columns: 1fr;
        }
      }

      .side-column {
        display: flex;
        flex-direction: column;
        gap: 2rem;
      }

      .content-card {
        background: $background-card;
        border-radius: $border-radius-base;
        border: 1px solid $border-light;
        box-shadow: $shadow-sm;
        overflow: hidden;

        .card-header {
          padding: 1.25rem 1.5rem;
          border-bottom: 1px solid $border-light;
          display: flex;
          justify-content: space-between;
          align-items: center;

          h3 {
            font-size: 1.125rem;
            font-weight: 600;
            color: $text-main;
            margin: 0;
          }
        }

        .card-body {
          padding: 1.5rem;
        }
      }

      /* Agenda List */
      .agenda-list {
        list-style: none;
        padding: 0;
        margin: 0;

        .agenda-item {
          display: flex;
          align-items: center;
          padding: 1rem 0;
          border-bottom: 1px solid $border-light;

          &:last-child {
            border-bottom: none;
          }

          .time-col {
            width: 80px;
            flex-shrink: 0;
            .time {
              font-weight: 700;
              color: $text-main;
              font-size: 1rem;
            }
          }

          .info-col {
            flex-grow: 1;
            display: flex;
            flex-direction: column;

            .patient-name {
              font-weight: 600;
              color: $text-main;
              font-size: 1rem;
            }
            .apt-type {
              font-size: 0.85rem;
              color: $text-secondary;
            }
          }

          .status-col {
            margin-right: 1rem;
          }

          .status-badge {
            padding: 0.25rem 0.75rem;
            border-radius: 99px;
            font-size: 0.75rem;
            font-weight: 600;
            text-transform: uppercase;

            &.confirmed {
              background: rgba(59, 130, 246, 0.1);
              color: $primary-600;
            }
            &.waiting {
              background: rgba(245, 158, 11, 0.1);
              color: #f59e0b;
            }
            &.pending {
              background: $neutral-100;
              color: $text-secondary;
            }
          }
        }
      }

      /* Task List */
      .task-list {
        list-style: none;
        padding: 0;
        margin: 0;

        .task-item {
          display: flex;
          gap: 0.75rem;
          padding: 0.75rem 0;
          border-bottom: 1px solid $border-light;

          &:last-child {
            border-bottom: none;
          }

          .task-info {
            display: flex;
            flex-direction: column;

            .task-title {
              font-size: 0.95rem;
              color: $text-main;
              line-height: 1.3;
            }
            .task-due {
              font-size: 0.75rem;
              margin-top: 0.25rem;
              font-weight: 500;
            }

            .text-high {
              color: $error;
            }
            .text-medium {
              color: #f59e0b;
            }
            .text-low {
              color: $text-secondary;
            }
          }
        }
      }

      /* Quick Actions */
      .quick-actions {
        padding: 1.5rem;
        h3 {
          font-size: 1rem;
          font-weight: 600;
          margin: 0 0 1rem 0;
          color: $text-secondary;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-size: 0.75rem;
        }
      }

      .actions-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1rem;

        .action-item {
          background: $neutral-50;
          border: 1px solid $border-light;
          border-radius: $border-radius-base;
          padding: 1rem 0.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          transition: all 0.2s;

          i {
            font-size: 1.5rem;
            color: $primary-500;
          }
          span {
            font-size: 0.75rem;
            font-weight: 600;
            color: $text-main;
            text-align: center;
          }

          &:hover {
            background: white;
            border-color: $primary-200;
            transform: translateY(-2px);
            box-shadow: $shadow-sm;
          }
        }
      }

      /* Buttons */
      .btn-primary {
        background: $primary-600;
        color: white;
        border: none;
        padding: 0.75rem 1.25rem;
        border-radius: $border-radius-sm;
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        cursor: pointer;
        box-shadow: $shadow-sm;
        transition: all 0.2s;

        &:hover {
          background: $primary-700;
          transform: translateY(-1px);
          box-shadow: $shadow-md;
        }
      }

      .btn-secondary {
        background: white;
        color: $text-main;
        border: 1px solid $border-light;
        padding: 0.75rem 1.25rem;
        border-radius: $border-radius-sm;
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        cursor: pointer;
        transition: all 0.2s;

        &:hover {
          background: $neutral-50;
          border-color: $neutral-300;
        }
      }

      .btn-icon,
      .btn-icon-sm {
        background: transparent;
        border: none;
        color: $text-secondary;
        cursor: pointer;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s;

        &:hover {
          background: $neutral-100;
          color: $primary-600;
        }
      }

      .btn-icon {
        width: 32px;
        height: 32px;
        font-size: 1.25rem;
      }
      .btn-icon-sm {
        width: 28px;
        height: 28px;
        font-size: 1rem;
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
}
