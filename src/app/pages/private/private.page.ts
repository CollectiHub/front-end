import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CollectionSettingsComponent } from '@features/collection-settings/components/collection-settings/collection-settings.component';
import { UsersApiService } from '@features/users/services/users-api.service';
import { UsersStore } from '@features/users/store/users.store';
import { UserDataDto } from '@features/users/users.models';
import { IonIcon, IonMenu, IonTabBar, IonTabButton, IonTabs } from '@ionic/angular/standalone';
import { TranslateModule } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { libraryOutline, personCircleOutline } from 'ionicons/icons';
import { take } from 'rxjs';

@Component({
  selector: 'app-private',
  templateUrl: './private.page.html',
  styleUrls: ['./private.page.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonTabs, IonTabBar, IonTabButton, IonIcon, TranslateModule, IonMenu, CollectionSettingsComponent],
})
export default class PrivatePage implements OnInit {
  private readonly usersStore = inject(UsersStore);
  private readonly usersApiService = inject(UsersApiService);
  private readonly router = inject(Router);

  constructor() {
    addIcons({ libraryOutline, personCircleOutline });
  }

  ngOnInit(): void {
    if (this.usersStore.userData()) return;

    this.usersApiService
      .getUserData$()
      .pipe(take(1))
      .subscribe({
        next: (userData: UserDataDto) => {
          this.usersStore.setUserData(userData);
        },
        error: (error: HttpErrorResponse) => {
          this.usersStore.setError(error.error.message);
          void this.router.navigate(['/user-data-fetch-failed']);
        },
      });
  }
}
