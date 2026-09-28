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

```javascript
function f() {
    const message = 'Hello';
    function sayHello(){
        console.log(message)
    }

    return sayHello
}

const sayHello = f

sayHello();
```
---

# Inmediately invoked function expression
It is a nameless function that invokes inmediately. This don't affect the global object

```javascript
const f = (function (){
    console.log('hi')
})()
```

## Uses

```javascript
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
```

---
With this we fix the previous bug:

```javascript
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
```

---

# First-class functions
```javascript
x = [0,1,2,3]
functin addOne(x){ return x + 1}
x.map(addOne) // [1,2,3,4]

function isGraterThanOne(x) {return x > 1}

x.filter(isGreaterThanOne) // [2,3]

function add(x,y) {return x + y}

x.reduce(x) // 6
``` 

Let's implement them.

```javascript
function map(arr, fn){
    const newArr = []

    for (let i = 0; i < arr.length; i++){
        let val = arr[i]
        newArr.push(fn(val))
    }

    return newArr;
}

function addOne(num) { return num + 1 }

const x = [0,1,2,3]
map(x, addOne) // [1,2,3,4]
```

# Asynchronous functions

```javascript
function printOne() {
    console.log('one')
}

function printTwo() {
    console.log('two')
}

function printThree() {
    console.log('three')
}

setTimeout(printOne, 1000)
setTimeout(printTwo, 0)
printThree()

// three
// two
// one
```

Let's talk now about the call stack

```javascript
function addOne(num) {
    return num+1
}

function getNum(){
    return addOne(10)
}

function c(){
    console.log(getNum() + getNum())
}

c() // 22
```

Let's work with some asynchronous functions:
```javascript
function doSomethingAsync(callback){
   setTimeout(function() {callback(1)}, 1000) 
}

doSomething(console.log)
```
A bigger example:
```javascript
function login(req, res, callback){
    User.findOne({email: req.body.password}, function(err, user) {
        if (err) return callback(err)
        
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (err) return callback(err)
            if (!isMatch) return res.status(401).send('IncorrectPassword')

            // add relevant data to token
            const payload = {id: user._id, email = user.email}

            jwt.sign(payload, config.secret, {}, function(err, token){
                user.token = token
                user.save((err) => {
                    if (err) return callback(err)
                    res.json({token})
                })
            })
        })
    })
}
```

This is a callback hell, because you have so many callback nested. To aliviate this, you have promises, let's see what it is.

```javascript

const url = ''

fetch(url)
.then(function(res){
    return res.json()
})
.then(function(json){
    return ({
        importantData: json.importantData,
    })
})
.then(function(data){
    console.log(data)
})
.catch(function(err){
    // handle error
})
```

The `.then` are promises, they run one after another, and if there is some error `.catch` runs in that moment. Let's now translate the previous code to promises:

```javascript
function login(req, res, callback){
    User.findOne({email: req.body.password})
    .then(function(user){
        return user.comparePassword(req.body.passwordh)
    })
    .then(function(isMatch){
        if (!isMatch) res.status(401).send('IncorrectPassword')
        else {
            const payload = {id: user._id, email = user.email}
            return jwt.sign(payload, config.secret, {})
        }
    }) 
    .then(function(token){
        user.token = token
        return user.save()
    })
    .then(function(){
        res.json({token})
    })
    .catch(function(err){
        return callback(err)
    })
}
```

## Async/Await
This is a more modern way to write the previous code:
```javascript
async function login(req, res, callback){
    try{
        const user = await User.findOne({email: req.body.password})
        const isMatch = await user.comparePassword(req.body.passwordh)

        if (!isMatch) res.status(401).send('IncorrectPassword')

        const payload = {id: user._id, email = user.email}
        const token = await jwt.sign(payload, config.secret, {})

        user.token = token
        const success = await user.save()

        res.json({token})
    } catch (err){
        callback(err)
    }
}
```

# this

In general, it's the global object. Let's see an example:
```javascript
const person = {
    name: 'jordan',
    greet: function() {console.log('hello, ' + this.name)}
}

person.greet() // hello, jordan

const greet = person.greet

// if we want to be it something else than undefined
this.name = 'irina' 
const greet = person.greet.bind({name: 'this is a bound object'})
person.greet.call({name: 'this is a bound object'})
person.greet.apply({name: 'this is a bound object'})

const newPerson = {
    name: 'newPerson', 
    greet: () => {console.log(this.name)}
}
newPerson.greet() // undefined
//

greet() // hello, undefined (here there is not a key 'name')

const friend = {
    name: 'david'
}

friend.greet = person.greet

friend.greet() // hello, david
```

# DOM

```javascript

```