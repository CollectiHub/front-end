import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Signal, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '@components/header/header.component';
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
} from '@ionic/angular/standalone';
import { AlertEventRole } from '@models/app.models';
import { OverlayEventDetail } from '@models/ionic.models';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AlertService } from '@services/alert/alert.service';
import { addIcons } from 'ionicons';
import { createOutline } from 'ionicons/icons';
import { filter, take } from 'rxjs';

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
  ],
})
export default class ProfilePage {
  private readonly usersStore = inject(UsersStore);
  private readonly alertService = inject(AlertService);
  private readonly translateService = inject(TranslateService);

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

  private buildDeleteAccountAlertOptions(): AlertOptions {
    return {
      message: this.translateService.instant('profile.detele_acount_alert.message'),
      buttons: [
        {
          text: this.translateService.instant('profile.detele_acount_alert.cancel_btn'),
          role: AlertEventRole.Cancel,
        },
        {
          text: this.translateService.instant('profile.detele_acount_alert.confirm_btn'),
          role: AlertEventRole.Confirm,
        },
      ],
    };
  }
}
