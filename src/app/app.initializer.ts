import { Device, GetLanguageCodeResult } from '@capacitor/device';
import { GetResult, Preferences } from '@capacitor/preferences';
import { TranslateService } from '@ngx-translate/core';
import { Observable, combineLatest, from, map, of, switchMap, tap } from 'rxjs';

import { LanguageConstants } from './constants/languages';
import { LanguageData } from './models/languages.models';

export function initializeApp(translateService: TranslateService) {
  return () => {
    const deviceLanguage$: Observable<GetLanguageCodeResult> = from(Device.getLanguageCode());
    const preSelectedLanguage$: Observable<GetResult> = from(Preferences.get({ key: LanguageConstants.preferenceKey }));

    return combineLatest([deviceLanguage$, preSelectedLanguage$]).pipe(
      switchMap(([deviceLanguage, preSelectedLanguage]: [GetLanguageCodeResult, GetResult]) => {
        if (preSelectedLanguage.value !== null) of(preSelectedLanguage.value);

        const isDeviceLangSupported = LanguageConstants.supportedLanuages.some(
          (langData: LanguageData) => langData.code === deviceLanguage.value,
        );
        const languageToUse: string = isDeviceLangSupported
          ? deviceLanguage.value
          : LanguageConstants.defaultLanguageCode;

        return from(Preferences.set({ key: LanguageConstants.preferenceKey, value: languageToUse })).pipe(
          map(() => languageToUse),
        );
      }),
      tap((languageToUse: string) => translateService.use(languageToUse)),
    );
  };
}
