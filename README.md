# testcafe-reporter-qatouch
[![Build Status](https://travis-ci.org/gitdckap/testcafe-reporter-qatouch.svg)](https://travis-ci.org/gitdckap/testcafe-reporter-qatouch)

This is the **qatouch** reporter plugin for [TestCafe](http://devexpress.github.io/testcafe).

<p align="center">
    <img src="https://raw.github.com/gitdckap/testcafe-reporter-qatouch/master/media/preview.png" alt="preview" />
</p>

## Install

```
npm install testcafe-reporter-qatouch
```

## Usage

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

## Author
premnathm (https://qatouch.com)
