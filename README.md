# rst-live-preview

Preview reSructuredText file in browser with auto refresh \_(￣▽￣)」∠)\_

![snapshot](http://i.imgur.com/z0q80oQ.png)

## Installation

Requires python [rst2html5][], to install:

[rst2html5]: https://github.com/marianoguerra/rst2html5/

```
pip install rst2html5-tools
```

and then install `rst-live-preview` via npm:

```
npm install --global rst-live-preview
```

## Usage

On command line:

```
rstpreview my-awesome-article.rst
```

Then the preview will be opened in you default browser. Just keep edit & save your rst file, the preview will automatically refresh.

### Math Support

for detail info, see [rst2html5#math-support][]

[rst2html5#math-support]: https://github.com/marianoguerra/rst2html5/#math-support

```rst

Some math:

.. math::

   x = {-b \pm \sqrt{b^2-4ac} \over 2a}
```

### Syntax Highlight

```rst
Some source code:

.. code:: javascript

  const assert = require('assert');

  assert(true);  // OK
```
