import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('frontend');

  constructor(translate: TranslateService) {
    translate.addLangs(['en', 'pt-br']);
    translate.setDefaultLang('pt-br');

    const browserLang = translate.getBrowserLang();
    const savedLang = localStorage.getItem('app_language');
    const defaultLang = 'pt-br';

    // Use saved language, or browser language (if valid), or default
    let langToUse = defaultLang;
    if (savedLang) {
      langToUse = savedLang;
    } else if (browserLang && browserLang.match(/en|pt-br/)) {
      langToUse = browserLang;
    }
    translate.use(langToUse);
  }
}
