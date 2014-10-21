'use strict';

var path = require('path');

function getTargetFile() {
    /* default filename is self */
    if (!arguments.length) {
        return path.normalize(__filename);
    }

    var targetFile = arguments.length === 1 ?
        path.normalize(arguments[0]) :
        path.resolve.apply(path, arguments);

    if (targetFile[ targetFile.length - 1 ] === '/' ) {
        targetFile += 'index.js';
    } else if ( path.extname(targetFile) === '' ) {
        targetFile += '.js';
    }
    return targetFile;
}

/**
*   Lookup caller for a specific file
*/
function lookupFileCaller() {
    /* get the strack trace from this file */
    var originalPrepareStackTrace = Error.prepareStackTrace,
        targetFile,
        stackTrace;

    /* get stack array */
    Error.prepareStackTrace = function(_, stack) {
        Error.prepareStackTrace = originalPrepareStackTrace;
        return stack;
    };

    stackTrace = (new Error()).stack;

    /* get the target file name */
    targetFile = getTargetFile.apply(null, arguments);

    var nextFileIsCaller = false,
        targetFileCaller = '';

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
