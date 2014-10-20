'use strict';

var lookup = require('../../../index');

function lookupAppCaller() {
    var appFile = lookup.resolve(__dirname, './app.js');
    return lookup(appFile);
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
