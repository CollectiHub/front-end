import { HttpContextToken } from '@angular/common/http';

export namespace AuthConstants {
  export const skipAuthContextToken = new HttpContextToken<boolean>(() => false);
}
