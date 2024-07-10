import { Clipboard } from '@capacitor/clipboard';
import { classWithProviders } from '@ngx-unit-test/inject-mocks';
import { take } from 'rxjs';

import { ClipboardService } from './clipboard.service';

jest.mock('@capacitor/clipboard', () => {
  return {
    Clipboard: {
      write: jest.fn(() => Promise.resolve()),
      read: jest.fn(() => Promise.resolve({})),
    },
  };
});

describe(ClipboardService.name, () => {
  let service: ClipboardService;

  beforeEach(() => {
    service = classWithProviders({
      token: ClipboardService,
      providers: [],
    });
  });

  describe('write$', () => {
    it('should trigger "write" method', () => {
      const spy = jest.spyOn(Clipboard, 'write');
      const testOptions = { string: 'testId' };

      service.write$(testOptions).pipe(take(1)).subscribe();

      expect(spy).toHaveBeenCalledWith(testOptions);
    });
  });

  describe('read$', () => {
    it('should trigger "read" method', () => {
      const spy = jest.spyOn(Clipboard, 'read');

      service.read$().pipe(take(1)).subscribe();

      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should return correct result', done => {
      const testResult = { type: 'string', value: 'testId' };
      jest.spyOn(Clipboard, 'read').mockImplementationOnce(() => Promise.resolve(testResult));

      service
        .read$()
        .pipe(take(1))
        .subscribe(result => {
          expect(result).toBe(testResult);
          done();
        });
    });
  });
});
