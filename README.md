# QA Touch
Test Together

Collaborative Test Case Management tool For Modern QA Teams

# QA Touch Reporter for TestCafe

Pushes test results into QA Touch system.

## Installation

```shell
npm i testcafe-reporter-qatouch
```

## Usage
Ensure that your QA Touch API is enabled and generate your API keys. See https://doc.qatouch.com/#qa-touch-api

Add .env file to testcafe root folder with following keys:

```Javascript

QATOUCH_DOMAIN=your-domain
QATOUCH_API_TOKEN=your-api-toekn
QATOUCH_PROJECT_KEY=Project-Key
QATOUCH_TESTRUN_ID=Test-Run-Id

```


In order to use reporter, you should add meta information to your tests. Meta key should be TRXXX ID (TestRun Code in qatouch), e.g.:

```Javascript
test
    .meta({ 'TRID': ['TR001'] })
    ('My first test', async t => {
        await t
            .typeText('#developer-name', 'John Smith')
            .click('#submit-button')
            .expect(Selector('#article-header').innerText).eql('Thank you, John Smith!');
    });

```

Note: TRID key in meta information must be in array format ``` .meta({ 'TRID': ['TR001'] }) ```

Only passed, untested and failed tests will be published in QA Touch Test Run.

When you run tests from the command line, specify the reporter name by using the `--reporter` option:

```
testcafe chrome 'path/to/test/file.js' --reporter qatouch
```


When you use API, pass the reporter name to the `reporter()` method:

```js
testCafe
    .createRunner()
    .src('path/to/test/file.js')
    .browsers('chrome')
    .reporter('qatouch') // <-
    .run();
```

## Options

**domain**: *string* domain name of your QA Touch instance (e.g. dckap)

**apiToken**: *string* API token for user which will be created in the edit profile menu in your domain login

**projectKey**: *number* project key with which the tests are associated

**testRunId**: *number* test run Id with which the tests are associated

## References
- https://www.npmjs.com/package/wdio-qatouch-reporter
- https://qatouch.com/
- https://help.qatouch.com/
- https://doc.qatouch.com/
