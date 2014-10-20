'use strict';

var path = require('path');

/**
*   Lookup caller for a specific file
*/
function lookupFileCaller(targetFile) {
    /* get the strack trace from this file */
    var originalPrepareStackTrace = Error.prepareStackTrace,
        stackTrace;

    Error.prepareStackTrace = function(_, stack) {
        Error.prepareStackTrace = originalPrepareStackTrace;
        return stack;
    };

    stackTrace = (new Error()).stack;

    /* get the target file name */
    targetFile = path.normalize( targetFile || __filename );

    var nextFileIsCaller = false,
        targetFileCaller = '';

    /*
    console.log(targetFile);
    console.log(stackTrace.map(function(frame) {
        return frame.getFileName();
    }));
    */

    stackTrace.every(function(frame) {
        var frameFile = path.normalize( frame.getFileName() );

        if (nextFileIsCaller) {
            if (frameFile !== 'module.js' && /* skip if frame is native code */
                frameFile !== targetFile) {  /* skip if frame still in called file */
                nextFileIsCaller = false;
                targetFileCaller = frameFile;
                return false; /* break if get the caller */
            }
        } else if (frameFile === targetFile) {
            nextFileIsCaller = true;
            /* if current frame is target file, then next frame is caller */
        }

        return true; /* return true to conitue the iterate */
    });

    return targetFileCaller;
}

module.exports = lookupFileCaller;
module.exports.resolve = path.resolve;
