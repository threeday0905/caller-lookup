Caller Lookup
=============
Got the caller-file from stack trace.


---
### How to Use

#### Normal Case

Stack Trace: foo.js > module.js

##### module.js
    var lookupCaller = require('caller-lookup');
    
    // I want to know who call me
    console.log( lookupCaller() ); 
    
    
##### foo.js (caller of module.js)
    require('./module.js')

##### OUTPUT
It will get the full path of **foo.js**

---

#### Specific Target File

Stack Trace: bar.js > index.js > module.js

##### module.js
    var lookupCaller = require('caller-lookup');
    
    // My module index is below.
    var myIndexFile = lookupCaller.resolve(__dirname, 'index.js'); 
    
    // I want to know who call my index file during stack trace
    console.log( lookupCaller( myIndexFile) ); 
    
    
##### bar.js (caller of index.js)
    require('./index.js')

##### OUTPUT    
It will get the full path of **bar.js**


---
### Questions?

If you have any questions, feel free to create a new issue.
