import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { AppConstants } from '@constants/app.constants';
import { AuthApiService } from '@features/auth/services/auth-api.service';
import { GenericApiResponse } from '@models/api.models';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { StorageService } from '@services/storage/storage.service';
import { switchWith } from '@tools/rxjs/switch-with.operator';
import { catchError, forkJoin, from, pipe, switchMap, tap } from 'rxjs';

import { UsersApiService } from '../services/users-api.service';
import { UpdateUserBody, UserDataDto } from '../users.models';

import { USERS_INITIAL_STATE } from './users.state';
import { LoaderService } from '@services/loader/loader.service';

export const UsersStore = signalStore(
  { providedIn: 'root' },
  withState(USERS_INITIAL_STATE),
  withMethods(store => {
    const usersApiService = inject(UsersApiService);
    const authApiService = inject(AuthApiService);
    const router = inject(Router);
    const storageService = inject(StorageService);
    const loaderService = inject(LoaderService);

    const logoutUser = () => {
      return authApiService.logout$().pipe(
        switchMap(() => storageService.remove$(AppConstants.tokenStorageKey)),
        tap(() => router.navigate(['/login'])),
      );
    };

    return {
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
      updateVerified: rxMethod<string>(
        pipe(
          switchMap((code: string) => usersApiService.verifyEmail$(code)),
          tapResponse(
            () => patchState(store, state => ({ userData: { ...state.userData!, verified: true } })),
            (error: HttpErrorResponse) => {
              const errorMessage = error.error.message;

              patchState(store, { error: errorMessage });
            },
          ),
        ),
      ),
      deleteUser: rxMethod<void>(
        pipe(
          // TODO: add one loader for delete user and logout actions
          switchMap(() => usersApiService.deleteUser$()),
          switchMap(() => authApiService.logout$()),
          switchMap(() => forkJoin([from(storageService.clear$()), from(Preferences.clear())])),
          tapResponse(
            () => {
              patchState(store, { userData: undefined, error: undefined });

              void router.navigate(['/register']);
            },
            (error: HttpErrorResponse) => {
              const errorMessage = error.error.message;

              patchState(store, { error: errorMessage });
            },
          ),
        ),
      ),
      logoutUser: rxMethod<void>(
        pipe(
          switchMap(() => authApiService.logout$()),
          switchMap(() => storageService.remove$(AppConstants.tokenStorageKey)),
          tap(() => router.navigate(['/login'])),
        ),
      ),
      loadUserData: rxMethod<void>(
        pipe(
          switchMap(() => usersApiService.getUserData$()),
          tapResponse(
            (userData: UserDataDto) => patchState(store, { userData }),
            (error: HttpErrorResponse) => {
              throw error;
            },
          ),
          catchError(() => logoutUser()),
        ),
      ),
    };
  }),
);
