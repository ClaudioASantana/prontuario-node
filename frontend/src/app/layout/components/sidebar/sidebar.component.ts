import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../../auth.service';
import { Subscription } from 'rxjs';

interface MenuItem {
  label: string;
  icon: string;
  route: string;
  roles?: string[];
  svgPath?: string;
}

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

        <ng-container *ngFor="let item of visibleMenuItems">
          <a [routerLink]="item.route" routerLinkActive="active" [routerLinkActiveOptions]="{exact: item.route === '/'}" class="menu-item">
            <span class="icon" [innerHTML]="item.icon"></span>
            <span class="label">{{ item.label | translate }}</span>
          </a>
        </ng-container>

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
export class SidebarComponent implements OnInit, OnDestroy {
  currentUserRole: string | null = null;
  private roleSubscription: Subscription | undefined;
  visibleMenuItems: MenuItem[] = [];

  // SVG strings for icons
  private icons = {
    dashboard: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>',
    patients: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>',
    healthPlans: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
    appointments: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>',
    settings: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>'
  };

  menuItems: MenuItem[] = [
    { label: 'MENU.DASHBOARD', route: '/', icon: this.icons.dashboard },
    {
      label: 'MENU.PATIENTS',
      route: '/patients',
      icon: this.icons.patients,
      roles: ['admin', 'physician', 'patient']
    },
    {
      label: 'MENU.HEALTH_PLANS',
      route: '/health-plans',
      icon: this.icons.healthPlans,
      roles: ['admin', 'health_plan']
    },
    {
      label: 'MENU.APPOINTMENTS',
      route: '/appointments',
      icon: this.icons.appointments,
      roles: ['admin', 'physician', 'patient']
    },
    {
      label: 'USERS.LIST.TITLE',
      route: '/users',
      icon: this.icons.settings, // Reuse settings icon or add new one
      roles: ['admin']
    },
    { label: 'MENU.SETTINGS', route: '/settings', icon: this.icons.settings }
  ];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.roleSubscription = this.authService.currentUserRole$.subscribe(role => {
      this.currentUserRole = role;
      this.updateVisibleItems();
    });
  }

  ngOnDestroy(): void {
    if (this.roleSubscription) {
      this.roleSubscription.unsubscribe();
    }
  }

  private updateVisibleItems(): void {
    if (!this.currentUserRole) {
      // If no role (e.g. not logged in, or error), maybe show nothing or just public?
      // For now, assuming logged in user always has a role or if null show only public
      this.visibleMenuItems = this.menuItems.filter(item => !item.roles);
      return;
    }

    this.visibleMenuItems = this.menuItems.filter(item => {
      if (!item.roles || item.roles.length === 0) {
        return true; // Available to all
      }
      return item.roles.includes(this.currentUserRole!);
    });
  }
}
