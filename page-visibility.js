;(function(window, undefined){
  'use strict';

  var namespace = 'visibility'; // Change if conflicts with another global

  // For compatibility
  var hiddenProp, visibilityChangeProp;
  var prefixes = ['', 'moz', 'webkit', 'ms'];
  var i = 0;
  while ( prefixes[i] !== undefined &&
    document[ prefixes[i] + (i === 0 ? 'hidden' : 'Hidden') ] === undefined ) {
    i++;
  }
  if (prefixes[i] !== undefined) {
    hiddenProp = prefixes[i] + 'hidden';
    visibilityChangeProp = prefixes[i] + 'visibilitychange';
  }

  // Expose
  window[namespace] = {
    /**
     * Visibility change callbacks
     * @type {Array}
     */
    callbacks: [],
    /**
     * Binds callbacks or triggers event
     * @param  {Function} callback
     * @return {Void}
     */
    change: function(callback) {
      if (callback !== undefined) {
        this.callbacks.push(callback);
      } else {
        for (var i = 0; i < this.callbacks.length; i++) {
          if (typeof this.callbacks[i] === 'function') {
            this.callbacks[i].call(window, this.isVisible());
          }
        }
      }
    },
    /**
     * @return {Boolean}
     */
    isHidden: function() {
      return document[ hiddenProp ] || false;
    },
    /**
     * @return {Boolean}
     */
    isVisible: function() {
      return ! this.isHidden();
    }
  }

  // https://developer.mozilla.org/en/API/PageVisibility/Page_Visibility_API
  document.addEventListener(visibilityChangeProp, function() {
    window[namespace].change();
  }, false);

})(window);