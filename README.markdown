# duration: a jQuery plugin

Duration is a jQuery plugin that makes it easy to convert numerical durations (milliseconds) into a sentence (e.g. "4 minutes" or "1 day").

It was forked from timeago.jquery.js plugin.

## Usage

First, load jQuery and the plugin:

```html
<script src="jquery.min.js" type="text/javascript"></script>
<script src="jquery.duration.js" type="text/javascript"></script>
```

Now, let's attach it to your timestamps on DOM ready:

```html
<pre>
   jQuery(document).ready(function() {
     $("abbr.duration").duration();
   });
</pre>
```

This will turn all abbr elements with a class of duration and a duration in the title:

```html
<abbr class="duration" title="1000">1000</abbr>
```

into something like this:

```html
<abbr class="duration" title="1000">1 second</abbr>
```

**For different language configurations**: see lang folder

## Author

[Loïc Guillois](http://www.loicguillois.fr) ([@loic_guillois](http://twitter.com/loic_guillois))

## Other

[MIT License](http://www.opensource.org/licenses/mit-license.php)

Copyright (c) 2012, Loïc Guillois (contact -[at]- loicguillois [*dot*] fr)
