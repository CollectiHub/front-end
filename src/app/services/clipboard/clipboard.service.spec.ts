import { ClipboardPlugin, ReadResult, WriteOptions } from '@capacitor/clipboard';
import { classWithProviders } from '@ngx-unit-test/inject-mocks';
import { MockProxy, mock } from 'jest-mock-extended';
import { take } from 'rxjs';

import { CLIPBOARD_PLUGIN_TOKEN, ClipboardService } from './clipboard.service';

describe(ClipboardService.name, () => {
  let service: ClipboardService;
  let clipboardPluginMock: MockProxy<ClipboardPlugin>;

  beforeEach(() => {
    clipboardPluginMock = mock<ClipboardPlugin>({
      write: jest.fn(() => Promise.resolve()),
      read: jest.fn(() => Promise.resolve({} as ReadResult)),
    });

    service = classWithProviders({
      token: ClipboardService,
      providers: [{ provide: CLIPBOARD_PLUGIN_TOKEN, useValue: clipboardPluginMock }],
    });
  });

  describe('write$', () => {
    it('should trigger "write" method', () => {
      const testOptions: WriteOptions = { string: 'testId' };

      service.write$(testOptions).pipe(take(1)).subscribe();

      expect(clipboardPluginMock.write).toHaveBeenCalledWith(testOptions);
    });
  });

  describe('read$', () => {
    it('should trigger "read" method', () => {
      service.read$().pipe(take(1)).subscribe();

      expect(clipboardPluginMock.read).toHaveBeenCalledTimes(1);
    });

    it('should return correct result', done => {
      const testResult: ReadResult = { type: 'string', value: 'testId' };
      clipboardPluginMock.read.mockImplementationOnce(() => Promise.resolve(testResult));

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
