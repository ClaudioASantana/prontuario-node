import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { Observable, combineLatest, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  age: number;
}

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule, ReactiveFormsModule],
  template: `
    <div class="page-container">
      <div class="page-header">
        <h1>{{ 'USERS.LIST.TITLE' | translate }}</h1>
        <button class="btn btn-primary" routerLink="new">
          {{ 'USERS.LIST.ADD_NEW' | translate }}
        </button>
      </div>

      <div class="filter-bar">
        <div class="search-container">
          <input
            type="text"
            [formControl]="searchControl"
            [placeholder]="'USERS.LIST.SEARCH_PLACEHOLDER' | translate"
            class="form-input search-input"
          />
        </div>
      </div>

      <div class="ngx-card">
        <div class="ngx-card-body">
          <table class="smart-table">
            <thead>
              <tr>
                <th>{{ 'USERS.LIST.NAME' | translate }}</th>
                <th>{{ 'USERS.LIST.EMAIL' | translate }}</th>
                <th>{{ 'USERS.LIST.ROLE' | translate }}</th>
                <th>{{ 'USERS.LIST.ACTIONS' | translate }}</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let user of filteredUsers$ | async">
                <td>{{ user.name }}</td>
                <td>{{ user.email }}</td>
                <td>
                  <span class="badge" [ngClass]="user.role">{{ user.role }}</span>
                </td>
                <td class="actions">
                  <a
                    [routerLink]="[user.id, 'edit']"
                    class="btn-icon"
                    [title]="'BUTTONS.EDIT' | translate"
                  >
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
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                  </a>
                </td>
              </tr>
              <tr *ngIf="(filteredUsers$ | async)?.length === 0">
                <td colspan="4" class="no-results">
                  {{ 'USERS.LIST.NO_RESULTS' | translate }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      @use 'sass:color';
      @use '../../../../variables';

      // Nebular/ngx-admin style emulation

      .page-container {
        padding: 2.5rem;
        background-color: #f7f9fc;
        min-height: 100%;
      }

      .page-header {
        margin-bottom: 2rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid #e4e4e7;
        display: flex;
        justify-content: space-between;
        align-items: center;

        h1 {
          font-family: 'Open Sans', sans-serif;
          font-size: 1.75rem;
          font-weight: 700;
          color: #18181b;
          margin: 0;
        }
      }

      .filter-bar {
        margin-bottom: 1.5rem;
        background: #ffffff;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        border: 1px solid #e4e4e7;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      }

      .search-input {
        padding: 0.625rem 1rem;
        border: 1px solid #e4e4e7;
        border-radius: 0.375rem;
        background-color: #ffffff;
        color: #18181b;
        font-family: 'Open Sans', sans-serif;
        font-size: 0.875rem;
        width: 100%;
        max-width: 400px;
        transition: all 0.2s;

        &:focus {
          outline: none;
          border-color: #2563eb;
          box-shadow: 0 0 0 3px rgba(51, 102, 255, 0.16);
        }
      }

      .ngx-card {
        background: #ffffff;
        border-radius: 12px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        border: 1px solid #e4e4e7;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        margin-bottom: 2rem;

        &-body {
          padding: 0; // Full width table
          overflow-x: auto;
        }
      }

      .smart-table {
        width: 100%;
        border-collapse: collapse;
        font-family: 'Open Sans', sans-serif;

        thead {
          tr {
            background-color: #f4f4f5;

            th {
              padding: 1rem 1.5rem;
              text-align: left;
              font-size: 0.75rem;
              font-weight: 700;
              line-height: 1.5rem;
              text-transform: uppercase;
              color: #a1a1aa;
              border-bottom: 1px solid #e4e4e7;
              border-right: 1px solid transparent;

              &:last-child {
                border-right: none;
              }
            }
          }
        }

        tbody {
          tr {
            transition: background-color 0.1s;

            &:hover {
              background-color: #f4f4f5;
            }

            td {
              padding: 1rem 1.5rem;
              font-size: 0.9375rem;
              font-weight: 400;
              color: #18181b;
              line-height: 1.5rem;
              border-bottom: 1px solid #e4e4e7;
            }

            &:last-child td {
              border-bottom: none;
            }
          }
        }
      }

      .no-results {
        padding: 2rem;
        text-align: center;
        color: #a1a1aa;
        font-style: italic;
      }

      .badge {
        display: inline-block;
        padding: 0.25rem 0.625rem;
        border-radius: 0.25rem;
        font-size: 0.75rem;
        font-weight: 700;
        line-height: 1;
        text-transform: uppercase;
        text-align: center;
        white-space: nowrap;
        vertical-align: baseline;

        &.admin {
          background-color: rgba(255, 61, 113, 0.16);
          color: #ff3d71;
        }
        &.physician {
          background-color: rgba(51, 102, 255, 0.16);
          color: #3366ff;
        }
        &.patient {
          background-color: rgba(0, 214, 143, 0.16);
          color: #00d68f;
        }
        &.health_plan {
          background-color: rgba(255, 170, 0, 0.16);
          color: #ffaa00;
        }
      }

      .actions {
        display: flex;
        gap: 0.5rem;
        align-items: center;
      }

      .btn-icon {
        width: 2.5rem;
        height: 2.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 0.25rem;
        color: #a1a1aa;
        background-color: transparent;
        transition: all 0.2s;
        cursor: pointer;
        border: 1px solid transparent;

        &:hover {
          background-color: rgba(51, 102, 255, 0.08);
          color: #2563eb;
        }

        svg {
          width: 1.25rem;
          height: 1.25rem;
        }
      }

      .btn {
        padding: 0.625rem 1.25rem;
        border-radius: 0.375rem;
        font-weight: 600;
        font-family: 'Open Sans', sans-serif;
        font-size: 0.875rem;
        text-transform: uppercase;
        cursor: pointer;
        border: 1px solid transparent;
        transition: all 0.2s;
        line-height: 1.25rem;
        text-decoration: none;
        display: inline-block;

        &-primary {
          background-color: #2563eb;
          color: white;
          box-shadow:
            0 4px 6px rgba(50, 50, 93, 0.11),
            0 1px 3px rgba(0, 0, 0, 0.08);

          &:hover {
            background-color: #1d4ed8;
            transform: translateY(-1px);
          }
        }
      }
    `,
  ],
})
export class UserListComponent implements OnInit {
  searchControl = new FormControl('');
  users$: Observable<User[]> | undefined;
  filteredUsers$: Observable<User[]> | undefined;

  // TODO: Move API URL to environment or service
  private apiUrl = 'http://localhost:3000/api/v1/users';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.users$ = this.http.get<User[]>(this.apiUrl);

    this.filteredUsers$ = combineLatest([
      this.users$,
      this.searchControl.valueChanges.pipe(startWith('')),
    ]).pipe(
      map(([users, searchTerm]) => {
        const term = (searchTerm || '').toLowerCase();
        return users.filter(
          (user) =>
            user.name.toLowerCase().includes(term) || user.email.toLowerCase().includes(term),
        );
      }),
    );
  }
}
