import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <!-- Page Header -->
    <div class="page-header">
      <h1 class="page-title">{{ 'DASHBOARD.TITLE' | translate }}</h1>
      <div class="breadcrumb">{{ 'DASHBOARD.BREADCRUMB' | translate }}</div>
    </div>

    <!-- Stats Cards -->
    <div class="stats-grid">
      <div class="card stat-card">
        <div class="stat-icon primary-light">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
        </div>
        <div class="stat-content">
          <span class="stat-label">{{ 'DASHBOARD.STATS.PATIENTS' | translate }}</span>
          <span class="stat-value">1,245</span>
          <span class="stat-hint text-success">{{ 'DASHBOARD.STATS.HINT_PATIENTS' | translate }}</span>
        </div>
      </div>

      <div class="card stat-card">
        <div class="stat-icon info-light">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
        </div>
        <div class="stat-content">
          <span class="stat-label">{{ 'DASHBOARD.STATS.APPOINTMENTS' | translate }}</span>
          <span class="stat-value">28</span>
          <span class="stat-hint">{{ 'DASHBOARD.STATS.HINT_APPOINTMENTS' | translate }}</span>
        </div>
      </div>

      <div class="card stat-card">
        <div class="stat-icon warning-light">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
        </div>
        <div class="stat-content">
          <span class="stat-label">{{ 'DASHBOARD.STATS.TASKS' | translate }}</span>
          <span class="stat-value">12</span>
          <span class="stat-hint text-danger">{{ 'DASHBOARD.STATS.HINT_TASKS' | translate }}</span>
        </div>
      </div>
    </div>

    <!-- Content Grid -->
    <div class="content-grid">
      <div class="card recent-activity">
        <div class="card-header">
          <h3>Recent Activity</h3>
        </div>
        <div class="card-body">
          <ul class="activity-list">
             <li class="activity-item">
              <span class="dot success"></span>
              <div class="activity-text">
                <p>10:30 AM - Patient John Doe profile updated by Dr. Lee</p>
              </div>
            </li>
            <li class="activity-item">
              <span class="dot info"></span>
              <div class="activity-text">
                <p>09:45 AM - Appointment scheduled for Jane Smith</p>
              </div>
            </li>
             <li class="activity-item">
              <span class="dot warning"></span>
              <div class="activity-text">
                <p>09:15 AM - Lab results uploaded for Robert Johnson</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

       <div class="card chart-placeholder">
        <div class="card-header">
          <h3>Appointment Trends (Last 30 Days)</h3>
        </div>
        <div class="card-body centered">
           <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="200" viewBox="0 0 500 200" preserveAspectRatio="none">
             <path d="M0,180 L50,160 L100,100 L150,120 L200,80 L250,90 L300,50 L350,70 L400,30 L450,10 L500,60" fill="none" stroke="#3366ff" stroke-width="3"/>
             <circle cx="0" cy="180" r="4" fill="#3366ff"/>
             <circle cx="50" cy="160" r="4" fill="#3366ff"/>
             <circle cx="100" cy="100" r="4" fill="#3366ff"/>
             <circle cx="150" cy="120" r="4" fill="#3366ff"/>
             <circle cx="200" cy="80" r="4" fill="#3366ff"/>
             <circle cx="250" cy="90" r="4" fill="#3366ff"/>
             <circle cx="300" cy="50" r="4" fill="#3366ff"/>
             <circle cx="350" cy="70" r="4" fill="#3366ff"/>
             <circle cx="400" cy="30" r="4" fill="#3366ff"/>
             <circle cx="450" cy="10" r="4" fill="#3366ff"/>
             <circle cx="500" cy="60" r="4" fill="#3366ff"/>
              <!-- Grid lines -->
            <line x1="0" y1="200" x2="500" y2="200" stroke="#eee" stroke-width="1"/>
            <line x1="0" y1="150" x2="500" y2="150" stroke="#eee" stroke-width="1"/>
             <line x1="0" y1="100" x2="500" y2="100" stroke="#eee" stroke-width="1"/>
              <line x1="0" y1="50" x2="500" y2="50" stroke="#eee" stroke-width="1"/>
           </svg>
        </div>
      </div>
    </div>
  `,
  styles: [`
    @import '../../../variables';

    .page-header {
      margin-bottom: 2rem;

      .page-title {
        font-size: 1.5rem;
        color: $text-basic;
        margin-bottom: 0.25rem;
      }

      .breadcrumb {
        color: $text-hint;
        font-size: 0.85rem;
      }
    }

    .card {
      background: $background-card;
      border-radius: $border-radius;
      padding: 1.5rem;
      box-shadow: $shadow-card;
      border: 1px solid transparent;
      transition: all 0.2s;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 0.75rem 1.5rem 0 rgba(44, 51, 73, 0.15);
      }
    }

    .card-header {
      margin-bottom: 1rem;
      border-bottom: 1px solid $border-basic;
      padding-bottom: 0.75rem;

      h3 {
        font-size: 1rem;
        font-weight: 600;
        color: $text-basic;
        margin: 0;
      }
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .stat-card {
      display: flex;
      align-items: center;
      gap: 1.25rem;
    }

    .stat-icon {
      width: 3.5rem;
      height: 3.5rem;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;

      &.primary-light { background-color: $primary-100; color: $primary-500; }
      &.info-light { background-color: lighten($info, 40%); color: $info; }
      &.warning-light { background-color: lighten($warning, 40%); color: $warning; }
    }

    .stat-content {
      display: flex;
      flex-direction: column;

      .stat-label { color: $text-hint; font-size: 0.85rem; font-weight: 600; }
      .stat-value { color: $text-basic; font-size: 1.5rem; font-weight: 700; line-height: 1.2; }
      .stat-hint { font-size: 0.75rem; margin-top: 0.25rem; }

      .text-success { color: $success; }
      .text-danger { color: $danger; }
    }

    .content-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 1.5rem;
    }

    .activity-list {
      list-style: none;
      padding: 0;
      margin: 0;

      .activity-item {
        display: flex;
        align-items: flex-start;
        padding: 0.75rem 0;
        border-bottom: 1px solid $border-basic;

        &:last-child { border-bottom: none; }

        .dot {
          width: 0.625rem; /* 10px */
          height: 0.625rem;
          border-radius: 50%;
          margin-top: 0.35rem;
          margin-right: 1rem;
          flex-shrink: 0;

          &.success { background-color: $success; }
          &.info { background-color: $info; }
          &.warning { background-color: $warning; }
        }

        .activity-text p {
           margin: 0;
           font-size: 0.9rem;
           color: $text-basic;
        }
      }
    }
  `]
})
export class DashboardComponent {}
