import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { GenericApiResponse } from '@models/api.models';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { switchWith } from '@tools/rxjs/switch-with.operator';
import { pipe, switchMap } from 'rxjs';

import { UsersApiService } from '../services/users-api.service';
import { UpdateUserBody } from '../users.models';

import { USERS_INITIAL_STATE } from './users.state';

export const UsersStore = signalStore(
  { providedIn: 'root' },
  withState(USERS_INITIAL_STATE),
  withMethods(store => {
    const usersApiService = inject(UsersApiService);
    const router = inject(Router);

    return {
      updateUserData: rxMethod(
        pipe(
          switchWith((updateData: UpdateUserBody) => usersApiService.updateUserData$(updateData)),
          tapResponse(([updateData]: [UpdateUserBody, GenericApiResponse]) => {
            patchState(store, state => ({ data: { ...state.data!, ...updateData } }));
            void router.navigate(['/profile']);
          }),
        ),
      ),
      updateVerified: rxMethod(
        pipe(
          switchMap((code: string) => usersApiService.verifyEmail$(code)),
          tapResponse(() => patchState(store, state => ({ data: { ...state.data!, verified: true } }))),
        ),
      ),
      deleteUser: rxMethod(
        pipe(
          switchMap(() => usersApiService.deleteUser$()),
          tapResponse(() => patchState(store, { data: undefined })),
        ),
      ),
      loadUserData: rxMethod(
        // TODO: Add loading user data and tirgger it in private scope
        // read data from store in profile page
        // connect password change and user data change to store
        pipe()
      )
    };
  }),
);
