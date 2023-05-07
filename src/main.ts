let helloworld = "Hello World"

console.log(helloworld)

// defining a type 
interface User{
    name : string;
    id : number;
}


// You can then declare that a JavaScript object conforms to the shape of your new interface by using syntax like : TypeName after a variable declaration:
const user : User = {
    name : 'ATarva',
    id : 12
}

// You can use an interface declaration with classes:

class UserAccount{
    name : string
    id : number

    constructor(name : string , id : number){
        this.name = name;
        this.id = id
    }
}

// using the interface class 
const user2: User = new UserAccount("atharva"  , 123)

// using interface to annotate parameters and return values to the function 
/*
function getAdminUser() : User{
    // ...
}

function deleteUser() : User{
    //...
}
*/

/*
There is already a small set of primitive types available in JavaScript: boolean, bigint, null, number, string, symbol, and undefined, which you can use in an interface. TypeScript extends this list with a few more, such as any (allow anything), unknown (ensure someone using this type declares what the type is), never (it’s not possible that this type could happen), and void (a function which returns undefined or has no return value).
*/

// composing types 
// 1. unions
type MyBool = true | false;

// Note: If you hover over MyBool above, you’ll see that it is classed as boolean. That’s a property of the Structural Type System. More on this below.

type windowStates = "open" | "closed" | "minimized"
type LockStates =  "loacked" | "unlocked"
type PositiveOddNumbersUnderTen = 1 | 2 | 5 | 7 | 9

// Unions provide a way to handle different types too. For example, you may have a function that takes an array or a string:
function getLength(obj : string | string[]){
    // the obj can be a string or an array of strings as well
    return obj.length
}

// using typeof to check the data type 
function wrapInArray(obj : string | string[]){
    if(typeof obj==='string'){
        console.log("this is a string")
        return [obj]
    }else if(Array.isArray(obj)){
        console.log('this is an array')
        return obj
    }

}

// Generics 
//Generics provide variables to types. A common example is an array. 
// An array without generics could contain anything. An array with generics can describe the values that the array contains.

type StringArray = Array<string>
type NumberArray = Array<number>
type ObjectWithNameArray = Array<{name : string}>

// declaring my own types using generics 
interface Backpack<Type>{
    add : (obj : Type) => void;
    get : () => Type;
}

// This line is a shortcut to tell TypeScript there is a
// constant called `backpack`, and to not worry about where it came from.

declare const backpack: Backpack<string>

// object is a string, because we declared it above as the variable part of Backpack.
// const object = backpack.get()

// Since the backpack variable is a string, you can't pass a number to the add function.
// backpack.get(23) erorr 
// console.log(backpack.get())

// structural type system 
// In a structural type system, if two objects have the same shape, they are considered to be of the same type.
interface Point{
    x : number
    y : number
}

function logPoint(p : Point){
    console.log(`${p.x}, ${p.y}`)
}

// logs "12,  26"
const point = {x : 12 , y : 26}
logPoint(point)

const point3 = { x: 12, y: 26, z: 89 };
logPoint(point3); // logs "12, 26"
 
const rect = { x: 33, y: 3, width: 30, height: 80 };
logPoint(rect); // logs "33, 3"

//const color = { hex: "#187ABF" }; // error
// logPoint(color);

class VirtualPoint{
    x : number
    y : number

    constructor(x : number , y : number){
        this.x = x
        this.y = y
    }
}

console.log('virtual point log point : ')
const newPoint = new VirtualPoint(13 , 24)
logPoint(newPoint)
console.log('This is node main')