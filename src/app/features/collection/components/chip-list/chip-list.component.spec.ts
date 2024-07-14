import { Card, StatusCard } from '@models/collection.models';
import { TranslateService } from '@ngx-translate/core';
import { classWithProviders } from '@ngx-unit-test/inject-mocks';
import { ToastColor } from '@services/toast/toast.models';
import { ToastService } from '@services/toast/toast.service';
import { MockProxy, mock } from 'jest-mock-extended';
import { of } from 'rxjs';

import { ChipListComponent } from './chip-list.component';

describe(ChipListComponent.name, () => {
  let component: ChipListComponent;
  let translateServiceMock: MockProxy<TranslateService>;
  let toastServiceMock: MockProxy<ToastService>;

  beforeEach(() => {
    translateServiceMock = mock<TranslateService>();
    translateServiceMock.instant.mockImplementation(a => a);

    toastServiceMock = mock<ToastService>();
    toastServiceMock.open$.mockReturnValue(of({} as HTMLIonToastElement));

    component = classWithProviders({
      token: ChipListComponent,
      providers: [
        {
          provide: TranslateService,
          useValue: translateServiceMock,
        },
        {
          provide: ToastService,
          useValue: toastServiceMock,
        },
      ],
    });
  });

  describe('getLoadingStatus', () => {
    it('should return true if chipId is present in chipsPendingResponse', () => {
      const chipId: string = 'R-007';

      const isLoading = component.getLoadingStatus([chipId], chipId);

      expect(isLoading).toBe(true);
    });

    it('should return false if chipId is not present in chipsPendingResponse', () => {
      const chipId: string = 'R-007';

      const isLoading = component.getLoadingStatus(['R-005'], chipId);

      expect(isLoading).toBe(false);
    });
  });

  describe('handleChipClick', () => {
    it('should translate message for toaster if the chip does not exist', () => {
      const chip: Card = {
        id: 'id-002',
        status: StatusCard.NotExisting,
        rarity: 'R',
        serial_number: 'R-002',
        character_name: 'FF',
        image_url: 'assets/img/card-stub.jpg',
      };

      component.handleChipClick('id-002', chip);

      expect(translateServiceMock.instant).toHaveBeenCalledWith('collection.card_not_exists.toast');
    });

    it('should open toast if the chip does not exist', () => {
      const chip: Card = {
        id: 'id-002',
        status: StatusCard.NotExisting,
        rarity: 'R',
        serial_number: 'R-002',
        character_name: 'FF',
        image_url: 'assets/img/card-stub.jpg',
      };

      component.handleChipClick('id-002', chip);

      expect(toastServiceMock.open$).toHaveBeenCalledWith('collection.card_not_exists.toast', ToastColor.Medium);
    });
  });
});
