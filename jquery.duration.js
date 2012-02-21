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
        milliseconds: "%d millisecond",
        seconds: "%d second",
        minutes: "%d minute",
        hours: "%d hour",
        days: "%d day",
        months: "%d month",
        years: "%d year"
      }
    },
    inWords: function(milliseconds) {
      var $l = this.settings.strings;

      var ms = milliseconds % 1000;
      var seconds = Math.floor((milliseconds % (1000 * 60) - ms) / 1000);
      var minutes = Math.floor((milliseconds % (1000 * 60 * 60) - seconds) / (1000 * 60));
      var hours = Math.floor((milliseconds % (1000 * 60 * 60 * 24) - minutes) / (1000 * 60 * 60));
      var days = Math.floor((milliseconds % (1000 * 60 * 60 * 24 * 365) - hours) / (1000 * 60 * 60 * 24)) % 30;
      var month = Math.floor((milliseconds % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
      var years = Math.floor(milliseconds / (1000 * 60 * 60 * 24 * 365));

      function substitute(stringOrFunction, number) {
        var string = $.isFunction(stringOrFunction) ? stringOrFunction(number, milliseconds) : stringOrFunction;
	return number ? (string.replace(/%d/i, number) + (number > 1 ? "s" : "") + " ") : "";
      }

      return $.trim(substitute($l.years, years) + (substitute($l.months, month)) + (substitute($l.days, days)) + (substitute($l.hours, hours)) + (substitute($l.minutes, minutes)) + (substitute($l.seconds, seconds))  + (substitute($l.milliseconds, ms)));
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
