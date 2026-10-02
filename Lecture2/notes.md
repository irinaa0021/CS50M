# Javascript

## Classes

Simplifies the defining of complex objects with their own prototypes.

```javascript
const d = new Date();
d.toString(); // method
Date.now(); // static method
```

Let's now create our own class. We will create a class called Set, which must have `add`, `delete`, `has` (this indicates if a value is included), and lastly the `size` of the set.

```javascript
class Set {
  constructor(arr) {
    this.arr = arr;
  }

  add(val) {
    if (!this.has(val)) {
      this.arr.push(val);
    }
  }

  delete(val) {
    this.arr = this.arr.filter((x) => x !== val);
  }

  has(val) {
    return this.arr.includes(val);
  }

  get size() {
    return this.arr.length();
  }
}
```

The `get` keyword let's us to use the next syntax: `s.size`, without the parenthesis

Actually, there is a class in JS called Set, so we can extend it.

```javascript
class MySet extends Set {
    constructor(arr) {
        super(arr)
        this.originalArray = arr
    }

    add(value){
        super.add(value)
        console.log(`added &{val} to the set!`)
    }

    ...
}
```

# React

## Imperative vs Declarative

- Imperative programming outlines a series of steps to get to what you want. `javascript`
- Declarative programming just declares what you want. `HTML`

React is Declarative. It allows us to write what we want, and the library will take care of the DOM manipulation.

React's declarative nature makes it easy to customize components.

## Props

- Passed as an object to a component and used to compute the returned node.
- Changes in these props will cause a recomputation of the returned node ("render")
- Unlike in `html`, these can be any JS value.

Let's see an example:

```javascript
const slideShow = (
  <div>
    {slides.map((slide) => (
      <Slide slide={slide} />
    ))}
  </div>
);

const Slide = (slide) => (
  <div>
    <h1>{slide.title}</h1>
    <ul>
      {slide.bullets.map((bullet) => (
        <li>{bullet}</li>
      ))}
    </ul>
  </div>
);
```

What we pass between curly braces {}, is purely JS.

`setState` runs asynchronously.

If we want to update state twice:

```javascript
increaseCount() {
    this.setState(prevState => ({count: prevState.count + 1}))
    this.setState(prevState => ({count: prevState.count + 1}))
}
```

Instead of:

```javascript
increaseCount() {
    this.setState({count: this.state.count + 1})
    this.setState({count: this.state.count + 1})
}
```
