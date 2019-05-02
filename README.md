@MomsFriendlyDevCo/Autopsy
==========================
Identify meta data about a function.

This is an extremely simple utility library centralized in one place with testkits.


API
===


autopsy.identify(fn)
--------------------
Attempts to identify a function's characteristics.
Will return either `"async"`, `"cb"` or `"plain"` based on examining its header.

```javascript
var autopsy = require('@momsfriendlydevco/autopsy');

autopsy.identify(()=> 1) //= "plain"
autopsy.identify(async function (){}) //= "async"
autopsy.identify(function(x) {}) //= "cb"
```

See the [testkits](./test/test.js) for lots more examples.


autopsy.hasCallback(fn)
-----------------------
Examine a function and return whether it *looks like* it may take a callback.
This is really just a wrapper around `autopsy.identify()`.

```javascript
var autopsy = require('@momsfriendlydevco/autopsy');

autopsy.identify(()=> 1) //= false
autopsy.identify(async function (){}) //= false
autopsy.identify(function(x) {}) //= true
```
