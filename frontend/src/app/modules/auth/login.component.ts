import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../auth.service';

import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, TranslateModule, RouterModule],
  template: `
    <div class="login-container">
      <div class="login-card">
        <div class="brand-logo">Prontuário</div>
        <h2 class="welcome-text">{{ 'LOGIN.TITLE' | translate }}</h2>
        <p class="sub-text">{{ 'LOGIN.SUBTITLE' | translate }}</p>

        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label for="email">{{ 'LOGIN.EMAIL' | translate }}</label>
            <input
              id="email"
              type="email"
              formControlName="email"
              [placeholder]="'LOGIN.PLACEHOLDER.EMAIL' | translate"
              [class.error]="isFieldInvalid('email')"
            />
          </div>

          <div class="form-group">
            <label for="password">{{ 'LOGIN.PASSWORD' | translate }}</label>
            <div class="password-input">
              <input
                [type]="showPassword ? 'text' : 'password'"
                id="password"
                formControlName="password"
                [placeholder]="'LOGIN.PLACEHOLDER.PASSWORD' | translate"
                [class.error]="isFieldInvalid('password')"
              />
              <button type="button" class="toggle-password" (click)="togglePassword()">
                {{ showPassword ? 'Hide' : 'Show' }}
              </button>
            </div>
          </div>

          <div class="forgot-password">
            <a href="#">{{ 'LOGIN.FORGOT_PASSWORD' | translate }}</a>
          </div>

          <button type="submit" class="btn-primary" [disabled]="loginForm.invalid || isLoading">
            {{ isLoading ? 'Logging in...' : ('LOGIN.BUTTON' | translate) }}
          </button>

          <div class="register-link">Não tem conta? <a routerLink="/register">Crie agora</a></div>

          <div *ngIf="errorMessage" class="error-message">
            {{ errorMessage }}
          </div>
        </form>

        <div class="footer">
          <p>{{ 'LOGIN.COPYRIGHT' | translate }}</p>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      @import '../../../variables';

      .login-container {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        background-color: $background-page;
        background-image:
          radial-gradient(at 0% 0%, hsla(253, 16%, 7%, 1) 0, transparent 50%),
          radial-gradient(at 50% 0%, hsla(225, 39%, 30%, 1) 0, transparent 50%),
          radial-gradient(at 100% 0%, hsla(339, 49%, 30%, 1) 0, transparent 50%);
        background-size: cover;
        position: relative;
        overflow: hidden;

        /* Mesh Gradient decorative blur (optional) */
        &::before {
          content: '';
          position: absolute;
          width: 120%;
          height: 120%;
          background:
            radial-gradient(circle at 15% 50%, rgba($primary-400, 0.15), transparent 25%),
            radial-gradient(circle at 85% 30%, rgba($primary-600, 0.15), transparent 25%);
          filter: blur(60px);
          z-index: 0;
        }
      }

      .login-card {
        position: relative;
        z-index: 10;
        background: rgba(255, 255, 255, 0.85); /* Glass base */
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        border: 1px solid rgba(255, 255, 255, 0.5);
        padding: 3rem 2.5rem;
        border-radius: $border-radius-base;
        box-shadow: $shadow-xl;
        width: 100%;
        max-width: 420px;
        text-align: center;
      }

      .brand-logo {
        font-size: 1.75rem;
        font-weight: 800; /* Extra bold */
        letter-spacing: -0.025em;
        background: linear-gradient(135deg, $primary-600, $primary-800);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        margin-bottom: 2rem;
      }

      .welcome-text {
        font-size: 1.5rem;
        font-weight: 700;
        color: $text-main;
        margin-bottom: 0.5rem;
        letter-spacing: -0.025em;
      }

      .sub-text {
        color: $text-secondary;
        margin-bottom: 2.5rem;
        font-size: 0.95rem;
      }

      .form-group {
        text-align: left;
        margin-bottom: 1.5rem;

        label {
          display: block;
          font-size: 0.85rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: $text-main;
        }

        input {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 1px solid $border-light;
          border-radius: $border-radius-sm;
          font-size: 0.95rem;
          background-color: rgba(255, 255, 255, 0.8);
          outline: none;
          transition: all 0.2s ease-in-out;
          color: $text-main;

          &::placeholder {
            color: $neutral-400;
          }

          &:focus {
            background-color: #fff;
            border-color: $primary;
            box-shadow: 0 0 0 3px rgba($primary, 0.1); /* Focus ring */
          }

          &.error {
            border-color: $error;
            &:focus {
              box-shadow: 0 0 0 3px rgba($error, 0.1);
            }
          }
        }
      }

      .password-input {
        position: relative;

        .toggle-password {
          position: absolute;
          right: 1rem;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: $neutral-400;
          cursor: pointer;
          font-size: 0.85rem;
          font-weight: 600;
          transition: color 0.2s;

          &:hover {
            color: $primary;
          }
        }
      }

      .forgot-password {
        text-align: right;
        margin-bottom: 1.5rem;

        a {
          color: $primary;
          text-decoration: none;
          font-size: 0.85rem;
          font-weight: 500;
          transition: color 0.2s;

          &:hover {
            color: $primary-hover;
            text-decoration: underline;
          }
        }
      }

      .btn-primary {
        width: 100%;
        padding: 0.875rem;
        background-color: $primary;
        color: white;
        border: none;
        border-radius: $border-radius-sm;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s;
        box-shadow: $shadow-sm;

        &:hover:not(:disabled) {
          background-color: $primary-hover;
          transform: translateY(-1px);
          box-shadow: $shadow-md;
        }

        &:active:not(:disabled) {
          transform: translateY(0);
        }

        &:disabled {
          background-color: $neutral-300;
          cursor: not-allowed;
          box-shadow: none;
        }
      }

      .error-message {
        color: $error;
        margin-top: 1rem;
        font-size: 0.85rem;
        background-color: rgba($error, 0.1);
        padding: 0.75rem;
        border-radius: $border-radius-sm;
      }

      .footer {
        margin-top: 2.5rem;
        color: $text-secondary;
        font-size: 0.75rem;
      }

      .register-link {
        margin-top: 1.5rem;
        font-size: 0.9rem;
        color: $text-secondary;

        a {
          color: $primary;
          text-decoration: none;
          font-weight: 600;
          transition: color 0.2s;

          &:hover {
            color: $primary-hover;
            text-decoration: underline;
          }
        }
      }
    `,
  ],
})
export class LoginComponent {
  loginForm: FormGroup;
  showPassword = false;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  isFieldInvalid(field: string): boolean {
    const control = this.loginForm.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    this.isLoading = true;
    this.errorMessage = '';

    const { email, password } = this.loginForm.value;

    this.authService.login({ email, password }).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/']); // Redirect to dashboard
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.message || 'Login failed. Please check your credentials.';
      },
    });
  }
}
