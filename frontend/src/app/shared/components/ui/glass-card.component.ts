import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-glass-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="glass-card" [class.hover-effect]="hoverEffect" [class.no-padding]="noPadding">
      <div class="card-header" *ngIf="header || subHeader">
        <h3 class="card-title">{{ header }}</h3>
        <p class="card-subtitle" *ngIf="subHeader">{{ subHeader }}</p>
      </div>

      <!-- Content Projection -->
      <ng-content></ng-content>
    </div>
  `,
  styles: [
    `
      @import '../../../../../variables';

      .glass-card {
        background: rgba(255, 255, 255, 0.7);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.6);
        border-radius: 24px;
        padding: 1.5rem;
        box-shadow: $shadow-md;
        transition:
          transform 0.3s ease,
          box-shadow 0.3s ease;
        height: 100%;
        display: flex;
        flex-direction: column;

        &.no-padding {
          padding: 0;
        }

        &.hover-effect:hover {
          transform: translateY(-4px);
          box-shadow: $shadow-xl;
          background: rgba(255, 255, 255, 0.85);
          border-color: rgba(255, 255, 255, 0.8);
        }
      }

      .card-header {
        margin-bottom: 1rem;

        .card-title {
          font-size: 1.1rem;
          font-weight: 700;
          color: $text-main;
          margin: 0;
        }

        .card-subtitle {
          font-size: 0.85rem;
          color: $text-secondary;
          margin-top: 0.25rem;
        }
      }
    `,
  ],
})
export class GlassCardComponent {
  @Input() header: string = '';
  @Input() subHeader: string = '';
  @Input() hoverEffect: boolean = false;
  @Input() noPadding: boolean = false;
}
