import { LanguageData } from '../models/languages.models';

export namespace LanguageConstants {
  export const supportedLanuages: LanguageData[] = [
    {
      code: 'en',
      displayValue: 'English',
      flagIconCode: 'us',
    },
    {
      code: 'ua',
      displayValue: 'Українська',
      flagIconCode: 'ua',
    },
  ];

  export const defaultLanguageCode = 'ua';

  export const preferenceKey = 'language';
}
