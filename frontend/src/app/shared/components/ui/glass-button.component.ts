import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ButtonVariant = 'primary' | 'glass' | 'ghost' | 'danger';

@Component({
  selector: 'app-glass-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      class="relative inline-flex items-center justify-center border-none rounded-full px-6 py-3 font-semibold text-base cursor-pointer overflow-hidden transition-all duration-300 shadow-sm"
      [ngClass]="{
        'bg-gradient-to-br from-primary-500 to-primary-700 text-white shadow-primary-500/40 hover:-translate-y-0.5 hover:shadow-primary-500/50':
          variant === 'primary',
        'glass text-primary-700 hover:bg-white/90 hover:-translate-y-0.5 hover:text-primary-600':
          variant === 'glass',
        'bg-transparent shadow-none text-neutral-500 hover:bg-primary-500/10 hover:text-primary-600':
          variant === 'ghost',
        'bg-red-500/10 text-red-500 shadow-none hover:bg-red-500/20': variant === 'danger',
        'opacity-50 cursor-not-allowed': disabled,
      }"
      [disabled]="disabled"
      (click)="!disabled && onClick.emit($event)"
    >
      <span class="relative z-10 flex items-center gap-2">
        <ng-content select="[icon]"></ng-content>
        <span *ngIf="label">{{ label }}</span>
        <ng-content></ng-content>
      </span>
    </button>
  `,
})
export class GlassButtonComponent {
  @Input() label: string = '';
  @Input() variant: ButtonVariant = 'primary';
  @Input() disabled: boolean = false;
  @Output() onClick = new EventEmitter<Event>();
}
