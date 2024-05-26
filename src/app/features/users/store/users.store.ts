import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { GenericApiResponse } from '@models/api.models';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { switchWith } from '@tools/rxjs/switch-with.operator';
import { pipe, switchMap } from 'rxjs';

import { UsersApiService } from '../services/users-api.service';
import { UpdateUserBody, UserDataDto } from '../users.models';

import { USERS_INITIAL_STATE } from './users.state';

export const UsersStore = signalStore(
  { providedIn: 'root' },
  withState(USERS_INITIAL_STATE),
  withMethods(store => {
    const usersApiService = inject(UsersApiService);
    const router = inject(Router);

    return {
      updateUserData: rxMethod<UpdateUserBody>(
        pipe(
          switchWith((updateData: UpdateUserBody) => usersApiService.updateUserData$(updateData)),
          tapResponse(
            ([updateData]: [UpdateUserBody, GenericApiResponse]) => {
              patchState(store, state => ({ userData: { ...state.userData!, ...updateData } }));
              void router.navigate(['/profile']);
            },
            () => {},
          ),
        ),
      ),
      updateVerified: rxMethod<string>(
        pipe(
          switchMap((code: string) => usersApiService.verifyEmail$(code)),
          tapResponse(
            () => patchState(store, state => ({ userData: { ...state.userData!, verified: true } })),
            () => {},
          ),
        ),
      ),
      deleteUser: rxMethod(
        pipe(
          switchMap(() => usersApiService.deleteUser$()), // trigger logout too
          tapResponse(
            () => patchState(store, { userData: undefined }),
            () => {},
          ),
        ),
      ),
      loadUserData: rxMethod<void>(
        pipe(
          switchMap(() => usersApiService.getUserData$()),
          tapResponse(
            (userData: UserDataDto) => {
              patchState(store, { userData });
            },
            () => {},
          ),
        ),
      ),
    };
  }),
);
