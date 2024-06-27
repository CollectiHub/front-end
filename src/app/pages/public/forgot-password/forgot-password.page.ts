import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { EmailComponent } from '@components/email/email.component';
import { PublicHeaderComponent } from '@components/public-header/public-header.component';
import { RegularExpressions } from '@constants/regular-expressions';
import { UsersApiService } from '@features/users/services/users-api.service';
import { IonButton, IonContent, IonInput, IonItem, IonList } from '@ionic/angular/standalone';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ToastColor } from '@services/toast/toast.models';
import { ToastService } from '@services/toast/toast.service';
import { switchMap, take } from 'rxjs';

@Component({
  standalone: true,
  imports: [
    IonContent,
    IonList,
    IonItem,
    IonInput,
    IonButton,
    ReactiveFormsModule,
    TranslateModule,
    RouterLink,
    EmailComponent,
    PublicHeaderComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export default class ForgotPasswordComponent {
  private readonly usersApiService = inject(UsersApiService);
  private readonly toastService = inject(ToastService);
  private readonly translateService = inject(TranslateService);

  forgotPasswordControl = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required, Validators.pattern(RegularExpressions.email)],
  });

  submitForgotPassword(): void {
    if (!this.forgotPasswordControl.valid) return;

    const email = this.forgotPasswordControl.value;

    this.usersApiService
      .requestPasswordReset$(email)
      .pipe(
        switchMap(() => {
          const message = this.translateService.instant('forgot_password.toast', { email });

          return this.toastService.open$(message, ToastColor.Success);
        }),
        take(1),
      )
      .subscribe();
  }
}
