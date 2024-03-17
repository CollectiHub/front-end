# Definition of done (To Be Confirmed)

You will only consider a story done when:

## You feel the UX is of a high quality.

It should be a delight for the user that is the primary actor for the story. You want them to like using our software, not suffer it.

## You feel the implementation is of a very high quality.

* You feel the architectural design is of high quality and contains good abstractions
* You have not introduced any new technical debt without clearing it with the rest of the team.
* You feel there are no obvious small refactoring (less than a day) left in your task.
* You feel you have implemented the reasonable acceptance tests that cover the story.
* You feel you have implemented the reasonable unit tests that cover the task.

## You feel the UI is of a very high quality.

* You use the modern CSS specs that work in most modern browsers such as Grid, Flexbox, logical properties, clamp, min, max, custom properties etc.
* Your images should use WebP format as well as fallback image with a png format. The images should also be optimized for Retina screens and mobile devices.
* You are avoiding duplicate CSS by taking advantage of SCSS loops, mixins etc.
* You have tested your changes on mobile devices using Browserstack including iOS.

## Reviewers have approved your merge request on Gitlab

Here your merge request will be reviewed by your team members. The necessary reviewers will check your merge request, leave a comment and other suggestions, and (hopefully) approve it.

Depending on the changes, you might need more or less reviewers.
* Changes to documents, configs, etc. might need more reviewers.
* And changes that have no visual representation require no designers.

For more details about the review process.

## QA has confirmed your task

When your task has been approved and merged, you can deploy to test environment. More details about deployment 
* After that you can move your task to the QA column and leave a comment on your task. Describe there what QA have to do in order to test, what parts of the app your changes affect, and how to replicate the bug if not stated.
* Inform QA that your task is ready to be tested. By sending them a message.

### The internal task exception

Sometimes you will work on something that can pass QA and won't affect the page at all such as:
* documentation
* mock gateway
* renames
* unit tests
* acceptance tests
* eslint configuration changes

These things only need to be reviewed in an merge request with the [INTERNAL] tag. 
