import { fakeAsync, tick } from '@angular/core/testing';
import * as PreferencesPackage from '@capacitor/preferences';
import { SelectCustomEvent } from '@ionic/angular/standalone';
import { TranslateService } from '@ngx-translate/core';
import { classWithProviders } from '@ngx-unit-test/inject-mocks';
import { MockProxy, mock } from 'jest-mock-extended';
import { of } from 'rxjs';
import { LanguageConstants } from 'src/app/constants/languages';

import { SelectLanguageComponent } from './select-language.component';

jest.mock('@capacitor/preferences', () => {
  return {
    Preferences: { set: jest.fn().mockResolvedValue(undefined) },
  };
});

describe('SelectLanguageComponent', () => {
  let component: SelectLanguageComponent;
  let translateServiceMock: MockProxy<TranslateService>;

  beforeEach(() => {
    translateServiceMock = mock<TranslateService>({ onLangChange: of({}) as any });
    translateServiceMock.currentLang = 'en';

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

  describe('currentLangCode$', () => {
    it('should emit cuurent language key when subscribe', () => {
      const spy = jest.fn();

      component.currentLangCode$.subscribe(spy);

      expect(spy).toHaveBeenCalledWith('en');
    });
  });

  describe('currentLanguageData$', () => {
    it('should emit target language data found by key', () => {
      const spy = jest.fn();

      component.currentLanguageData$.subscribe(spy);

      expect(spy).toHaveBeenCalledWith({
        code: 'en',
        displayValue: 'English',
        flagIconCode: 'us',
      });
    });
  });

  describe('handleLanguageChange', () => {
    it('should trigger set preferences with new language', fakeAsync(() => {
      const spy = jest.spyOn(PreferencesPackage.Preferences, 'set');
      const selectEventMock = { detail: { value: 'en' } } as SelectCustomEvent;

      component.handleLanguageChange(selectEventMock);
      tick();

      expect(spy).toHaveBeenCalledWith({ key: LanguageConstants.preferenceKey, value: 'en' });
    }));

    it('should use new language for translations', fakeAsync(() => {
      const selectEventMock = { detail: { value: 'en' } } as SelectCustomEvent;

      component.handleLanguageChange(selectEventMock);
      tick();

      expect(translateServiceMock.use).toHaveBeenCalledWith('en');
    }));
  });
});
