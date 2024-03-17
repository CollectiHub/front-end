## Naming

Naming conventions are hugely important to maintainability and readability. In order to keep codebase consistent in terms of rxjs naming, the following conventions have been considered to apply:
- **Do** use `Subject` suffix for subjects (e.g.: `fooSubject$ = new Subject();`).
- **Do** use `$` suffix for observables (e.g.: `foo$ = fooSubject.asObservable();`).
- **Don't** suffix an array of subjects/observables (e.g. `foos = [foo$];`).

## Unsubscribe

In order to avoid memory leaks and unexpected behavior (side effects) you should **always** unsubscribe from active subscriptions when a `component`/`pipe`/`directive` have being destroyed. 
It's the best to unsubscribe from **all** manually subscribed observables even they are complete automatically on some result (e.g. angular http client [completes](https://github.com/angular/angular/blob/master/packages/common/http/src/xhr.ts#L193-L193) an observable on response) 
to reduce an effort on code review (to not jump for implementation) and to make sure memory leaks not happened. 
Unsubscription should be done via build in `takeUntilDestroyed` or `take(n)` operator.
