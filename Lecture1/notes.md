# Closures
```javascript
function f() {
    const arr = [];
    for (var i = 0; i < 5; i++){
        arr.push(function() {console.log(i)}
    }
    return arr;
}

const functionArr = f()
functionArr[0]; // it displays 5
```

Now we are going to find out why this happen.
The variable i is alive until de end of the function. This is why this bug happen. If we declare it with `let` it will not happen.

--- 
function f() {
    const message = 'Hello';
    function sayHello(){
        console.log(message)
    }

    return sayHello
}

const sayHello = f

sayHello();

---

# Inmediately invoked function expression
It is a nameless function that invokes inmediately. This don't affect the global object

const f = (function (){
    console.log('hi')
})()

## Uses

const counter = (function() {
    let count = 0;
    return {
        inc: function() { count = count + 1;}
        get: function() { console.log(count)}
    }
})()

counter.get()
counter.inc()
counter.get()

// 0 1

---
With this we fix the previous bug:

function f() {
    const arr = [];

    for (var i = 0; i < 5; i++){
        arr.push((function(x) {
            return function() {console.log(x)}
        })(i))
    }
    return arr;
}

const functionArr = f()
functionArr[0]; // it displays 0

---

# First-class functions

x = [0,1,2,3]
functin addOne(x){ return x + 1}
x.map(addOne) // [1,2,3,4]




