import { UserDataDto } from '../users.models';

export interface UsersState {
  userData: UserDataDto | undefined;
  error: string | undefined;
}
