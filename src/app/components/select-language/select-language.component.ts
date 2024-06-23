import { UpperCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { LanguageConstants } from '@constants/languages';
import { IonSelect, IonSelectOption, SelectCustomEvent } from '@ionic/angular/standalone';
import { LanguageData } from '@models/languages.models';
import { LetDirective } from '@ngrx/component';
import { LangChangeEvent, TranslateModule, TranslateService } from '@ngx-translate/core';
import { Observable, from, map, startWith, take } from 'rxjs';

@Component({
  selector: 'app-select-language',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonSelect, IonSelectOption, TranslateModule, LetDirective, UpperCasePipe],
  templateUrl: './select-language.component.html',
  styleUrls: ['./select-language.component.scss'],
})
export class SelectLanguageComponent {
  readonly translateService = inject(TranslateService);

  supporedLanguages = LanguageConstants.supportedLanuages;

  currentLangCode$: Observable<string> = this.translateService.onLangChange.pipe(
    map((langChangeEvent: LangChangeEvent) => langChangeEvent.lang),
    startWith(this.translateService.currentLang),
  );

  currentLanguageData$: Observable<LanguageData> = this.currentLangCode$.pipe(
    map((currentLangCode: string) => {
      return LanguageConstants.supportedLanuages.find(langData => langData.code === currentLangCode)!;
    }),
  );

  handleLanguageChange(selectEvent: SelectCustomEvent): void {
    const languageToUse: string = selectEvent.detail.value;

    from(Preferences.set({ key: LanguageConstants.preferenceKey, value: languageToUse }))
      .pipe(take(1))
      .subscribe(() => this.translateService.use(languageToUse));
  }
}
