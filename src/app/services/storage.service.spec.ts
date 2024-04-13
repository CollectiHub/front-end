import { Storage } from '@ionic/storage-angular';
import { classWithProviders } from '@ngx-unit-test/inject-mocks';
import { MockProxy, mock } from 'jest-mock-extended';

import { StorageService } from './storage.service';

describe('StorageService', () => {
  let service: StorageService;
  let storageMock: MockProxy<Storage>;

  beforeEach(() => {
    storageMock = mock<Storage>();
    storageMock.create.mockResolvedValue(storageMock);
    storageMock.set.mockResolvedValue(undefined);
    storageMock.get.mockResolvedValue('value');

    service = classWithProviders({
      token: StorageService,
      providers: [
        {
          provide: Storage,
          useValue: storageMock,
        },
      ],
    });
  });

  describe('init', () => {
    it('should trigger "create" method of storage when contructor called', async () => {
      expect(storageMock.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('set', () => {
    it('should trigger "set" method of storage', () => {
      service.set('key', 'value');

      expect(storageMock.set).toHaveBeenCalledWith('key', 'value');
    });
  });

  describe('get$', () => {
    it('should trigger "get$" method of storage', () => {
      service.get$('key').subscribe();

      expect(storageMock.get).toHaveBeenCalledWith('key');
    });
  });
});
