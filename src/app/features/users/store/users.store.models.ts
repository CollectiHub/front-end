import { UserDataDto } from '../users.models';

export interface UsersState {
  data: UserDataDto | undefined;
}
