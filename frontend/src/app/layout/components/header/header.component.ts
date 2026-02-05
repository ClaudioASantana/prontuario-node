import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../../auth.service';
import { LanguageSelectorComponent } from '../language-selector/language-selector.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, LanguageSelectorComponent, TranslateModule],
  template: `
    <header class="header-glass">
      <!-- Mobile Menu Toggle -->
      <button class="mobile-menu-btn" (click)="onToggleMenu()">
        <i class="bi bi-list"></i>
      </button>

      <!-- Left side (Empty now as logo is in sidebar) -->
      <div class="header-left"></div>

      <!-- Right side: Actions -->
      <div class="header-right">
        <!-- Language Selector -->
        <app-language-selector></app-language-selector>

        <div class="divider-vertical"></div>

        <!-- Notification Bell (Placeholder) -->
        <button class="icon-btn-glass" title="Notifications">
          <i class="bi bi-bell"></i>
          <span class="notification-badge"></span>
        </button>

        <!-- User Profile -->
        <div class="user-profile-pill" (click)="logout()" title="Sair do sistema">
          <ng-container *ngIf="user$ | async as user; else loadingUser">
            <div class="avatar-ring">
              <div class="avatar-img">
                <span>{{ user.initials }}</span>
              </div>
            </div>
            <div class="user-details">
              <span class="user-name">{{ user.name }}</span>
              <span class="user-role">{{ user.role | translate }}</span>
            </div>
          </ng-container>
          <ng-template #loadingUser>
            <div class="avatar-ring">
              <div class="avatar-img">
                <span>...</span>
              </div>
            </div>
          </ng-template>
        </div>
      </div>
    </header>
  `,
  styles: [
    `
      /* Temporarily removed SCSS - will use Tailwind */

      header {
        display: block;
        padding: 1rem 2rem 0; /* Add top padding so it floats */
        z-index: 50;
        position: relative;
      }

      .header-glass {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: rgba(255, 255, 255, 0.6);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.5);
        border-radius: 20px;
        padding: 0.75rem 1.5rem;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
        transition: all 0.3s ease;

        &:hover {
          background: rgba(255, 255, 255, 0.8);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
      }

      .header-right {
        display: flex;
        align-items: center;
        gap: 1.25rem;
        margin-left: auto; /* Push to right */
      }

      .divider-vertical {
        width: 1px;
        height: 24px;
        background-color: #d4d4d8;
      }

      /* --- Mobile Menu Button --- */
      .mobile-menu-btn {
        display: none;
        width: 40px;
        height: 40px;
        border-radius: 12px;
        border: 1px solid transparent;
        background: rgba(255, 255, 255, 0.5);
        color: #71717a;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.2s;
        font-size: 1.5rem;

        &:hover {
          background: white;
          color: #2563eb;
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
        }

        @media (max-width: 1024px) {
          display: flex;
        }
      }

      /* --- Buttons --- */
      .icon-btn-glass {
        width: 40px;
        height: 40px;
        border-radius: 12px;
        border: 1px solid transparent;
        background: rgba(255, 255, 255, 0.5);
        color: #71717a;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        position: relative;
        transition: all 0.2s;
        font-size: 1.1rem;

        &:hover {
          background: white;
          color: #2563eb;
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
        }

        .notification-badge {
          position: absolute;
          top: 10px;
          right: 10px;
          width: 8px;
          height: 8px;
          background: #ef4444;
          border-radius: 50%;
          border: 2px solid white;
        }
      }

      /* --- User Profile --- */
      .user-profile-pill {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.35rem 0.5rem 0.35rem 0.35rem; /* tight padding */
        border-radius: 99px;
        cursor: pointer;
        transition: all 0.2s;
        border: 1px solid transparent;

        &:hover {
          background: rgba(255, 255, 255, 0.5);
          border-color: rgba(255, 255, 255, 0.8);
        }
      }

      .avatar-ring {
        padding: 2px;
        background: linear-gradient(135deg, #93c5fd, #2563eb);
        border-radius: 50%;
      }

      .avatar-img {
        width: 32px;
        height: 32px;
        background: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        font-size: 0.85rem;
        color: #1d4ed8;
      }

      .user-details {
        display: flex;
        flex-direction: column;
        padding-right: 0.5rem;

        .user-name {
          font-size: 0.9rem;
          font-weight: 600;
          color: #18181b;
          line-height: 1.2;
        }
        .user-role {
          font-size: 0.7rem;
          color: #71717a;
          font-weight: 500;
        }

        @media (max-width: 600px) {
          display: none;
        }
      }
    `,
  ],
})
export class HeaderComponent implements OnInit {
  @Output() toggleMenu = new EventEmitter<void>();
  user$: Observable<any>;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
    this.user$ = this.authService.currentUser$;
  }

  ngOnInit() {}

  onToggleMenu() {
    this.toggleMenu.emit();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
