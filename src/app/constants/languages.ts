import { LanguageData } from '../models/languages.models';

export namespace LanguageConstants {
  export const supportedLanuages: LanguageData[] = [
    {
      code: 'en',
      displayValue: 'English',
      flagIconCode: 'US',
    },
    {
      code: 'ua',
      displayValue: 'Українська',
      flagIconCode: 'UA',
    },
  ];

  export const defaultLanguageCode = 'ua';
}
