# Description

Git branching strategy it is something very important, that could have effect on whole application delivering processes.
In order, to have a clear and simple strategy, following approach should be followed

`Main branch` - branch that contains production ready code, that should be deployed and available to end users (prod/staging environments).
`Develop branch` - branch for developers, where new features will be implemented and tested (test/dev environment).
`release-n.n` - release branch, that should be created from `develop` branch, and after it will be fully tested - should be merged into `master` branch.
`hotfix-n-n` - hotfix branch, that should be created from `master` branch, and after it will be fully tested - should be merged into `master`.

## Cherry-pick

In case with `release-n.n` and `hotfix-n-n` branched - we should keep `develop` branch also up to date with possible changed.
To make this possible - we should chery-pick merged tickets from `release-n.n` or `hotfix-n-n` to `develop`.

### Example

Correct `MR` ---merged----> `release-1.0` ----chery-pick----> `develop`

Not correct `MR` ---merged----> `develop` ----chery-pick----> `release-1.2`

Not correct `MR` ---merged----> `release-1.0` no cherry pick to `develop`
