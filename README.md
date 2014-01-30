# [RivetsJS](http://www.rivetsjs.com/) Extra Formatters

> **NOTE:** Most of the formatters found here where copied from [rivets wiki](https://github.com/mikeric/rivets/wiki/Example-formatters) and renamed. The only exception (so far) is the [Evaluate](#evaluate) formatter.

## Usage

1. Add `rivets.extra.formatters.js` to your page **after** `rivets.js`
2. Call `rivets.extra.formatters.init()` **before** any binding
3. Go have fun!

### Configuration

You may pass an object to the `init` method overriding any of these defaults.

```javascript
{
  disable: [],
  keys: {
    negate: '!',
    equal: '==',
    not_equal: '!=',
    identical: '===',
    not_identical: '!==',
    greater_than: '>',
    greater_or_equal_to: '>=',
    lower_than: '<',
    lower_or_equal_to: '<=',
    is_empty: 'isEmpty',
    evaluate: '=',
    prevent_default: 'preventDefault'
  }
}
```

If you add any formatter name (e.g. `'lower_than'`) to the `disable` array it will **not** be added to `rivets.formatters`.

#### Example

The following code will disable the `negate` formatter and replace the `not_equal` key.

    rivets.extra.formatters.init({ 
      disable: ['negate'],
      keys: {
        not_equal: 'neq'
      }
    })
    
Now, to use the `not_equal` you must do

    data-class-disabled="model.count | neq 2"  
    

## Available Formatters

### Evaluate an expression

```html
<a ... 
    data-each-phase="cars" 
    data-selected="car.id |= {{value}} == user.car.id">
```

Allows you to bind to an expression. The `{{value}}` token will be replaced by the actual value of `car.id`.

**name:** evaluate <br/>
**default key:** = <br/>
**returns:** The result of your expression (in this case, `car.id == user.car.id`)

### Boolean negation

```html
<a ... data-class-disabled="model.valid | !">
```

**name:** negate <br/>
**default key:** ! <br/>
**returns:** `!model.valid`


### Equals


```html
<a ... data-class-disable="model.foo |== 4">
```

**name:** equal <br/>
**default key:** == <br/>
**returns:** `value == args`


### Not equal

```html
<a ... data-class-disable="model.foo |!= 4">
```

**name:** not_equal <br/>
**default key:** != <br/>
**returns:** `value != args`


### Identical


```html
<a ... data-class-disable="model.foo |=== '4'">
```

**name:** identical <br/>
**default key:** === <br/>
**returns:** `value === args`


### Not Identical

```html
<a ... data-class-disable="model.foo |!== '4'">
```

**name:** not_identical <br/>
**default key:** !== <br/>
**returns:** `value !== args`


### Greater than

```html
<a ... data-class-disable="model.foo |> 4">
```

**name:** greater_than <br/>
**default key:** > <br/>
**returns:** `value > arg`


### Greater than or equal to

```html
<a ... data-class-disable="model.foo |>= 4">
```

**name:** greater_or_equal_to <br/>
**default key:** >= <br/>
**returns:** `value > arg`


### Lower than

```html
<a ... data-class-disable="model.foo |< 4">
```

**name:** lower_than <br/>
**default key:** < <br/>
**returns:** `value < arg`


### Lower or equal to

```html
<a ... data-class-disable="model.foo |<= 4">
```

**name:** lower_or_equal_to <br/>
**default key:** <= <br/>
**returns:** `value <= arg`
	
	
### Is Empty

```html
<a ... data-hide="model.foo | isEmpty">
```

**name:** is_empty <br/>
**default key:** isEmpty <br/>
**returns:** `value == null || value === ""`


### Event handler preventDefault

```html
<a ... data-on-submit="model:save | preventDefault">
```

**name:** prevent_default <br/>
**default key:** preventDefault <br/>
**returns:**

    function(e) {
        e.preventDefault();
        value.call(this, e);
        return false;
    };
