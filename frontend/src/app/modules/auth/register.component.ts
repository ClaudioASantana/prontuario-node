import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, TranslateModule, RouterModule],
  template: `
    <div class="register-container">
      <div class="register-card">
        <div class="brand-logo">Prontuário</div>
        <h2 class="welcome-text">Criar Conta</h2>
        <p class="sub-text">Preencha os dados abaixo para se cadastrar</p>

        <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label for="name">Nome Completo</label>
            <input
              id="name"
              type="text"
              formControlName="name"
              placeholder="Seu nome completo"
              [class.error]="isFieldInvalid('name')"
            />
            <div *ngIf="isFieldInvalid('name')" class="error-hint">Nome é obrigatório</div>
          </div>

          <div class="form-group">
            <label for="email">Email</label>
            <input
              id="email"
              type="email"
              formControlName="email"
              placeholder="seu@email.com"
              [class.error]="isFieldInvalid('email')"
            />
            <div *ngIf="isFieldInvalid('email')" class="error-hint">Email inválido</div>
          </div>

          <div class="form-group">
            <label for="age">Idade</label>
            <input
              id="age"
              type="number"
              formControlName="age"
              placeholder="Sua idade"
              [class.error]="isFieldInvalid('age')"
            />
            <div *ngIf="isFieldInvalid('age')" class="error-hint">Idade obrigatória (min 18)</div>
          </div>

          <div class="form-group">
            <label for="password">Senha</label>
            <div class="password-input">
              <input
                [type]="showPassword ? 'text' : 'password'"
                id="password"
                formControlName="password"
                placeholder="Mínimo 8 caracteres"
                [class.error]="isFieldInvalid('password')"
              />
              <button type="button" class="toggle-password" (click)="togglePassword()">
                {{ showPassword ? 'Hide' : 'Show' }}
              </button>
            </div>
            <div *ngIf="isFieldInvalid('password')" class="error-hint">
              Senha deve ter no mínimo 8 caracteres
            </div>
          </div>

          <div class="form-group">
            <label for="confirmPassword">Confirmar Senha</label>
            <div class="password-input">
              <input
                [type]="showPassword ? 'text' : 'password'"
                id="confirmPassword"
                formControlName="confirmPassword"
                placeholder="Repita sua senha"
                [class.error]="
                  isFieldInvalid('confirmPassword') ||
                  (registerForm.errors?.['mismatch'] &&
                    registerForm.get('confirmPassword')?.touched)
                "
              />
            </div>
            <div
              *ngIf="
                registerForm.errors?.['mismatch'] && registerForm.get('confirmPassword')?.touched
              "
              class="error-hint"
            >
              As senhas não coincidem
            </div>
          </div>

          <button type="submit" class="btn-primary" [disabled]="registerForm.invalid || isLoading">
            {{ isLoading ? 'Criando conta...' : 'Registrar' }}
          </button>

          <div *ngIf="errorMessage" class="error-message">
            {{ errorMessage }}
          </div>

          <div class="login-link">Já tem uma conta? <a routerLink="/login">Faça Login</a></div>
        </form>
      </div>
    </div>
  `,
  styles: [
    `
      /* Temporarily removed SCSS - will use Tailwind */

      .register-container {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        background-color: #fafafa;
        background-image:
          radial-gradient(at 0% 0%, hsla(253, 16%, 7%, 1) 0, transparent 50%),
          radial-gradient(at 50% 0%, hsla(225, 39%, 30%, 1) 0, transparent 50%),
          radial-gradient(at 100% 0%, hsla(339, 49%, 30%, 1) 0, transparent 50%);
        background-size: cover;
        position: relative;
        overflow: hidden;

        &::before {
          content: '';
          position: absolute;
          width: 120%;
          height: 120%;
          background:
            radial-gradient(circle at 15% 50%, rgba(#60a5fa, 0.15), transparent 25%),
            radial-gradient(circle at 85% 30%, rgba(#2563eb, 0.15), transparent 25%);
          filter: blur(60px);
          z-index: 0;
        }
      }

      .register-card {
        position: relative;
        z-index: 10;
        background: rgba(255, 255, 255, 0.85);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        border: 1px solid rgba(255, 255, 255, 0.5);
        padding: 3rem 2.5rem;
        border-radius: 12px;
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
        width: 100%;
        max-width: 480px; /* Slightly wider for register form */
        text-align: center;
      }

      .brand-logo {
        font-size: 1.75rem;
        font-weight: 800;
        letter-spacing: -0.025em;
        background: linear-gradient(135deg, #2563eb, #1e40af);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        margin-bottom: 2rem;
      }

      .welcome-text {
        font-size: 1.5rem;
        font-weight: 700;
        color: #18181b;
        margin-bottom: 0.5rem;
      }

      .sub-text {
        color: #71717a;
        margin-bottom: 2.5rem;
        font-size: 0.95rem;
      }

      .form-group {
        text-align: left;
        margin-bottom: 1.25rem;

        label {
          display: block;
          font-size: 0.85rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: #18181b;
        }

        input {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 1px solid #f4f4f5;
          border-radius: 8px;
          font-size: 0.95rem;
          background-color: rgba(255, 255, 255, 0.8);
          outline: none;
          transition: all 0.2s ease-in-out;
          color: #18181b;

          &::placeholder {
            color: #a1a1aa;
          }

          &:focus {
            background-color: #fff;
            border-color: #3b82f6;
            box-shadow: 0 0 0 3px rgba(#3b82f6, 0.1);
          }

          &.error {
            border-color: #ef4444;
            &:focus {
              box-shadow: 0 0 0 3px rgba(#ef4444, 0.1);
            }
          }
        }

        .error-hint {
          color: #ef4444;
          font-size: 0.75rem;
          margin-top: 0.25rem;
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
          color: #a1a1aa;
          cursor: pointer;
          font-size: 0.85rem;
          font-weight: 600;
          transition: color 0.2s;

          &:hover {
            color: #3b82f6;
          }
        }
      }

      .btn-primary {
        width: 100%;
        padding: 0.875rem;
        background-color: #3b82f6;
        color: white;
        border: none;
        border-radius: 8px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
        margin-top: 1rem;

        &:hover:not(:disabled) {
          background-color: #2563eb;
          transform: translateY(-1px);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        &:active:not(:disabled) {
          transform: translateY(0);
        }

        &:disabled {
          background-color: #d4d4d8;
          cursor: not-allowed;
          box-shadow: none;
        }
      }

      .error-message {
        color: #ef4444;
        margin-top: 1rem;
        font-size: 0.85rem;
        background-color: rgba(#ef4444, 0.1);
        padding: 0.75rem;
        border-radius: 8px;
      }

      .login-link {
        margin-top: 1.5rem;
        font-size: 0.9rem;
        color: #71717a;

        a {
          color: #3b82f6;
          text-decoration: none;
          font-weight: 600;
          transition: color 0.2s;

          &:hover {
            color: #2563eb;
            text-decoration: underline;
          }
        }
      }
    `,
  ],
})
export class RegisterComponent {
  registerForm: FormGroup;
  showPassword = false;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
  ) {
    this.registerForm = this.fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        age: ['', [Validators.required, Validators.min(18)]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: this.passwordMatchValidator },
    );
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value ? null : { mismatch: true };
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  isFieldInvalid(field: string): boolean {
    const control = this.registerForm.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  onSubmit() {
    if (this.registerForm.invalid) return;

    this.isLoading = true;
    this.errorMessage = '';

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...userData } = this.registerForm.value;

    this.authService.register(userData).subscribe({
      next: () => {
        this.isLoading = false;
        // Auto login or redirect to login
        alert('Conta criada com sucesso! Faça login.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.isLoading = false;
        console.error(err);
        this.errorMessage = err.error?.message || 'Falha ao criar conta. Verifique os dados.';
      },
    });
  }
}
