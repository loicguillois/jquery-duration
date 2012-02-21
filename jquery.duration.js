/**
 * Duration is a jQuery plugin that makes it easy to support automatically
 * updating durations (e.g. "4 minutes" or "1 hour").
 *
 * @name duration
 * @version 0.10.0
 * @requires jQuery v1.2.3+
 * @author Loïc Guillois
 * @license MIT License - http://www.opensource.org/licenses/mit-license.php
 *
 * For usage and examples, visit:
 * http://timeago.yarp.com/
 *
 * Copyright (c) 2012, Loïc Guillois (contact -[at]- loicguillois [*dot*] fr)
 */
(function($) {
  $.duration = function(milliseconds) {
      return inWords(milliseconds);
  };
  var $d = $.duration;

  $.extend($.duration, {
    settings: {
      refreshMillis: 60000,
      strings: {
        milliseconds: "%d milliseconds",
        minute: "%d seconds",
        minutes: "%d minutes",
        hours: "%d hours",
        days: "%d days",
        months: "%d months",
        years: "%d years",
        numbers: []
      }
    },
    inWords: function(milliseconds) {
      var $l = this.settings.strings;
      var seconds = milliseconds / 1000;
      var minutes = seconds / 60;
      var hours = minutes / 60;
      var days = hours / 24;
      var years = days / 365;

      function substitute(stringOrFunction, number) {
        var string = $.isFunction(stringOrFunction) ? stringOrFunction(number, milliseconds) : stringOrFunction;
        var value = ($l.numbers && $l.numbers[number]) || number;
        return string.replace(/%d/i, value);
      }

      return seconds < 45 && substitute($l.seconds, Math.round(seconds)) ||
        minutes < 45 && substitute($l.minutes, Math.round(minutes)) ||
        hours < 24 && substitute($l.hours, Math.round(hours)) ||
        days < 30 && substitute($l.days, Math.floor(days)) ||
        days < 365 && substitute($l.months, Math.floor(days / 30)) ||
        substitute($l.years, Math.floor(years));
    },
    getDuration: function(elem) {
      // jQuery's `is()` doesn't play well with HTML5 in IE
      var isTime = $(elem).get(0).tagName.toLowerCase() === "duration"; // $(elem).is("duration");
      return isTime ? $(elem).attr("duration") : $(elem).attr("title");
    }
  });

  $.fn.duration = function() {
    var self = this;
    self.each(refresh);

    var $s = $d.settings;
    if ($s.refreshMillis > 0) {
      setInterval(function() { self.each(refresh); }, $s.refreshMillis);
    }
    return self;
  };

  function refresh() {
    var data = prepareData(this);
    if (!isNaN(data.duration)) {
      $(this).text($d.inWords(data.duration));
    }
    return this;
  }

  function prepareData(element) {
    element = $(element);
    if (!element.data("duration")) {
      element.data("duration", { duration: $d.getDuration(element) });
      var text = $.trim(element.text());
      if (text.length > 0) {
        element.attr("title", text);
      }
    }
    return element.data("duration");
  }
}(jQuery));
