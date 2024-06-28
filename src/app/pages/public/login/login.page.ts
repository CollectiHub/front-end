import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { EmailComponent } from '@components/email/email.component';
import { PasswordComponent } from '@components/password/password.component';
import { PublicHeaderComponent } from '@components/public-header/public-header.component';
import { SupportInfoComponent } from '@components/support-info/support-info.component';
import { AppConstants } from '@constants/app.constants';
import { RegularExpressions } from '@constants/regular-expressions';
import { LoginBody } from '@features/auth/auth.models';
import { AuthApiService } from '@features/auth/services/auth-api/auth-api.service';
import {
  IonButton,
  IonContent,
  IonFooter,
  IonInput,
  IonItem,
  IonList,
  IonText,
  IonToolbar,
} from '@ionic/angular/standalone';
import { TranslateModule } from '@ngx-translate/core';
import { StorageService } from '@services/storage/storage.service';
import { switchMap, take } from 'rxjs';

import { LoginForm } from './login.page.models';

@Component({
  standalone: true,
  imports: [
    IonFooter,
    IonToolbar,
    IonContent,
    IonList,
    IonItem,
    IonInput,
    IonButton,
    IonText,
    ReactiveFormsModule,
    TranslateModule,
    RouterLink,
    EmailComponent,
    PasswordComponent,
    PublicHeaderComponent,
    SupportInfoComponent,
  ],
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export default class LoginPage {
  private readonly formBuilder = inject(NonNullableFormBuilder);
  private readonly authApiService = inject(AuthApiService);
  private readonly storageService = inject(StorageService);
  private readonly router = inject(Router);

  loginForm = this.formBuilder.group<LoginForm>({
    email: this.formBuilder.control(undefined, [Validators.required, Validators.pattern(RegularExpressions.email)]),
    password: this.formBuilder.control(undefined, [Validators.required]),
  });

  onLoginFormSubmit(): void {
    if (!this.loginForm.valid) return;

    this.authApiService
      .login$(<LoginBody>this.loginForm.value)
      .pipe(
        switchMap((token: string) => this.storageService.set$(AppConstants.tokenStorageKey, token)),
        take(1),
      )
      .subscribe(() => this.router.navigate(['/collection']));
  }
}
