function greet(person, date) {
    console.log("Hello ".concat(person, ", today is ").concat(date.toDateString(), "!"));
    // inside hello.js -> the ` backticks get ommited and is replaced with concat
    // this output is because typescript is following ECMAScript3 which is an old version of ECMAScript
    // to use new version like ECMAScript5 use -> --target es2015
    // tsc --target es2015 hello.ts  
}
// greet("Atharva") error -> as the date argument is missing
greet("Maddison", new Date());
// return type annotations 
function displayNumber(n) {
    // return type is set to string
    return "This is a number ".concat(n);
}
console.log('number : ', displayNumber(12));
// optional properties 
function printName(obj) {
    // last property is optional 
    console.log('full name : ', obj.first + obj.last);
    // if obj.last is not given -> then it is set to undefined
}
printName({ first: "atharva" }); // works 
printName({ first: "atharva", last: "pingale" });
// union type 
function printID(id) {
    // id can be a string as well as a number
    console.log('id : ', id);
    // console.log(id.toUpperCase()) -> error : because toUpperCase() method is not available for number type 
    // The solution is to narrow the union with code, the same as you would in JavaScript without type annotations. 
    // Narrowing occurs when TypeScript can deduce a more specific type for a value based on the structure of the code.
    if (typeof id == "string") {
        console.log(id.toUpperCase());
    }
    else if (typeof id == "number") {
        console.log('no upoercase : ', id);
    }
}
printID(12); // works
printID("123"); // works
function welcomePeople(x) {
    if (Array.isArray(x)) {
        // Here: 'x' is 'string[]'
        console.log("Hello, " + x.join(" and "));
    }
    else {
        // we dont need else if branch as we know that the other type can only be a string
        // Here: 'x' is 'string'
        console.log("Welcome lone traveler " + x);
    }
}
// Return type is inferred as number[] | string
function getFirstThree(x) {
    return x.slice(0, 3);
}
function sanitizeInput(str) {
    return sanitize(str);
}
// Create a sanitized input
var userInput = sanitizeInput(getInput());
// Can still be re-assigned with a string though
userInput = "new input";
