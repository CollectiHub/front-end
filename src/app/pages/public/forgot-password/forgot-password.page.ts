import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '@components/header/header.component';
import { AppConstants } from '@constants/app.constants';
import { RegularExpressions } from '@constants/regular-expressions';
import { UsersApiService } from '@features/users/services/users-api.service';
import { IonicModule } from '@ionic/angular';
import { ToastOptions } from '@ionic/angular';
import { OverlayEventDetail } from '@models/ionic.models';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ToastService } from '@services/toast/toast.service';
import { Observable, switchMap, take } from 'rxjs';

@Component({
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule, TranslateModule, RouterLink, HeaderComponent],
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

  getControlError(errors: ValidationErrors | null): string {
    return errors?.['required'] ? 'validation.required' : 'validation.invalid_email';
  }

  submitForgotPassword(): void {
    if (!this.forgotPasswordControl.valid) return;

    const email = this.forgotPasswordControl.value;

    this.usersApiService
      .requestPasswordReset$(email)
      .pipe(
        switchMap(() => this.translateService.get('forgot_password.toast', { email })),
        switchMap((message: string) => this.openToast$(message)),
        take(1),
      )
      .subscribe();
  }

  private openToast$(message: string): Observable<OverlayEventDetail<void>> {
    const toastOptions: ToastOptions = {
      message,
      duration: AppConstants.toastDuration,
      cssClass: 'app-toast',
      position: 'bottom',
      color: 'success',
      buttons: [{ icon: 'close-outline', role: 'cancel' }],
    };

    return this.toastService.openWithListener$(toastOptions);
  }
}
