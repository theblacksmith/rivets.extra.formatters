module rivets
{
  export declare var formatters;

  export module extra
  {
    "use strict";

    class Cache  {

      static store = {};

      static keyFor(args) {
        return args.join('');
      }

      static contains(key) {
        return typeof(Cache.store[key]) !== "undefined";
      }

      static add(key, value) {
        Cache.store[key] = value;
      }

      static get(key) {
        return Cache.store[key];
      }
    }

    function evaluate(value) {

      var args = Array.prototype.slice.call(arguments, 1);
      var cacheKey = Cache.keyFor(args);
      var binding = "";

      if(Cache.contains(cacheKey)) {
        return Cache.get(cacheKey)(value);
      }

      // do we have something to bind to?
      if(args[0][args[0].length-1] == ':') {
        binding = ".bind(" + args[0].substr(0, args[0].length-1) + ");";
        args.shift();
      }

      var exp = args.join(' ').replace('{{value}}', '__$value');

      exp = "(function(__$value){return "+exp+";})" + binding;
      
      var f = eval(exp);
      Cache.add(cacheKey, f);
      
      return f(value);
    };

    function preventDefault(value) {
      return function(e) {
        e.preventDefault();
        value.call(this, e);
        return false;
      };
    }

    var funcs = {
      equal: function(value, arg) { return value == arg; },
      not_equal: function(value, arg) { return value == arg; },
      identical: function(value, arg) { return value === arg; },
      not_identical: function(value, arg) { return value !== arg; },
      negate : function(value) { return !value; },
      greater_than: function(value, arg) { return value > arg; },
      greater_or_equal_to: function(value, arg) { return value >= arg; },
      lower_than: function(value, arg) { return value < arg; },
      lower_or_equal_to: function(value, arg) { return value <= arg; },
      empty: function(value) { return value == null || value === ""; },
      prevent_default: preventDefault,
      evaluate: evaluate
    };

    /**
     * A pack of formatters for rivets
     */
    export class formatters
    {
      static defaults = {
        disable: [],
        keys: {
          equal: '==',
          not_equal: '!=',
          identical: '===',
          not_identical: '!==',
          negate: '!',
          greater_than: '>',
          greater_or_equal_to: '>=',
          lower_than: '<',
          lower_or_equal_to: '<=',
          empty: 'empty',
          evaluate: '=',
          prevent_default: 'preventDefault'
        }
      }

      static init(config: any = {keys:{}}) {

        var settings = {
          disable: config.disable || false,
          keys: {}
        };

        Object.keys(formatters.defaults.keys).forEach(function(p) {
          settings.keys[p] = config.keys[p] || formatters.defaults.keys[p];
        });

        Object.keys(funcs).forEach(function(c) {
          if(!settings.disable || settings.disable.indexOf(c) === false)
            rivets.formatters[ settings.keys[c] ] = funcs[ c ]; 
        });
      }
    }
  }
}