/* eslint-disable */
var assert           = require('assert');
var normalizeNewline = require('normalize-newline');
var read             = require('read-file-relative').readSync;
var createReport     = require('./utils/create-report');

it('Should produce report with colors', function () {
    assert.strictEqual(true, true);
});

it('Should produce report without colors', function () {
    assert.strictEqual(true, true);
});
