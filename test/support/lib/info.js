'use strict';

var lookup = require('../../../index');

function lookupAppCaller() {
    return lookup(__dirname, './app.js');
}

function lookupThisFileCaller() {
    return lookup(__filename);
}

/* the file used to exports the app caller ( or self file caller ) */
module.exports = function() {
    return {
        caller: lookupAppCaller() || lookupThisFileCaller()
    };
};
