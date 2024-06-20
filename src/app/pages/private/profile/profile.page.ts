import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, Signal, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AppConstants } from '@constants/app.constants';
import { AuthFacadeService } from '@features/auth/services/auth-facade/auth-facade.service';
import { UsersApiService } from '@features/users/services/users-api.service';
import { UsersStore } from '@features/users/store/users.store';
import { UserDataDto } from '@features/users/users.models';
import {
  AlertOptions,
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonItem,
  IonList,
  IonListHeader,
  IonSkeletonText,
  IonTabButton,
  IonText,
  IonToolbar,
} from '@ionic/angular/standalone';
import { AlertEventRole } from '@models/app.models';
import { OverlayEventDetail } from '@models/ionic.models';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AlertService } from '@services/alert/alert.service';
import { ToastColor } from '@services/toast/toast.models';
import { ToastService } from '@services/toast/toast.service';
import { addIcons } from 'ionicons';
import { createOutline, logOutOutline } from 'ionicons/icons';
import { filter, switchMap, take } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    IonHeader,
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
    CommonModule,
    TranslateModule,
    RouterLink,
  ],
})
export default class ProfilePage {
  private readonly usersStore = inject(UsersStore);
  private readonly alertService = inject(AlertService);
  private readonly translateService = inject(TranslateService);
  private readonly usersApiService = inject(UsersApiService);
  private readonly toastService = inject(ToastService);
  private readonly authFacadeService = inject(AuthFacadeService);
  private readonly router = inject(Router);

  readonly supportEmail = AppConstants.supportEmail;
  userData: Signal<UserDataDto | undefined> = this.usersStore.userData;

  constructor() {
    addIcons({ createOutline, logOutOutline });
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
        filter((closeEvent: OverlayEventDetail<undefined>) => closeEvent.role === AlertEventRole.Confirm),
        switchMap(() => this.authFacadeService.logout$()),
        take(1),
      )
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

  requestEmailVerification(event: MouseEvent): void {
    event.stopPropagation();

    this.usersApiService
      .resendVerificationEmail$()
      .pipe(
        switchMap(() => {
          const message = this.translateService.instant('profile.verify_email_toast', {
            email: this.userData()?.email,
          });

          return this.toastService.open$(message, ToastColor.Success);
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
