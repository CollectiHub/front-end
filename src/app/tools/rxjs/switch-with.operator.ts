import { Observable, OperatorFunction, map, switchMap } from 'rxjs';

export const switchWith = <T, R>(project: (outerValue: T) => Observable<R>): OperatorFunction<T, [T, R]> =>
  switchMap((outerValue: T) => project(outerValue).pipe(map((innerValue: R): [T, R] => [outerValue, innerValue])));
