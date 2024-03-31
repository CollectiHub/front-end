import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { IonicModule, SelectCustomEvent } from '@ionic/angular';
import { LetDirective } from '@ngrx/component';
import { LangChangeEvent, TranslateModule, TranslateService } from '@ngx-translate/core';
import { Observable, from, map, startWith, take, tap } from 'rxjs';
import { LanguageConstants } from 'src/app/constants/languages';
import { LanguageData } from 'src/app/models/languages.models';

@Component({
  selector: 'app-select-language',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonicModule, TranslateModule, LetDirective],
  templateUrl: './select-language.component.html',
  styleUrls: ['./select-language.component.scss'],
})
export class SelectLanguageComponent {
  readonly translateService = inject(TranslateService);

  currentLangCode$: Observable<string> = this.translateService.onLangChange.pipe(
    map((langChangeEvent: LangChangeEvent) => langChangeEvent.lang),
    startWith(this.translateService.currentLang),
  );

  currentLanguageData$: Observable<LanguageData> = this.currentLangCode$.pipe(
    tap(console.log),
    map((currentLangCode: string) => {
      return LanguageConstants.supportedLanuages.find(langData => langData.code === currentLangCode)!;
    }),
  );

  supporedLanguages = LanguageConstants.supportedLanuages;

  handleLanguageChange(selectEvent: SelectCustomEvent): void {
    const languageToUse: string = selectEvent.detail.value;

    from(Preferences.set({ key: LanguageConstants.preferenceKey, value: languageToUse }))
      .pipe(take(1))
      .subscribe(() => this.translateService.use(languageToUse));
  }
}
