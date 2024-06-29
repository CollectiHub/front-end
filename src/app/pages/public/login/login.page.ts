import { HttpErrorResponse } from '@angular/common/http';
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
import { UsersApiService } from '@features/users/services/users-api.service';
import { UsersStore } from '@features/users/store/users.store';
import { UserDataDto } from '@features/users/users.models';
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
import { LoaderService } from '@services/loader/loader.service';
import { StorageService } from '@services/storage/storage.service';
import { switchWith } from '@tools/rxjs/switch-with.operator';
import { switchMap, take, tap } from 'rxjs';

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
  private readonly usersApiService = inject(UsersApiService);
  private readonly usersStore = inject(UsersStore);
  private readonly router = inject(Router);
  private readonly loaderService = inject(LoaderService);

  loginForm = this.formBuilder.group<LoginForm>({
    email: this.formBuilder.control(undefined, [Validators.required, Validators.pattern(RegularExpressions.email)]),
    password: this.formBuilder.control(undefined, [Validators.required]),
  });

  onLoginFormSubmit(): void {
    if (!this.loginForm.valid) return;

    const loginRequestsChain$ = this.authApiService.login$(<LoginBody>this.loginForm.value).pipe(
      switchWith((token: string) => this.storageService.set$(AppConstants.tokenStorageKey, token)),
      switchMap(([token]) => this.fetchUserData$(token)),
    );

    this.loaderService
      .showUntilCompleted$(loginRequestsChain$)
      .pipe(take(1))
      .subscribe((userData: UserDataDto) => {
        this.usersStore.setUserData(userData);
        this.router.navigate(['/collection']);
      });
  }

  private fetchUserData$(token: string) {
    return this.usersApiService.getUserData$(token).pipe(
      tap({
        error: (error: HttpErrorResponse) => {
          this.usersStore.setError(error.error.message);
          void this.router.navigate(['/user-data-fetch-failed']);
        },
      }),
    );
  }
}
