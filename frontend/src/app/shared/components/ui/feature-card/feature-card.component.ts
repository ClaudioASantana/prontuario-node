import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-feature-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="glass rounded-3xl p-8 shadow-glass hover:shadow-glass-lg hover:-translate-y-2 transition-all duration-300"
    >
      <div
        class="w-16 h-16 rounded-xl flex items-center justify-center mb-6 shadow-lg"
        [ngClass]="{
          'bg-gradient-to-br from-primary-500 to-primary-600': gradient === 'blue',
          'bg-gradient-to-br from-teal-500 to-teal-600': gradient === 'teal',
          'bg-gradient-to-br from-indigo-500 to-indigo-600': gradient === 'indigo',
        }"
      >
        <i [class]="icon" class="text-3xl text-white"></i>
      </div>
      <h3 class="text-2xl font-bold text-neutral-900 mb-4">{{ title }}</h3>
      <p class="text-neutral-600 leading-relaxed">{{ description }}</p>
    </div>
  `,
})
export class FeatureCardComponent {
  @Input() icon: string = '';
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() gradient: 'blue' | 'teal' | 'indigo' = 'blue';
}
