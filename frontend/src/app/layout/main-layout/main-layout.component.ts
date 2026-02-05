import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../components/header/header.component';
import { SidebarComponent } from '../components/sidebar/sidebar.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, SidebarComponent],
  template: `
    <div class="layout-wrapper">
      <!-- Global Background (if not handled by individual pages, provides a base) -->
      <div class="global-mesh-bg"></div>

      <div class="layout-container">
        <!-- Backdrop for mobile -->
        <div class="sidebar-backdrop" *ngIf="isMobileMenuOpen" (click)="toggleMobileMenu()"></div>

        <aside class="sidebar-wrapper" [class.mobile-open]="isMobileMenuOpen">
          <app-sidebar [isOpen]="isMobileMenuOpen" (closeMenu)="toggleMobileMenu()"></app-sidebar>
        </aside>

        <div class="main-content">
          <!-- Header is floating now -->
          <app-header (toggleMenu)="toggleMobileMenu()"></app-header>

          <div class="content-body">
            <router-outlet></router-outlet>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      @import '../../../variables';

      .layout-wrapper {
        position: relative;
        height: 100vh;
        overflow: hidden;
        background-color: $background-page;
      }

      .layout-container {
        position: relative;
        display: flex;
        height: 100%;
        z-index: 10; /* Above background */
      }

      .sidebar-wrapper {
        width: 17rem; /* Slightly wider for modern feel */
        height: 100%;
        flex-shrink: 0;
        padding: 1rem; /* Gap for floating effect */
        padding-right: 0; /* Attach to content or keep gap? Let's try gap */

        @media (max-width: $tablet) {
          width: 0;
          padding: 0;
        }
      }

      /* Mobile Sidebar Overlay (Backdrop) */
      .sidebar-backdrop {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.4);
        backdrop-filter: blur(4px);
        z-index: 40; /* Behind sidebar (50) but above content */
        animation: fadeIn 0.3s ease;
      }

      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }

      .main-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        height: 100%;
        min-width: 0;
        position: relative;
        overflow: hidden;
      }

      .content-body {
        flex: 1;
        overflow-y: auto;
        height: 100%;
        /* removed padding to let dashboard handle full width/height */
      }
    `,
  ],
})
export class MainLayoutComponent {
  isMobileMenuOpen = false;

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}
