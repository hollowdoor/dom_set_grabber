dom-set-grabber
==============

Install
-------

`npm install --save dom-set-grabber`

Example
-------

```javascript
import setGrabber from 'dom-set-grabber';

const grabber = setGrabber(document.querySelector('#set-grab'))
```

API
---

### setGrabber(element) -> grabber

Set a grabber on an element. `setGrabber` returns a `grabber` instance.

### grabber.destroy()

Call `destroy` to remove any event listeners set by `setGrabber(element)`.

About
-----

Set the mouse pointer on an element to a grabber when mouseing over the element.
