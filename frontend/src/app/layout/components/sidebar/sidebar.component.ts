import { Component, OnDestroy, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../../auth.service';
import { Subscription } from 'rxjs';

interface MenuItem {
  label: string;
  icon: string;
  route: string;
  roles?: string[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  host: { '[class.open]': 'isOpen' },
  template: `
    <div class="sidebar-glass">
      <!-- Brand Header -->
      <div class="brand-header">
        <div class="logo-icon">P</div>
        <div class="brand-text">
          <span class="brand-title">Prontuário</span>
          <span class="brand-subtitle">Plus</span>
        </div>
      </div>

      <nav class="nav-menu">
        <div class="menu-label">{{ 'MENU.HEADER' | translate }}</div>

        <ng-container *ngFor="let item of visibleMenuItems">
          <a
            [routerLink]="item.route"
            routerLinkActive="active"
            [routerLinkActiveOptions]="{ exact: item.route === '/' }"
            class="menu-item"
          >
            <span class="icon-wrapper" [innerHTML]="item.icon"></span>
            <span class="label">{{ item.label | translate }}</span>
            <div class="active-indicator"></div>
          </a>
        </ng-container>
      </nav>

      <!-- Logout / Profile Summary (Fixed at bottom) -->
      <div class="sidebar-footer">
        <button class="menu-item logout-btn" (click)="logout()">
          <span class="icon-wrapper">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
          </span>
          <span class="label">Sair</span>
        </button>
      </div>
    </div>
  `,
  styles: [
    `
      /* Removed SCSS import */

      :host {
        display: block;
        height: 100%;

        @media (max-width: 1024px) {
          position: fixed;
          top: 0;
          left: 0;
          width: 80%; /* Drawer width */
          max-width: 300px;
          height: 100%;
          z-index: 50;
          transform: translateX(-110%); /* Hidden by default */
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);

          &.open {
            transform: translateX(0); /* Slide in */
          }
        }
      }

      .sidebar-glass {
        height: 100%;
        background: rgba(255, 255, 255, 0.75);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.6);
        border-radius: 24px;
        display: flex;
        flex-direction: column;
        padding: 1.5rem 1rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        z-index: 50;
      }

      /* --- Brand Header --- */
      .brand-header {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.5rem 0.5rem 2rem 0.5rem;
        margin-bottom: 0.5rem;
      }

      .logo-icon {
        width: 40px;
        height: 40px;
        background: linear-gradient(135deg, #2563eb, #1e40af);
        color: white;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 800;
        font-size: 1.5rem;
        box-shadow: 0 4px 10px rgba(#2563eb, 0.3);
      }

      .brand-text {
        display: flex;
        flex-direction: column;

        .brand-title {
          font-weight: 700;
          font-size: 1.1rem;
          color: #18181b;
          letter-spacing: -0.02rem;
        }
        .brand-subtitle {
          font-size: 0.75rem;
          color: #3b82f6;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }
      }

      /* --- Navigation --- */
      .nav-menu {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        flex: 1; /* Takes available space */
        overflow-y: auto; /* Internal scroll if needed */
        min-height: 0; /* Important for flex child scroll */
      }

      .sidebar-footer {
        margin-top: auto;
        padding-top: 1rem;
      }

      .menu-label {
        padding: 0 1rem;
        margin-bottom: 0.5rem;
        font-size: 0.75rem;
        font-weight: 700;
        text-transform: uppercase;
        color: #a1a1aa;
        letter-spacing: 0.05em;
      }

      .menu-item {
        position: relative;
        display: flex;
        align-items: center;
        padding: 0.85rem 1rem;
        border-radius: 16px;
        text-decoration: none;
        color: #71717a;
        font-weight: 500;
        font-size: 0.95rem;
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        overflow: hidden;

        .icon-wrapper {
          display: flex;
          align-items: center;
          width: 24px; /* Fixed width for alignment */
          margin-right: 0.85rem;
          color: #a1a1aa;
          transition: color 0.2s;

          svg {
            width: 20px;
            height: 20px;
          }
        }

        .active-indicator {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 100%;
          background: linear-gradient(90deg, rgba(#3b82f6, 0.1), rgba(#3b82f6, 0.05));
          opacity: 0;
          z-index: -1;
          transition: opacity 0.2s;
        }

        /* Hover State */
        &:hover {
          background-color: rgba(255, 255, 255, 0.6);
          color: #2563eb;
          transform: translateX(4px);

          .icon-wrapper {
            color: #3b82f6;
          }
        }

        /* Active State */
        &.active {
          background-color: white; /* Solid white pop */
          color: #2563eb;
          font-weight: 600;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

          .icon-wrapper {
            color: #3b82f6;
          }

          .active-indicator {
            /* Could use this for a subtle glow instead of solid bg if preferred */
            /* opacity: 1; */
          }
        }
      }

      .logout-btn {
        margin-top: auto;
        background: none;
        border: none;
        width: 100%;
        cursor: pointer;
        color: #ef4444;

        .icon-wrapper {
          color: rgba(#ef4444, 0.7);
        }

        &:hover {
          background-color: rgba(#ef4444, 0.05);
          color: #ef4444;
          .icon-wrapper {
            color: #ef4444;
          }
        }
      }
    `,
  ],
})
export class SidebarComponent implements OnInit, OnDestroy {
  currentUserRole: string | null = null;
  private roleSubscription: Subscription | null = null;

  // Mobile Support
  @Input() isOpen = false;
  @Output() closeMenu = new EventEmitter<void>();

  // SVG strings for icons
  private icons = {
    dashboard:
      '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>',
    patients:
      '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>',
    healthPlans:
      '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
    appointments:
      '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>',
    settings:
      '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>',
  };

  menuItems: MenuItem[] = [
    { label: 'MENU.DASHBOARD', route: '/dashboard', icon: this.icons.dashboard },
    {
      label: 'MENU.PATIENTS',
      route: '/patients',
      icon: this.icons.patients,
    },
    {
      label: 'MENU.APPOINTMENTS',
      route: '/appointments',
      icon: this.icons.appointments,
    },
    {
      label: 'MENU.MEDICAL_RECORDS',
      route: '/medical-records',
      icon: this.icons.healthPlans, // Reuse existing icon or add new one
      roles: ['admin', 'doctor'],
    },
    {
      label: 'MENU.ADMIN',
      route: '/admin',
      icon: this.icons.settings, // Reuse existing icon or add new one
      roles: ['admin'],
    },
  ];

  visibleMenuItems: MenuItem[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.roleSubscription = this.authService.currentUserRole$.subscribe((role) => {
      this.currentUserRole = role;
      this.updateVisibleItems();
    });
  }

  ngOnDestroy(): void {
    if (this.roleSubscription) {
      this.roleSubscription.unsubscribe();
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  private updateVisibleItems(): void {
    if (!this.currentUserRole) {
      this.visibleMenuItems = this.menuItems.filter((item) => !item.roles);
      return;
    }

    this.visibleMenuItems = this.menuItems.filter((item) => {
      if (!item.roles || item.roles.length === 0) {
        return true;
      }
      return item.roles.includes(this.currentUserRole!);
    });
  }
}
