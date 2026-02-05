import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language-selector',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="flex items-center gap-1 p-1 bg-white/40 border border-white/20 rounded-full backdrop-blur-sm"
    >
      <button
        class="flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-300"
        [ngClass]="{
          'bg-white shadow-sm ring-1 ring-black/5 scale-105': currentLang === 'pt-br',
          'hover:bg-white/50 opacity-70 hover:opacity-100': currentLang !== 'pt-br',
        }"
        (click)="switchLanguage('pt-br')"
        title="Português"
      >
        <span class="text-base leading-none filter" [class.grayscale]="currentLang !== 'pt-br'"
          >🇧🇷</span
        >
        <span
          class="text-xs font-bold text-neutral-800 leading-none pt-0.5"
          *ngIf="currentLang === 'pt-br'"
          >PT</span
        >
      </button>

      <button
        class="flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-300"
        [ngClass]="{
          'bg-white shadow-sm ring-1 ring-black/5 scale-105': currentLang === 'en',
          'hover:bg-white/50 opacity-70 hover:opacity-100': currentLang !== 'en',
        }"
        (click)="switchLanguage('en')"
        title="English"
      >
        <span class="text-base leading-none filter" [class.grayscale]="currentLang !== 'en'"
          >🇺🇸</span
        >
        <span
          class="text-xs font-bold text-neutral-800 leading-none pt-0.5"
          *ngIf="currentLang === 'en'"
          >EN</span
        >
      </button>
    </div>
  `,
  styles: [],
})
export class LanguageSelectorComponent {
  currentLang: string;

  constructor(private translate: TranslateService) {
    const savedLang = localStorage.getItem('app_language');
    this.currentLang = savedLang || 'pt-br';
    this.translate.use(this.currentLang);
  }

  switchLanguage(lang: string) {
    this.currentLang = lang;
    this.translate.use(lang);
    localStorage.setItem('app_language', lang);
  }
}
