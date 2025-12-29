import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../../auth.service';

import { LanguageSelectorComponent } from '../language-selector/language-selector.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, LanguageSelectorComponent, TranslateModule],
  template: `
    <div class="header-container">
      <div class="logo-area">
        <span class="logo">Prontuário</span>
      </div>

      <div class="user-actions">
        <!-- Language Selector -->
        <app-language-selector></app-language-selector>

        <!-- Notification Bell (Placeholder) -->
        <button class="icon-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
        </button>

        <div class="user-profile" (click)="logout()">
          <div class="user-info">
            <span class="user-name">Dr. Claudio</span>
            <span class="user-role">Physician</span>
          </div>
          <div class="user-avatar">
            <span>DC</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    @import '../../../../variables';

    .header-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 100%;
      padding: 0 1.5rem;
    }

    .logo {
      font-size: 1.5rem;
      font-weight: 700;
      color: $text-basic;
    }

    .user-actions {
      display: flex;
      align-items: center;
      gap: 1.5rem;
    }

    .icon-btn {
      background: none;
      border: none;
      color: $text-hint;
      cursor: pointer;
      padding: 0.5rem;
      border-radius: 50%;
      transition: background-color 0.2s;

      &:hover {
        background-color: $background-basic;
        color: $primary-500;
      }
    }

    .user-profile {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      cursor: pointer;
      padding: 0.25rem;
      border-radius: $border-radius;
      transition: background-color 0.2s;

      &:hover {
        background-color: $background-basic;
      }
    }

    .user-info {
      display: flex;
      flex-direction: column;
      align-items: flex-end;

      .user-name {
        font-weight: 600;
        font-size: 0.9rem;
        color: $text-basic;
      }

      .user-role {
        font-size: 0.75rem;
        color: $text-hint;
      }

      @media (max-width: 576px) {
        display: none;
      }
    }

    .user-avatar {
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 50%;
      background-color: $primary-100;
      color: $primary-500;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 0.9rem;
    }
  `]
})
export class HeaderComponent {
  constructor(private authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
