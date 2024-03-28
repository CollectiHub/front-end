import ResetPasswordComponent from './reset-password.page';

describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;

  beforeEach(() => {
    component = new ResetPasswordComponent();
  });

  describe('getControlError', () => {
    it('should return "validation.required" text if such error in form control', () => {
      const result = component.getControlError({ required: true });

      expect(result).toBe('validation.required');
    });

    it('should return "validation.invalid_email" text if control error is not required', () => {
      const result = component.getControlError({ noRequired: true });

      expect(result).toBe('validation.invalid_email');
    });
  });
});
