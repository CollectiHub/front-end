# Code standard

In order to be able test different functionality locally - we have a list of dedicated users, that correspond to specific functionality:

Auth:

- login400Error@g.gg - will throw 400 error durring login
- register400Error@g.gg - will throw 400 erorr during registration

Users:

- useralreadyverified123123123 - will throw 400 error (user already verified) for email verification
- requestPasswordError@gg.gg - will throw 400 error during password reset
- verifyPasswordCode123123123 - code, that will throw error durrin reset password verification
- updateError@gg.gg - use thi email during user data update, to throw 400 error
- 1234oldpass@@ - use this as old password, to throw 400 error during password change

Collection:

- use 'showerror' as search term - to receive error for 'search' cards request;
- update card with id '3' (R-003) to receive error for 'update' cards request;
- try to fetch cards for 'SSR' rarity, to receive error for fetching cards by rarity;
