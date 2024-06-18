import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { AuthApiService } from '@features/auth/services/auth-api/auth-api.service';
import { GenericApiResponse } from '@models/api.models';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { TranslateService } from '@ngx-translate/core';
import { LoaderService } from '@services/loader/loader.service';
import { StorageService } from '@services/storage/storage.service';
import { switchWith } from '@tools/rxjs/switch-with.operator';
import { concat, forkJoin, from, pipe, switchMap, take } from 'rxjs';

import { UsersApiService } from '../services/users-api.service';
import { UpdateUserBody, UserDataDto } from '../users.models';

import { USERS_INITIAL_STATE } from './users.state';

export const UsersStore = signalStore(
  { providedIn: 'root' },
  withState(USERS_INITIAL_STATE),
  withMethods(store => {
    const usersApiService = inject(UsersApiService);
    const authApiService = inject(AuthApiService);
    const router = inject(Router);
    const storageService = inject(StorageService);
    const loaderService = inject(LoaderService);
    const translateService = inject(TranslateService);

    return {
      clear(): void {
        patchState(store, { userData: undefined, error: undefined });
      },
      setUserData(userData: UserDataDto): void {
        patchState(store, { userData });
      },
      setEmailVerified(): void {
        patchState(store, state => ({ userData: { ...state.userData!, verified: true } }));
      },
      setError(error: string): void {
        patchState(store, { error });
      },
      updateUserData: rxMethod<UpdateUserBody>(
        pipe(
          switchWith((updateData: UpdateUserBody) => usersApiService.updateUserData$(updateData)),
          tapResponse(
            ([updateData]: [UpdateUserBody, GenericApiResponse]) => {
              patchState(store, state => ({ userData: { ...state.userData!, ...updateData } }));
              void router.navigate(['/profile']);
            },
            (error: HttpErrorResponse) => {
              const errorMessage = error.error.message;

              patchState(store, { error: errorMessage });
            },
          ),
        ),
      ),
      deleteUser: rxMethod<void>(
        pipe(
          switchMap(() => {
            const apiRequests = [usersApiService.deleteUser$(), authApiService.logout$()];
            const cleanStore$ = from(storageService.clear$().pipe(take(1)));
            const clearPreferences$ = from(Preferences.clear());

            const localCleanups$ = forkJoin([cleanStore$, clearPreferences$]);
            const stream$ = forkJoin([concat(...apiRequests, localCleanups$)]);

            return loaderService.showUntilCompleted$(
              stream$,
              translateService.instant('profile.delete_account_loader'),
            );
          }),
          tapResponse(
            () => {
              patchState(store, { userData: undefined, error: undefined });

              void router.navigate(['/registration']);
            },
            (error: HttpErrorResponse) => {
              const errorMessage = error.error.message;

              patchState(store, { error: errorMessage });
            },
          ),
        ),
      ),
    };
  }),
);
