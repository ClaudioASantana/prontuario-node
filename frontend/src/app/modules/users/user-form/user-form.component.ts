import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  age: number;
}

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, TranslateModule],
  template: `
    <div class="page-container">
      <div class="ngx-card">
        <div class="ngx-card-header">
          <h2>{{ 'USERS.EDIT.TITLE' | translate }}</h2>
        </div>

        <div class="ngx-card-body">
          <form (ngSubmit)="onSubmit()" #userForm="ngForm" *ngIf="user">
            <div class="form-group">
              <label>{{ 'USERS.FORM.NAME' | translate }}</label>
              <input
                type="text"
                [(ngModel)]="user.name"
                name="name"
                disabled
                class="form-input disabled"
              />
              <span class="hint">{{ 'USERS.FORM.READONLY_HINT' | translate }}</span>
            </div>

            <div class="form-group">
              <label>{{ 'USERS.FORM.EMAIL' | translate }}</label>
              <input
                type="email"
                [(ngModel)]="user.email"
                name="email"
                disabled
                class="form-input disabled"
              />
            </div>

            <div class="form-group">
              <label>{{ 'USERS.FORM.ROLE' | translate }}</label>
              <select [(ngModel)]="user.role" name="role" class="form-select">
                <option value="admin">Admin</option>
                <option value="physician">Physician</option>
                <option value="patient">Patient</option>
                <option value="health_plan">Health Plan</option>
              </select>
            </div>

            <div class="form-actions">
              <button type="button" class="btn btn-secondary" routerLink="/users">
                {{ 'BUTTONS.CANCEL' | translate }}
              </button>
              <button type="submit" class="btn btn-primary">
                {{ 'BUTTONS.SAVE' | translate }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      /* Temporarily removed SCSS - will use Tailwind */

      .page-container {
        padding: 2.5rem;
        background-color: #fafafa;
        min-height: 100%;
        display: flex;
        justify-content: center;
      }

      .ngx-card {
        background: #ffffff;
        border-radius: 12px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        border: 1px solid #e4e4e7;
        width: 100%;
        max-width: 600px;
        overflow: hidden;

        &-header {
          padding: 1rem 1.5rem;
          border-bottom: 1px solid #e4e4e7;

          h2 {
            font-family: 'Open Sans', sans-serif;
            font-size: 1.1rem;
            font-weight: 600;
            color: #18181b;
            margin: 0;
          }
        }

        &-body {
          padding: 1.5rem;
        }
      }

      .form-group {
        margin-bottom: 1.5rem;
      }

      label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 600;
        color: #18181b;
        font-family: 'Open Sans', sans-serif;
        font-size: 0.875rem;
      }

      .form-input,
      .form-select {
        width: 100%;
        padding: 0.75rem 1rem;
        border: 1px solid #e4e4e7;
        border-radius: 12px;
        background-color: #f7f9fc;
        color: #18181b;
        font-family: 'Open Sans', sans-serif;
        font-size: 0.9375rem;
        transition: all 0.2s;

        &:focus {
          outline: none;
          background-color: #ffffff;
          border-color: #2563eb;
          box-shadow: 0 0 0 3px rgba(51, 102, 255, 0.16);
        }

        &.disabled {
          background-color: #edf1f7;
          color: #a1a1aa;
          cursor: not-allowed;
        }
      }

      .hint {
        font-size: 0.75rem;
        color: #a1a1aa;
        margin-top: 0.5rem;
        display: block;
      }

      .form-actions {
        display: flex;
        gap: 1rem;
        justify-content: flex-end;
        margin-top: 2rem;
      }

      .btn {
        padding: 0.75rem 1.5rem;
        border-radius: 12px;
        font-weight: 700;
        font-family: 'Open Sans', sans-serif;
        font-size: 0.875rem;
        text-transform: uppercase;
        cursor: pointer;
        border: 1px solid transparent;
        transition: all 0.2s;
        line-height: 1.25rem;

        &-primary {
          background-color: #2563eb;
          color: white;
          box-shadow:
            0 4px 6px rgba(50, 50, 93, 0.11),
            0 1px 3px rgba(0, 0, 0, 0.08);

          &:hover {
            background-color: #1d4ed8;
            transform: translateY(-1px);
            box-shadow:
              0 7px 14px rgba(50, 50, 93, 0.1),
              0 3px 6px rgba(0, 0, 0, 0.08);
          }
        }

        &-secondary {
          background-color: transparent;
          color: #a1a1aa;
          border-color: #e4e4e7;

          &:hover {
            background-color: #fafafa;
            color: #18181b;
          }
        }
      }
    `,
  ],
})
export class UserFormComponent implements OnInit {
  user: User | null = null;
  private apiUrl = 'http://localhost:3000/api/v1/users';

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadUser(id);
    }
  }

  loadUser(id: string): void {
    this.http.get<User>(`${this.apiUrl}/${id}`).subscribe((u) => (this.user = u));
  }

  onSubmit(): void {
    if (this.user) {
      // We ONLY want to update the role for now, but the API might expect full object.
      // Based on my proposal, backend update needs verification.
      // Assuming naive update first, then fixing backend.
      this.http.put(`${this.apiUrl}/${this.user.id}`, this.user).subscribe({
        next: () => this.router.navigate(['/users']),
        error: (err) => alert('Error updating user: ' + err.message),
      });
    }
  }
}
