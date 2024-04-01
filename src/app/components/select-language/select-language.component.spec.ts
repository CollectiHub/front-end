import { EventEmitter } from '@angular/core';
import * as PreferencesPackage from '@capacitor/preferences';
import { SelectCustomEvent } from '@ionic/angular';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { classWithProviders } from '@ngx-unit-test/inject-mocks';
import { MockProxy, mock } from 'jest-mock-extended';
import { of } from 'rxjs';
import { LanguageConstants } from 'src/app/constants/languages';

import { SelectLanguageComponent } from './select-language.component';

jest.mock('@capacitor/preferences', () => {
  return {
    Preferences: { set: jest.fn() },
  };
});

describe('SelectLanguageComponent', () => {
  let component: SelectLanguageComponent;
  let translateServiceMock: MockProxy<TranslateService>;

  beforeEach(() => {
    translateServiceMock = mock<TranslateService>();
    jest.spyOn(translateServiceMock, 'onLangChange', 'get').mockReturnValue(of({}) as EventEmitter<LangChangeEvent>);

    component = classWithProviders({
      token: SelectLanguageComponent,
      providers: [
        {
          provide: TranslateService,
          useValue: translateServiceMock,
        },
      ],
    });
  });

  describe('handleLanguageChange', () => {
    it('should trigger set preferences with new language', () => {
      const spy = jest.spyOn(PreferencesPackage.Preferences, 'set');
      const selectEventMock = { detail: { value: 'en' } } as SelectCustomEvent;

      component.handleLanguageChange(selectEventMock);

      expect(spy).toHaveBeenCalledWith({ key: LanguageConstants.preferenceKey, value: 'en' });
    });

    it('should use new language for translations', () => {
      const selectEventMock = { detail: { value: 'en' } } as SelectCustomEvent;

      component.handleLanguageChange(selectEventMock);

      expect(translateServiceMock.use).toHaveBeenCalledWith('en');
    });
  });
});
