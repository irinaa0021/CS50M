# JAVASCRIPT
## variables
const firstName = "Jordan";

There's no types

const arr = [
    'string',
    42,
    function() {console.log('hi')},
]
We can make an array with diferent types.

arr[2]()

---

## Loops
for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
}

---

## Typecasting
### Explicit
const x = 42;
const explicit = String(x);

### Implicit
const x = 42;
const implicit = x + "";

### Types
- Dynamic typing
- Primitive types (no methods, immutable)
    - undefined
    - null
    - boolean
    - number
    - string
    - (symbol) - we will learn about it in the future.
- objects

---

## Comparison

const x = 42;

console.log(typeof x);

console.log(typeof null); 
This last line returns `object`.

---

## Falsy values
- undefined
- null
- false
- +0, -0, NaN
- ""

---

## Truthy values
- {}
- []
- Everything else

---

Everything that is not a primitive type is an object

## Objects

const o = new Object();
o.firstName = "Irina";
o.isTeaching = true;
o.greet = function(){
    console.log("hi");
}

const o2 = {};
o2["firstName"] = "Irina";
const key = "isTeaching";
o2[key] = true;

const o3 = {
    firstName: 'Irina',
    isTeaching: false,
    address: {
        number: 13,
        street: "Las Malvinas,
}

Those are 3 different ways to declare an object. Inside an object there can be another object.

console.log(o3.address.number)
console.log(o3.address['number'])

### Object Mutation

const o = {
    a: 'a',
    b: 'b',
}

const o2 = o;

o.a = 'new value';

console.log(o2.a)

This prints 'new value'. This is because the objects are references, so o and o2 are pointers to the same object. Now if we want a real copy we do:

const o2 = Object.assign({}. o);

### Deep copy
function deepCopy(obj){
    // Check if vals are objects
    const keys = Object.keys(obj);

    for (let i = 0; i < keys.length; i++){
        const key = keys[i];
        if (typeof obj[keys[i]] == 'object'){
            newObject[key] = deepCopy(obj[key])
        } else
            newObject[key] = obj[key];
    }
    return Object.assign({}. obj);
}


## Prototypal inheritance
Primitive types have wrappers with methods. 

42.toString() // Error
const num = 42;
num.toString(); // "42"

--- 

## Scope

const a = 50;
a =56; // error
const obj = {};
obj.a = 'a'; // that's ok

We can't declare a variable twice

but you can do:
var a = 1;
var b = 2;
var a = 5;

this is not an error, it remains the last value.

You can use a funcion that is declared later. 

const f = function(){console.log("hi")} 

But this you can't use it before declaration.

const and let throws an error if you use it before declaration, var is undefined.

If you assign a function to a `var`, you can't call it like a function because it's undefined.

---


