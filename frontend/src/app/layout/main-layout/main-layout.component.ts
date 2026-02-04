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
    <div class="layout-container">
      <app-sidebar class="sidebar"></app-sidebar>
      <div class="main-content">
        <app-header class="header"></app-header>
        <div class="content-body">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
  `,
  styles: [`
    @import '../../../variables';

    .layout-container {
      display: flex;
      height: 100vh;
      overflow: hidden;
      background-color: $background-basic;
    }

    .sidebar {
      width: 16rem; /* 256px */
      background-color: $background-card;
      border-right: 1px solid $border-basic;
      height: 100%;
      z-index: 1000;
      transition: width 0.3s ease;

      /* Mobile responsive behavior could go here */
    }

    .main-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      height: 100%;
      min-width: 0; /* Prevent flex overflow */
    }

    .header {
      height: 4.75rem; /* ~76px matching ngx-admin */
      background-color: $background-card;
      border-bottom: 1px solid $border-basic;
      z-index: 900;
    }

    .content-body {
      flex: 1;
      overflow-y: auto;
      padding: 0; /* Remove global padding */
    }
  `]
})
export class MainLayoutComponent {}
