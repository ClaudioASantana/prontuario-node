import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, TranslateModule],
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
  styles: [`
    @import '../../../variables';

    .login-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background: linear-gradient(135deg, white 0%, #f0f4ff 100%);
    }

    .login-card {
      background: $background-card;
      padding: 3rem 2.5rem;
      border-radius: $border-radius * 2;
      box-shadow: $shadow-card;
      width: 100%;
      max-width: 420px;
      text-align: center;
    }

    .brand-logo {
      font-size: 1.5rem;
      font-weight: 700;
      color: $text-basic;
      margin-bottom: 2rem;
    }

    .welcome-text {
      font-size: 1.25rem;
      font-weight: 600;
      color: $text-basic;
      margin-bottom: 0.5rem;
    }

    .sub-text {
      color: $text-hint;
      margin-bottom: 2rem;
      font-size: 0.9rem;
    }

    .form-group {
      text-align: left;
      margin-bottom: 1.25rem;

      label {
        display: block;
        font-size: 0.85rem;
        font-weight: 600;
        margin-bottom: 0.5rem;
        color: $text-basic;
      }

      input {
        width: 100%;
        padding: 0.75rem 1rem;
        border: 1px solid $border-basic;
        border-radius: $border-radius;
        font-size: 0.95rem;
        outline: none;
        transition: border-color 0.2s;

        &:focus {
          border-color: $primary-500;
        }

        &.error {
          border-color: $danger;
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
        color: $text-hint;
        cursor: pointer;
        font-size: 0.8rem;
      }
    }

    .forgot-password {
      text-align: right;
      margin-bottom: 1.5rem;

      a {
        color: $primary-500;
        text-decoration: none;
        font-size: 0.85rem;
        font-weight: 600;
      }
    }

    .btn-primary {
      width: 100%;
      padding: 0.875rem;
      background-color: $primary-500;
      color: white;
      border: none;
      border-radius: $border-radius;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.2s;

      &:hover:not(:disabled) {
        background-color: $primary-600;
      }

      &:disabled {
        background-color: $primary-300;
        cursor: not-allowed;
      }
    }

    .error-message {
      color: $danger;
      margin-top: 1rem;
      font-size: 0.85rem;
    }

    .footer {
      margin-top: 2.5rem;
      color: $text-hint;
      font-size: 0.75rem;
    }
  `]
})
export class LoginComponent {
  loginForm: FormGroup;
  showPassword = false;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
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
      }
    });
  }
}
