import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ButtonVariant = 'primary-gradient' | 'glass' | 'ghost' | 'danger';

@Component({
  selector: 'app-glass-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button class="btn-modern" [ngClass]="variant" (click)="onClick.emit($event)">
      <span class="btn-content">
        <ng-content select="[icon]"></ng-content>
        <span class="label" *ngIf="label">{{ label }}</span>
        <ng-content></ng-content>
      </span>
    </button>
  `,
  styles: [
    `
      @import '../../../../../variables';

      .btn-modern {
        position: relative;
        border: none;
        border-radius: 99px; /* Pill shape */
        padding: 0.75rem 1.5rem;
        font-weight: 600;
        font-size: 0.95rem;
        cursor: pointer;
        overflow: hidden;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: $shadow-sm;
        display: inline-flex;
        align-items: center;
        justify-content: center;

        .btn-content {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        /* Variants */
        &.primary-gradient {
          background: linear-gradient(135deg, $primary-500, $primary-700);
          color: white;
          box-shadow: 0 4px 15px rgba($primary-500, 0.4);

          &:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba($primary-500, 0.5);
          }

          &:active {
            transform: translateY(0);
          }
        }

        &.glass {
          background: rgba(255, 255, 255, 0.6);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.5);
          color: $primary-700;

          &:hover {
            background: rgba(255, 255, 255, 0.9);
            transform: translateY(-2px);
            color: $primary-600;
          }
        }

        &.ghost {
          background: transparent;
          box-shadow: none;
          color: $text-secondary;

          &:hover {
            background: rgba($primary-500, 0.1);
            color: $primary-600;
          }
        }

        &.danger {
          background: rgba($error, 0.1);
          color: $error;
          box-shadow: none;

          &:hover {
            background: rgba($error, 0.2);
          }
        }
      }
    `,
  ],
})
export class GlassButtonComponent {
  @Input() label: string = '';
  @Input() variant: ButtonVariant = 'primary-gradient';
  @Output() onClick = new EventEmitter<Event>();
}
