import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-glass-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="glass rounded-3xl p-6 shadow-glass transition-all duration-300 h-full flex flex-col"
      [class.hover:-translate-y-1]="hoverEffect"
      [class.hover:shadow-glass-lg]="hoverEffect"
      [class.hover:bg-white/85]="hoverEffect"
      [class.p-0]="noPadding"
    >
      <div class="mb-4" *ngIf="header || subHeader">
        <h3 class="text-lg font-bold text-neutral-900 m-0">{{ header }}</h3>
        <p class="text-sm text-neutral-500 mt-1" *ngIf="subHeader">{{ subHeader }}</p>
      </div>

      <!-- Content Projection -->
      <ng-content></ng-content>
    </div>
  `,
})
export class GlassCardComponent {
  @Input() header: string = '';
  @Input() subHeader: string = '';
  @Input() hoverEffect: boolean = false;
  @Input() noPadding: boolean = false;
}
