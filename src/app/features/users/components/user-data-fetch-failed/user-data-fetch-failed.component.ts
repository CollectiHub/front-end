import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UsersApiService } from '@features/users/services/users-api.service';
import { UsersStore } from '@features/users/store/users.store';
import { UserDataDto } from '@features/users/users.models';
import { IonButton, IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonSkeletonText, IonText } from '@ionic/angular/standalone';
import { ModalController } from '@ionic/angular/standalone';
import { ModalEventRole } from '@models/app.models';
import { TranslateModule } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { alertCircleOutline } from 'ionicons/icons';
import { take } from 'rxjs';

@Component({
  selector: 'app-user-data-fetch-failed',
  templateUrl: './user-data-fetch-failed.component.html',
  styleUrls: ['./user-data-fetch-failed.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonText, IonSkeletonText, IonIcon, IonButton, IonTitle, IonToolbar, IonHeader, IonContent, TranslateModule],
})
export default class UserDataFetchFailedComponent {
  private readonly usersStore = inject(UsersStore);
  private readonly usersApiService = inject(UsersApiService);
  private readonly modalController = inject(ModalController);

  constructor() {
    addIcons({ alertCircleOutline });
  }

  // TODO: Make transparent background
  fetchUserData(): void {
    this.usersApiService
      .getUserData$()
      .pipe(take(1))
      .subscribe({
        next: (userData: UserDataDto) => {
          this.usersStore.setUserData(userData);
          this.modalController.dismiss();
        },
        error: (error: HttpErrorResponse) => this.usersStore.setError(error.error.message),
      });
  }

  logout(): void {
    this.usersStore.logout();
    this.modalController.dismiss(undefined, ModalEventRole.ProgramaticDismiss);
  }
}
