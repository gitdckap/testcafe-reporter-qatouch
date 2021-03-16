/* eslint-disable */
require('dotenv').config()
const QaTouch = require('./qatouch');
const options= {
    'domain' : process.env.QATOUCH_DOMAIN,
    'apiToken': process.env.QATOUCH_API_TOKEN,
    'projectKey': process.env.QATOUCH_PROJECT_KEY,
    'testRunId': process.env.QATOUCH_TESTRUN_ID
};

module.exports = function () {
    return {
        noColors: false,
        _results: [],
        qaTouch: new QaTouch(options),

        async reportTaskStart (startTime, userAgents, testCount) {
            this.startTime = startTime;
            this.testCount = testCount;

            this.write(`Running tests in: ${userAgents}`)
                .newline()
                .newline();
        },

        async reportFixtureStart (name) {
            this.currentFixtureName = name;
        },

        async reportTestDone (name, testRunInfo, meta) {
            const _this = this;
            const errors = testRunInfo.errs;
            const warnings = testRunInfo.warnings;
            const skipped = testRunInfo.skipped;
            const hasErrors = !!errors.length;
            const hasWarnings = !!warnings.length;
            const result = testRunInfo.skipped ? 'Untested' : hasErrors ? 'Failed' : 'Passed';

            name = `${this.currentFixtureName} - ${name}`;

            const title = `${result} -------- ${name}`;

            this.newline().write(title);

            if (hasErrors) {
                this.newline()
                    .write('Errors:');

                errors.forEach(error => {
                    this.newline()
                        .write(this.formatError(error));
                });
            }

            if (hasWarnings) {
                this.newline()
                    .write('Warnings:');

                warnings.forEach(warning => {
                    this.newline()
                        .write(warning);
                });
            }

            let status_id = this.qaTouch.statusConfig(result);
            let caseIds = this.qaTouch.TitleToCaseIds(meta.TRID);
            if (caseIds.length > 0) {
                let results = caseIds.map(caseId => {
                    return {
                        case_id: caseId,
                        status_id: status_id,
                    };
                });
                this._results.push(...results);
            }
        },

        async reportTaskDone (endTime, passed, warnings, result) {
            const durationMs = endTime - this.startTime;
            const durationStr = this.moment
                .duration(durationMs)
                .format('h[h] mm[m] ss[s]');

            let footer = result.failedCount ?
                `${result.failedCount}/${this.testCount} failed` :
                `${result.passedCount} passed`;

            footer += ` (Duration: ${durationStr})`;
            footer += ` (Skipped: ${result.skippedCount})`;
            footer += ` (Warnings: ${warnings.length})`;

            if (this._results.length === 0) {
                this.newline()
                    .write("No test cases were matched. Ensure that your tests are declared correctly and matches TRxxx");
                return;
            }
            this.qaTouch.publish(this._results);

            this.write(footer)
                .newline();
        }
    };
};
