import { HttpContextToken } from '@angular/common/http';

export namespace AuthConstants {
  export const skipAuthContextToken = new HttpContextToken<boolean>(() => false);
  export const skipLoadingToken = new HttpContextToken<boolean>(() => false);
}
