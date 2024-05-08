# Basic Coding Assessment

This repo contains a brief assessment of Javascript and Typescript for engineering candidates. The goal is to take a look at the `/src/index.ts` file that contains a number of functions in it. Each function is written in a somewhat less-than-ideal manner. There could be performance improvements in some or readability improvements in others. The objective is to refactor the functions in a way the candidate feels is appropriate and/or get broken function working so they pass the tests.

Some principles to keep in mind that might be helpful:

1. Performance
2. Readability
3. Scalability
4. Stewardship
5. DRY principles
6. Proper abstraction
7. Functional/Declarative programming principles (optional but encouraged)
8. Formatting and linting
9. Leverage native language constructs
10. Testability of code/functions
11. Language standards compliance
12. Proper typing
13. TypeScript considerations
14. Comments as necessary
15. Error checking and resilience

# Hints

This is a very subjective exercise but there is also a lot of room for improvement in the code from most of the suggestions above. Feel free to change variables, flow, add functions, modify logic, make assumptions about use, etc. as long as the tests still pass. You may find that by changing some code, you will also need to change some Typescript declarations. You are also welcome to create new helpers/modules or install new NPM packages if you deem appropriate.

We encourage copious comments to explain your code changes. Target your explanations as if they were geared towards a Jr Software Engineer. It may be that you see perfectly good code and that’s fine as long as you can explain why you feel that way. We highly suggest that you leverage the linting options already enabled in the repo.

# Running

This template comes packaged with a `start` and `watch-and-run` NPM script.

`npm start` - TSC compile and run the index.ts file in non-watch mode.

`npm run watch-and-run` - TSC compile and run your index.js in watch mode which will recompile and restart the server on file changes.

`npm test` - Run TSC and execute all `*.test.ts` files.

# Submitting Your Work

1. Simply zip up your work, excluding the `node_modules` directory, and send it to the recruiter working with you!
