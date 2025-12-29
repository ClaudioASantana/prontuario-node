import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  template: `
    <div class="sidebar-container">
      <nav class="nav-menu">

        <div class="menu-group">
          <span class="group-title">{{ 'MENU.HEADER' | translate }}</span>
        </div>

        <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" class="menu-item">
          <span class="icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
          </span>
          <span class="label">{{ 'MENU.DASHBOARD' | translate }}</span>
        </a>

        <a routerLink="/patients" routerLinkActive="active" class="menu-item">
          <span class="icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
          </span>
          <span class="label">{{ 'MENU.PATIENTS' | translate }}</span>
        </a>

        <a routerLink="/appointments" routerLinkActive="active" class="menu-item">
          <span class="icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
          </span>
          <span class="label">{{ 'MENU.APPOINTMENTS' | translate }}</span>
        </a>

        <a routerLink="/settings" routerLinkActive="active" class="menu-item">
           <span class="icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
          </span>
          <span class="label">{{ 'MENU.SETTINGS' | translate }}</span>
        </a>

      </nav>
    </div>
  `,
  styles: [`
    @import '../../../../variables';

    .sidebar-container {
      height: 100%;
      padding: 1rem 0;
      overflow-y: auto;
    }

    .menu-group {
      padding: 0.75rem 1.5rem 0.5rem;

      .group-title {
        font-size: 0.75rem;
        font-weight: 700;
        color: $text-hint;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }
    }

    .menu-item {
      display: flex;
      align-items: center;
      padding: 0.875rem 1.5rem;
      color: $text-basic;
      text-decoration: none;
      border-left: 4px solid transparent;
      transition: all 0.2s;
      font-weight: 600;
      font-size: 0.95rem;
      cursor: pointer;

      .icon {
        display: flex;
        align-items: center;
        margin-right: 0.75rem;
        color: $text-hint;
        transition: color 0.2s;
      }

      &:hover {
        background-color: $primary-100;
        color: $primary-600;

        .icon {
          color: $primary-600;
        }
      }

      &.active {
        background-color: $primary-100;
        color: $primary-500;
        border-left-color: $primary-500;

        .icon {
          color: $primary-500;
        }
      }
    }
  `]
})
export class SidebarComponent {}
