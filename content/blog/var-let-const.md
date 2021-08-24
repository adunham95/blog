---
title: "Var Let Const"
cover: "1.jpg"
category: "moar"
date: "2021-03-01"
tags:
    - Javascript
---
Variable is way to set a some type of code than can be dynamic or used in the place for easier readable code. There are multiple ways to set variables, with different conditions around them.  The three ways to set variables in javascript are var, let and const. 

## Var

```javascript
    var x = 2
```

Var used to the be the only way to set variables. Setting a value to variable initialized with var gives it access to the global scope. With a variable having access to the global scope, it can be used or assigned anywhere. Writing ` var x=3` later in your project will take that ` x` variable and reassign it to 3. If that ` x` variable gets used later in the code it will be using that updated 3 value. This can be reassigned in a function, or another js script on the page.</p>

```javascript
function one(){
    var x = 1
    return x
}

function two(){
    var x = 2
    return x
}

console.log(two()) //This one returns 2
console.log(one()) //This one returns 2
```
## Let
```javascript
let x = 2
```
Let is another type of variable initializer. Let is scoped to the function that it runs in, although it can be assigned globally. Wherever the let variable is initialized it is only accessible within in that area. For instance, if you were to assign ` x=2` within a function it would only be accessible within that function. Another function would not have access to that same x variable. However, if you initialize a new variable ` x=4` within another function then that x variable is only accessible within that function. 
```javascript
function one(){
    let x=1; 
    return x
}
function two(){
    let x=2;
    return x
}


console.log(two()) //This one returns 2
console.log(one()) //This one returns 1
```

## Const
```javascript
const x=1;
```
Const is a way to initialize a variable that does not change. This is helpful for when you dont want it to overwritten later in the project, but it needs to be assigned somewhere. For example you have a birthday(March 12). That is will always be your birthday, that would be set with const `const birthday="March 12"`. Your age is something that always changes, so your age would be `let age=25;`.