import { UserDataDto } from '@features/users/users.models';

export interface UserDataFetchResult {
  error: string | undefined;
  data: UserDataDto | undefined;
}