import { Storage } from '@ionic/storage-angular';
import { classWithProviders } from '@ngx-unit-test/inject-mocks';
import { MockProxy, mock } from 'jest-mock-extended';
import { take } from 'rxjs';

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

  describe('contructor', () => {
    it('should trigger "create" method of storage when contructor called', async () => {
      expect(storageMock.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('set', () => {
    it('should trigger "set" method of storage', () => {
      service.set$('key', 'value').subscribe();

      expect(storageMock.set).toHaveBeenCalledWith('key', 'value');
    });
  });

  describe('get$', () => {
    it('should trigger "get$" method of storage if storage was created', () => {
      service.get$('key').pipe(take(1)).subscribe();

      expect(storageMock.get).toHaveBeenCalledWith('key');
    });

    it('should not trigger "get$" method of storage if storage was not created', () => {
      storageMock.create.mockRejectedValueOnce(new Error('Error'));

      service.get$('key').pipe(take(1)).subscribe();

      expect(storageMock.get).toHaveBeenCalledWith('key');
    });
  });

  describe('remove$', () => {
    it('should trigger "remove" method of storage', () => {
      service.remove$('key').pipe(take(1)).subscribe();

      expect(storageMock.remove).toHaveBeenCalledWith('key');
    });
  });
});
