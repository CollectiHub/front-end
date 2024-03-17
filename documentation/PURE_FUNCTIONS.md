# Description

A Pure Function is a function (a block of code) that always returns the same result if the same arguments are passed.
It does not depend on any state or data change during a program’s execution.

Pure function example:

```angular2html
function calculateGST( productPrice ) {
    return productPrice * 0.05;
}
```

## Usage

In order, to have well-structured application - we should try to use only pure functions not only when
we are creating some util functions, but also when we are working with components.

### Pure functions in components

When we are working with component - all the functionality that can be extracted into a pure functions - should be extracted as a pure function into separate namespace in separate file, regardless of it access modifier.

Since Angular looks like OOP based application doesn't mean that should act like we are building OOP application.
In real world - JS has not multiple inheritance and even single inheritance we can meet very rarely.
It means, that we have actually any profit of using private or protected methods.
In order to improve our application architecture - we can ignore that functionality (_access modifiers in components_).

### Example

Not correct

```angular2html
@Component()
export class MyComponent {
  public filterSelectedItems(items: Item[]): string[] {
      return items.filter((item) => item.selected)  // Pure function should be extracted to separate namespace, in a separate file
  }
}
```

Correct

```angular2html
@Component()
export class MyComponent {
  public filterSelectedItems(items: Item[]): string[] {
      return MyComponentFunctions.filterSelectedItem(items); // Separate file that holds pure functions for this component.
  }
}
```

> Reason: Better code structure, force to use pure functions only, more readable, human understandable and super easy to test.
