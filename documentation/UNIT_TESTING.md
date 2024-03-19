## Unit Testing

There are numerous benefits to writing unit tests; they help with regression, provide documentation, and facilitate good design.
For this reason unit-tests are required to add in the deliverable code.

### Characteristics of a good unit test

- Fast. Unit tests should take very little time to run. Milliseconds.
- Simple. Unit tests should be small and easy to understand.
- Isolated. Unit tests are standalone, can be run in isolation, and have no dependencies on any outside factors such as Window, Document, Navigator objects.
- Deterministic. Running a unit test should be consistent with its results, that is, it always returns the same result if you do not change anything in between runs.
- Timely. A unit test should not take a disproportionately long time to write compared to the code being tested. If you find testing the code taking a large amount of time compared to writing the code, consider a design that is more testable.

### Code coverage

- High code coverage does not guarantee that the covered lines or branches have been tested correctly, it just guarantees that they have been executed by a test.
- Low code coverage number does guarantee that large areas of the product are going completely untested.

**During code review make sure that the coverage is high. Also pay attention at the correctness and quality of tests.**

### We do not use Integration Tests and TestBeds

TestBeds are designed for integration level tests. Integration tests are focused on testing the interaction between multiple components. These tests are more fragile and more difficult to maintain. On top of these they are very slow.
For this reason we decided to avoid integration tests and TestBed in generally.

### Plain tests as TestBed alternative

Since Angular is OOP driven, every entity (Component, Directive, Pipe, Service...) represents a class. Classes are units than can be tested in a plain fashion. Plain tests are:

- Faster. In some cases plain tests are faster than TestBeds by 10x.
- Smaller. Do not require additional configuration as TestBeds do.
- Simpler. Allow to test class directly without the necessity to interact with TestBeds API.

### Mocking

We use ```jest-mock-extended``` because:
- Provides complete Typescript type safety for interfaces, argument types and return types
- Ability to mock any interface or object
- calledWith() extension to provide argument specific expectations, which works for objects and functions.
- Extensive Matcher API compatible with Jasmine matchers
- Supports mocking deep objects / class instances.
- Familiar Jest like API

#### Mocking Example
```
import { mock } from 'jest-mock-extended';

interface PartyProvider {
   getPartyType: () => string;
   getSongs: (type: string) => string[]
   start: (type: string) => void;
}

describe('Party Tests', () => {
   test('Mock out an interface', () => {
       const mock = mock<PartyProvider>();
       mock.start('disco party');
       
       expect(mock.start).toHaveBeenCalledWith('disco party');
   });
   
   
   test('mock out a return type', () => {
       const mock = mock<PartyProvider>();
       mock.getPartyType.mockReturnValue('west coast party');
       
       expect(mock.getPartyType()).toBe('west coast party');
   });
});
```
#### Assigning Mocks with a type
If you wish to assign a mock to a variable that requires a type in your test, then you should use the MockProxy<> type given that this will provide the apis for calledWith() and other built-in jest types for providing test functionality.
```
import { MockProxy, mock } from 'jest-mock-extended';

describe('test', () => {
    let myMock: MockProxy<MyInterface>;

    beforeEach(() => {
        myMock = mock<MyInterface>();
    })

    test(() => {
         myMock.calledWith(1).mockReturnValue(2);
         ...
    })
});
```

#### calledWith() Extension
```jest-mock-extended``` allows for invocation matching expectations. Types of arguments, even when using matchers are type checked.
```
const provider = mock<PartyProvider>();
provider.getSongs.calledWith('disco party').mockReturnValue(['Dance the night away', 'Stayin Alive']);
expect(provider.getSongs('disco party')).toEqual(['Dance the night away', 'Stayin Alive']);

// Matchers
provider.getSongs.calledWith(any()).mockReturnValue(['Saw her standing there']);
provider.getSongs.calledWith(anyString()).mockReturnValue(['Saw her standing there']);
```
You can also use mockFn() to create a jest.fn() with the calledWith extension:
```
 type MyFn = (x: number, y: number) => Promise<string>;
 const fn = mockFn<MyFn>();
 fn.calledWith(1, 2).mockReturnValue('str');
```
[Read More](https://github.com/marchaos/jest-mock-extended)

#### classWithProviders
The `classWithProviders` function is used to create an instance of a class with provided mock mock dependencies. It takes a configuration object with two properties: `providers` and `token`.

##### Example
import { classWithProviders } from '@ngx-unit-test/inject-mocks';

// Create an instance with mock dependencies
const instance = classWithProviders({
    providers: [{ provide: MyService, useValue: mockService }],
    token: MyClass,
})

Now `instance` is an instance of `MyClass` with mock dependencies injected.

### Best Practices

- One Assertion in One Test Method. That means, one unit test should test one use-case and no more.
- Avoid Test Interdependence. Tests should be ready to run in any order on any machine without affecting any other test in the suite.
- Use Clear Test Description. Tests must be reasonable so that, in case of a test failure, devs can quickly understand which particular module is malfunctioning.
- Avoid Logic. Unit tests should be written with minimal to zero manual strings concatenation and logical conditions like while, if, switch, for, etc. Without too many conditions, tests are also likely to be deterministic.
- Follow AAA pattern. Structure your tests in the Arrange-Act-Assert manner.
- Prefer Helper Methods for Data Setup. This shall help re-usability and readability instead of setting up too much in each test set up.
- Test Only Public API. Private method logic can be tested simply using Public interface using it including all possible scenarios.


