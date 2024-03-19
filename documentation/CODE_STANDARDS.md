# Code standard

When contributing code to the project there are a few general rules that should be followed no matter which part of the project the code belongs, these are:

- Don’t be stupid.
- YAGNI.
- DRY.
- Use good and clear names.
- 120 characters maximum line length.
- No hacks.
- Don't do refactorings on feature branches.

## General

- Use kebab-case for file names.

> Reason: Good to follow angular conventions.

- Don’t put new functionality on existing objects like Math, Date, String etc.

- Don’t export free functions, variables, put them in a namespace to avoid name conflicts and improve readability.

- Use parameter objects instead of long argument lists.

- Use functional methods (forEach, map, filter etc) instead of for loops, where is is possible.

- Try to keep things reactive using RxJS/signals.

- Use lambdas instead of Function.bind to bind correct `this` to function.

- Event callbacks should be named on{event_name}. For example onClick, onKeydown etc.

- Use truthy check for objects (`!object`, `!!object`) to check against `null` and `undefined`.

- Enum values should be strings because from a development perspective it does not matter, and it will give more readable logs.

- Don't apply refactoring or code format in a branch with other changes.

> Reason: Easier code review. Reviewers will be focused only on the necessary changes. Feel free to create a different branch in order to apply the code formatting / refactoring.

- Use local variables to describe complex conditions.

Instead of this

```
if (hasFourWeels && hasSteeringWheel && hasAdriver && redColor) {
  console.log("it's a red car");
}
```

Do this

```
const isCar = hasFourWeels && hasSteeringWheel && hasAdriver;
if (isCar && redColor) {
  console.log("it's a red car");
}
```

> Reason: Increasing code readability.

- If something is reused 3+ times move it in a service/component.

> Reason: The rule of 3.

## Typescript

- Use camelCase for variable, properties and function names.

> Reason: Conventional JavaScript.

- Use uppercase for variables and objects those are hardcoded and truly constant (don't supposed to be changed during runtime).

- Use `PascalCase` for class, interface and enum names.

> Reason: This is actually fairly conventional in standard JavaScript. enums are included here because it's the convention used by the typescript team.

- **Don't** prefix interfaces with `I`.

> Reason: Unconventional. `lib.d.ts` defines important interfaces without an `I` (e.g. Window, Document etc).

- Use `PascalCase` for enum member.

> Reason: Convention followed by TypeScript team i.e. the language creators e.g `SyntaxKind.StringLiteral`. Also helps with translation (code generation) of other languages into TypeScript.

- Use `camelCase` of class/interface members and methods.

> Reason: Naturally follows from variable and function naming convention.

- Use `undefined` in general (do consider returning an object like `{valid:boolean,value?:Foo}` instead).

- Don't use postfix or prefix for constants, members or variables unless it's an Observable, in which case use $ postfix.

> Reason: this is usually not needed since typescript provides the type already and changing the type will make the naming lie, and `$` for Observable is angular convention. One exception to this rule exists in the testing, where we use `Subject` postfix to indicate subjects, since this helps asynchronicity in the test suite, some also prefer `$` postfix for this.

- Try to keep your services/mappers etc. close to your component.

> Reason: Better Architecture

- Don't make things shared unless it's really required.

- **Don't** use short naming like `txt`, use `text` instead.

> Reason: Increasing code readability.

- Use **CSS** variables instead of \*_SCSS_

> Reason: CSS variables can be changed in run-time via JS and they should not go through compilation process.

## Angular

- Use `@Injectable()`, since this gives us better control over DI.

- Use `ChangeDetectionStrategy.OnPush` and avoid function calls in the template because function is executed every time Angular change detection runs and that can be many times.

> Reason: Better performance since Angular doesn't have to traverse the entire component tree structure for detecting individual changes on properties. Also, Angular internally can skip the nested tree structures when inputted properties don't change.

- Use `inject` function instead of injection via constructor.

> Reason: it provides more context and looks more readable and accurate. Also, it makes possible to build extended components without messy constructor.

- All components should have:
  - html file (component.html),
  - styles file (component.scss),
  - test file (component.spec.ts),
  - ts file (component.ts)

> Reason: Default angular component generation. Even if your components don't have something to test you don't know if this will always be the case.

- Don't use `TestBed`. When you create a component with angular cli, will automatically create the test file with `TestBed` included.

> Reason: Performance of test runner, easier mock dependencies and more readable unit tests.

- Create only standalone components, directives, pipes. To do this - put `standalone: true` to your entity decorator.

> Reason: It is a brand-new way to organize application structure that make possible for us to drop a lot of boilerplate (modules).

- If your component has required input property - use `required` options object.

- Use self-closing tags for you components. (use `<my-component/>` instead of `<my-component></my-component>`).

- When you need to have local store in your component - use signals instead of Subjects.

- **Do not** use routing module for routed organization. Build routes in a [standalone way](https://medium.com/@zayani.zied/angular-application-based-on-standalone-components-with-lazy-loading-and-shared-elements-417f36682968).

> Reason: Signals are a brand-new way to organize your code that require much less code and more readable.

- Always have an unsubscription mechanism when subscribing to an observable.
  - For component-code that affects the DOM, prefer to use an `async` pipe in the HTML template. That way the lifecycle is automatically taken care of by Angular.
  - For unsubscription - use build in `takeUntilDestroyed` function or `take(n)`.
  - For one-offs, where adding subscription handling might make the code harder to read, you may use `pipe(take(1))`. However, use it with caution. One example where `take(1)` might never be reached and subscription will remain alive is when we use `filter()` before `take(1)`

## Github

- Use good titles and good descriptions when you create a Merge request. You should have videos or screenshots in the description for presenting the changes. Before your code, and after your code.

<details>
  <summary>List of tools to record videos</summary>

- [Screen Recorder](https://chrome.google.com/webstore/detail/screen-recorder/hniebljpgcogalllopnjokppmgbhaden)
- [Scrnli Screenshot & Screen Video Recorder](https://chrome.google.com/webstore/detail/scrnli-screenshot-screen/ijejnggjjphlenbhmjhhgcdpehhacaal?hl=en)
- [Awesome Screenshot and Screen Recorder](https://chrome.google.com/webstore/detail/awesome-screenshot-and-sc/nlipoenfbbikpbjkfpfillcgkoblgpmj?hl=en-US)
</details>

> Reason: Code review. History.

- Branch names should have:

1. The task id (TICKETCODENAME-0001)
2. The title of the task "Remove Bonus" (remove-bonus)

- Merge 1 and 2 with an underscore `_`. The result should be like this `TICKETCODENAME-0001_remove-bonus`

> Reason: Better git history. You can see the merged commits later and understand what the commit includes.

- Always try to use small merge requests (~300 lines of changes). If something is big then use a feature branch.

> Reason: Easier code review. We can catch issues easier, and we can finish the review quicker.

- Do not squash your commits before merging your branch to develop

> Reason: To have detailed history of changes