Caller Lookup
=============
Got the caller of specific module.

---
### How to Use

#### Normal Case

Stack Trace: foo.js --(require)--> [ module.js ]

##### node_modules/xxx/module.js
    var lookupCaller = require('caller-lookup');
    
    // i want to know who calls me
    console.log( lookupCaller() ); 
    
    
##### foo.js (caller)
    require('xxx/module.js')

##### OUTPUT
Got the path of **foo.js**

---

#### Specific Target File

Stack Trace: bar.js --(require)--> [ index.js --(require)--> module.js ]

##### node_modules/xxx/module.js
    var lookupCaller = require('caller-lookup'); 
    
    // i want to know who calls my index file
    var myIndexFile = path.resolve(__dirname, './index.js');
    console.log( lookupCaller( myIndexFile) ); 

##### node_modules/xxx/index.js
    require('./module.js')    
    
##### bar.js (caller)
    require('xxx/index.js')

##### OUTPUT    
Got the path of **bar.js**


---
### Questions?

If you have any questions, feel free to create a new issue.
