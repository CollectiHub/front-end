import { NEVER, of, take, throwError } from 'rxjs';

import { switchWith } from './switch-with.operator';

describe('SwitchWith', () => {
  describe('General', () => {
    it('should return array of inner and outer values in correct order', () => {
      const spy = jest.fn();
      const outerStream$ = of('outerValue');
      const innerStream$ = of('innerValue');

      outerStream$
        .pipe(
          switchWith(() => innerStream$),
          take(1),
        )
        .subscribe(spy);

      expect(spy).toHaveBeenCalledWith(['outerValue', 'innerValue']);
    });
  });

  describe('Inner value', () => {
    it('should not emit, if inner onservable not emitted', () => {
      const spy = jest.fn();
      const outerStream$ = of('outerValue');
      const innerStream$ = NEVER;

      outerStream$
        .pipe(
          switchWith(() => innerStream$),
          take(1),
        )
        .subscribe(spy);

      expect(spy).not.toHaveBeenCalled();
    });

    it('should not emit, if inner observable emitted error', () => {
      const spy = jest.fn();
      const outerStream$ = of('outerValue');

      outerStream$
        .pipe(
          switchWith(() => throwError(() => new Error('error'))),
          take(1),
        )
        .subscribe(spy);

      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('Outer value', () => {
    it('should not emit, if outer onservable not emitted', () => {
      const spy = jest.fn();
      const outerStream$ = NEVER;
      const innerStream$ = of('innerValue');

      outerStream$
        .pipe(
          switchWith(() => innerStream$),
          take(1),
        )
        .subscribe(spy);

      expect(spy).not.toHaveBeenCalled();
    });

    it('should not emit, if outer observable emitted error', () => {
      const spy = jest.fn();
      const innerStream$ = of('innerValue');

      throwError(() => new Error('error'))
        .pipe(
          switchWith(() => innerStream$),
          take(1),
        )
        .subscribe(spy);

      expect(spy).not.toHaveBeenCalled();
    });
  });
});
