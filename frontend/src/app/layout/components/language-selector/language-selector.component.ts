import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language-selector',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="lang-selector-modern">
      <button
        class="lang-pill"
        [class.active]="currentLang === 'pt-br'"
        (click)="switchLanguage('pt-br')"
        title="Português"
      >
        <span class="flag">🇧🇷</span>
        <span class="code" *ngIf="currentLang === 'pt-br'">PT</span>
      </button>

      <button
        class="lang-pill"
        [class.active]="currentLang === 'en'"
        (click)="switchLanguage('en')"
        title="English"
      >
        <span class="flag">🇺🇸</span>
        <span class="code" *ngIf="currentLang === 'en'">EN</span>
      </button>
    </div>
  `,
  styles: [
    `
      @import '../../../../variables';

      .lang-selector-modern {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.25rem;
        background: rgba(255, 255, 255, 0.4);
        border-radius: 99px;
        border: 1px solid rgba(255, 255, 255, 0.2);
      }

      .lang-pill {
        background: none;
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 0.35rem;
        padding: 0.35rem 0.5rem;
        border-radius: 20px;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

        .flag {
          font-size: 1.1rem;
          filter: grayscale(100%);
          opacity: 0.7;
          transition: all 0.2s;
        }

        .code {
          font-size: 0.75rem;
          font-weight: 700;
          color: $text-main;
          animation: fadeIn 0.3s ease;
        }

        &:hover {
          background: rgba(255, 255, 255, 0.5);
          .flag {
            filter: grayscale(0%);
            opacity: 1;
          }
        }

        &.active {
          background: white;
          box-shadow: $shadow-sm;

          .flag {
            filter: grayscale(0%);
            opacity: 1;
            transform: scale(1.1);
          }
        }
      }

      @keyframes fadeIn {
        from {
          opacity: 0;
          width: 0;
        }
        to {
          opacity: 1;
          width: auto;
        }
      }
    `,
  ],
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
