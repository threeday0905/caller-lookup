'use strict';

/**
 * mock framework module (such as: midway.js )
 */
var info = require('./info');

module.exports = function() {
    return {
        caller: info().caller
    };
};
