import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthFacadeService } from '@features/auth/services/auth-facade/auth-facade.service';
import { UsersApiService } from '@features/users/services/users-api.service';
import { UsersStore } from '@features/users/store/users.store';
import { UserDataDto } from '@features/users/users.models';
import { IonButton, IonContent, IonIcon, IonText } from '@ionic/angular/standalone';
import { TranslateModule } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { alertCircleOutline } from 'ionicons/icons';
import { take } from 'rxjs';

@Component({
  selector: 'app-user-data-fetch-failed',
  standalone: true,
  imports: [IonText, IonIcon, IonButton, IonContent, TranslateModule],
  templateUrl: './user-data-fetch-failed.page.html',
  styleUrl: './user-data-fetch-failed.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class UserDataFetchFailedPage {
  private readonly usersStore = inject(UsersStore);
  private readonly usersApiService = inject(UsersApiService);
  private readonly authFacadeService = inject(AuthFacadeService);
  private readonly router = inject(Router);

  constructor() {
    addIcons({ alertCircleOutline });
  }

  fetchUserData(): void {
    this.usersApiService
      .getUserData$()
      .pipe(take(1))
      .subscribe({
        next: (userData: UserDataDto) => {
          this.usersStore.setUserData(userData);
          this.router.navigate(['/collection']);
        },
        error: (error: HttpErrorResponse) => this.usersStore.setError(error.error.message),
      });
  }

  logout(): void {
    this.authFacadeService
      .logout$()
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.usersStore.clear();
          this.router.navigate(['/login']);
        },
        error: (error: HttpErrorResponse) => {
          this.usersStore.setError(error.error.message);
        },
      });
  }
}
