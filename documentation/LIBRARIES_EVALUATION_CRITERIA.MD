# Description

In order, to increase the project stability and the code quality at all - we need to pay attention
to some specific evaluation criteria, during library choosing.

## Criterias

1. **Utility** - we should have a real, well argument reason why do we need to use the 3rd party library and what problem it will solve.

2. **Licensing** - library should have a license, to allow us to use it for the project purposes (_MIT for example_).<br/>
   Libraries with paid subscription are more of a priority, because of support reason.

3. **Activity** - library should be <u>'alive'</u>. Means that community or owners are updating the library in order to bring a new feature or support existing.<br/>
   If library has no updates for a year (_for example_) - means that library was abandoned.

4. **Community** - library should be popular enough. Means that amount of weekly downloads should not be very small.
   If library has ~200 weekly downloads, means that probably some more popular library exists or there is no need in library at all.

5. **Amount of open issues** - library should not have a lot of open issues in repo. Amount of issues is corresponding to library size.<br/>
   _For example:_<br/> 200 issues for a small tool library - too much. <br/> 200 issues for angular cli - ok.

6. **Performance** - we should have some measurements of library performance, in cases when it is possible in order to see the benefits of having the library.

7. **Documentation** - library should have some documentation with instructions how to use it.

8. **Compatibility** - library should be compatible with the project requirements and needs, like browsers, framework support and so on.

9. **Library size** - in case of existing two or more libraries, that are doing the same thing - preferable library with a smaller bundle size. <br/>
   Use https://bundlephobia.com/ for size evaluation.
