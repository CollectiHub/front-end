import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Signal, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '@components/header/header.component';
import { SupportInfoComponent } from '@components/support-info/support-info.component';
import { AppConstants } from '@constants/app.constants';
import { UsersApiService } from '@features/users/services/users-api.service';
import { UsersStore } from '@features/users/store/users.store';
import { UserDataDto } from '@features/users/users.models';
import {
  AlertOptions,
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonIcon,
  IonItem,
  IonList,
  IonListHeader,
  IonSkeletonText,
  IonTabButton,
  IonText,
  IonToolbar,
  ToastOptions,
} from '@ionic/angular/standalone';
import { AlertEventRole } from '@models/app.models';
import { OverlayEventDetail } from '@models/ionic.models';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AlertService } from '@services/alert/alert.service';
import { ToastService } from '@services/toast/toast.service';
import { addIcons } from 'ionicons';
import { createOutline } from 'ionicons/icons';
import { filter, switchMap, take } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    IonButtons,
    IonToolbar,
    IonFooter,
    IonListHeader,
    IonIcon,
    IonTabButton,
    IonSkeletonText,
    IonContent,
    IonList,
    IonItem,
    IonButton,
    IonText,
    HeaderComponent,
    CommonModule,
    TranslateModule,
    RouterLink,
    SupportInfoComponent,
  ],
})
export default class ProfilePage {
  private readonly usersStore = inject(UsersStore);
  private readonly alertService = inject(AlertService);
  private readonly translateService = inject(TranslateService);
  private readonly usersApiService = inject(UsersApiService);
  private readonly toastService = inject(ToastService);

  userData: Signal<UserDataDto | undefined> = this.usersStore.userData;

  constructor() {
    addIcons({ createOutline });
  }

  deleteAccount(): void {
    const alertOption = this.buildDeleteAccountAlertOptions();

    this.alertService
      .openWithListener$<undefined>(alertOption)
      .pipe(
        take(1),
        filter((closeEvent: OverlayEventDetail<undefined>) => closeEvent.role === AlertEventRole.Confirm),
      )
      .subscribe(() => this.usersStore.deleteUser());
  }

  logout(): void {
    const alertOption = this.buildLogoutAlertOptions();

    this.alertService
      .openWithListener$<undefined>(alertOption)
      .pipe(
        take(1),
        filter((closeEvent: OverlayEventDetail<undefined>) => closeEvent.role === AlertEventRole.Confirm),
      )
      .subscribe(() => this.usersStore.logout());
  }

  requestEmailVerification(event: MouseEvent): void {
    event.stopPropagation();

    this.usersApiService
      .resendVerificationEmail$()
      .pipe(
        switchMap(() => {
          const toastOptions: ToastOptions = {
            message: this.translateService.instant('profile.verify_email_toast', { email: this.userData()?.email }),
            duration: AppConstants.toastDuration,
            cssClass: 'app-toast',
            position: 'bottom',
            color: 'success',
            buttons: [{ icon: 'close-outline', role: 'cancel' }],
          };

          return this.toastService.open$(toastOptions);
        }),
        take(1),
      )
      .subscribe();
  }

  private buildLogoutAlertOptions(): AlertOptions {
    return {
      message: this.translateService.instant('profile.logout_alert.message'),
      buttons: [
        {
          text: this.translateService.instant('alert.cancel_button'),
          role: AlertEventRole.Cancel,
        },
        {
          text: this.translateService.instant('alert.confirm_button'),
          role: AlertEventRole.Confirm,
        },
      ],
    };
  }

  private buildDeleteAccountAlertOptions(): AlertOptions {
    return {
      message: this.translateService.instant('profile.detele_acount_alert.message'),
      buttons: [
        {
          text: this.translateService.instant('alert.cancel_button'),
          role: AlertEventRole.Cancel,
        },
        {
          text: this.translateService.instant('alert.confirm_button'),
          role: AlertEventRole.Confirm,
        },
      ],
    };
  }
}
