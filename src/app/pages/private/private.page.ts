import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import UserDataFetchFailedComponent from '@features/users/components/user-data-fetch-failed/user-data-fetch-failed.component';
import { UsersApiService } from '@features/users/services/users-api.service';
import { UsersStore } from '@features/users/store/users.store';
import { UserDataDto } from '@features/users/users.models';
import { IonIcon, IonTabBar, IonTabButton, IonTabs, ModalOptions } from '@ionic/angular/standalone';
import { ModalEventRole } from '@models/app.models';
import { TranslateModule } from '@ngx-translate/core';
import { ModalService } from '@services/modal/modal.service';
import { addIcons } from 'ionicons';
import { libraryOutline, personCircleOutline } from 'ionicons/icons';
import { Observable, catchError, map, take } from 'rxjs';

import { UserDataFetchResult } from './private.page.models';

@Component({
  selector: 'app-private',
  templateUrl: './private.page.html',
  styleUrls: ['./private.page.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonTabs, IonTabBar, IonTabButton, IonIcon, TranslateModule],
})
export default class PrivatePage implements OnInit {
  private readonly usersStore = inject(UsersStore);
  private readonly usersApiService = inject(UsersApiService);
  private readonly modalService = inject(ModalService);

  constructor() {
    addIcons({ libraryOutline, personCircleOutline });
  }

  ngOnInit(): void {
    this.usersApiService
      .getUserData$()
      .pipe(
        map((userData: UserDataDto) => ({ data: userData, error: undefined })),
        catchError((error: HttpErrorResponse) => this.openUserDataFetchErrorModal$(error)),
        take(1),
      )
      .subscribe((fetchResult: UserDataFetchResult) => {
        if (fetchResult.data !== undefined) {
          this.usersStore.setUserData(fetchResult.data);
        } else {
          this.usersStore.setError(<string>fetchResult.error);
        }
      });
  }

  private openUserDataFetchErrorModal$(error: HttpErrorResponse): Observable<UserDataFetchResult> {
    const modalOptions: ModalOptions = {
      component: UserDataFetchFailedComponent,
      canDismiss: (_, role?: string) => {
        return Promise.resolve(role === ModalEventRole.ProgramaticDismiss);
      },
    };

    return this.modalService.open$(modalOptions).pipe(
      take(1),
      map(() => ({ error: error.error.message, data: undefined })),
    );
  }
}
