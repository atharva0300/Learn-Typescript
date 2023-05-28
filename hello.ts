function greet(person , date){
    console.log(`Hello ${person}, today is ${date.toDateString()}!`);
    // inside hello.js -> the ` backticks get ommited and is replaced with concat
    // this output is because typescript is following ECMAScript3 which is an old version of ECMAScript

    // to use new version like ECMAScript5 use -> --target es2015
    // tsc --target es2015 hello.ts  
}

// greet("Atharva") error -> as the date argument is missing

greet("Maddison", new Date());

// return type annotations 
function displayNumber(n : number) : string {
    // return type is set to string
    return `This is a number ${n}`
} 

console.log('number : ' , displayNumber(12))

// optional properties 
function printName(obj : { first : string , last? : string}){
    // last property is optional 
    console.log('full name : ' , obj.first + obj.last)
    // if obj.last is not given -> then it is set to undefined
}

printName({first : "atharva"})  // works 
printName({first : "atharva" , last : "pingale"})

// union type 
function printID(id : number | string ){
    // id can be a string as well as a number
    console.log('id : ' , id)
    // console.log(id.toUpperCase()) -> error : because toUpperCase() method is not available for number type 
    // The solution is to narrow the union with code, the same as you would in JavaScript without type annotations. 
    // Narrowing occurs when TypeScript can deduce a more specific type for a value based on the structure of the code.

    if ( typeof id == "string"){
        console.log(id.toUpperCase())
    }else if(typeof id == "number"){
        console.log('no upoercase : ' , id )
    }
}

printID(12) // works
printID("123")  // works

function welcomePeople(x: string[] | string) {
    if (Array.isArray(x)) {
      // Here: 'x' is 'string[]'
      console.log("Hello, " + x.join(" and "));
    } else {
        // we dont need else if branch as we know that the other type can only be a string
      // Here: 'x' is 'string'
      console.log("Welcome lone traveler " + x);
    }
  }

// Return type is inferred as number[] | string
function getFirstThree(x: number[] | string) {
    return x.slice(0, 3);
  }

// type correction 
// const x = "hello" as number; -> this will always give an error 

// general expression
// const a = (expr as any) as T;

// combininng literals into unions 
function printText(s: string, alignment: "left" | "right" | "center") {
    // ...
  }
  printText("Hello, world", "left");
  // printText("G'day, mate", "centre"); -> error -> centre is not present in alignment 

function compare(a: string, b: string): -1 | 0 | 1 {
return a === b ? 0 : a > b ? 1 : -1;
}

// combining with non-literal types 
interface Options {
    width: number;
}
function configure(x: Options | "auto") {
    // ...
}
configure({ width: 100 });
configure("auto");
// configure("automatic"); : error -> automatic is not a literal in x 


// literal interface 
const obj2 = { counter: 0 };
if (someCondition2) {
  obj.counter = 1;
}


// symbol
// There is a primitive in JavaScript used to create a globally unique reference via the function Symbol():
const firstName = Symbol("name");
const secondName = Symbol("name");
 
if (firstName === secondName) {
    // This comparison appears to be unintentional because the types 'typeof firstName' and 'typeof secondName' have no overlap.
    // Can't ever happen
}