import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language-selector',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="lang-selector">
      <button
        class="lang-btn"
        [class.active]="currentLang === 'pt-br'"
        (click)="switchLanguage('pt-br')"
        title="Português"
      >
        🇧🇷
      </button>
      <div class="divider"></div>
      <button
        class="lang-btn"
        [class.active]="currentLang === 'en'"
        (click)="switchLanguage('en')"
        title="English"
      >
        🇺🇸
      </button>
    </div>
  `,
  styles: [`
    @import '../../../../variables';

    .lang-selector {
      display: flex;
      align-items: center;
      background-color: $background-basic;
      border-radius: 20px;
      padding: 0.25rem;
    }

    .divider {
      width: 1px;
      height: 1rem;
      background-color: $border-basic;
      margin: 0 0.25rem;
    }

    .lang-btn {
      background: none;
      border: none;
      cursor: pointer;
      font-size: 1.25rem;
      padding: 0.25rem 0.5rem;
      border-radius: 50%;
      opacity: 0.5;
      transition: all 0.2s;
      filter: grayscale(100%);

      &:hover {
        opacity: 0.8;
        transform: scale(1.1);
      }

      &.active {
        opacity: 1;
        filter: grayscale(0%);
      }
    }
  `]
})
export class LanguageSelectorComponent {
  currentLang: string;

  constructor(private translate: TranslateService) {
    // Initialize with saved or default language
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
