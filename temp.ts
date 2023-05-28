interface User{
    // defiing the structure ( data types ) of the object
    id : number,
    name : string
}

const user : User = {
    id : 12,
    name : "atharva"
}
console.log('user : ' , user)

class UserAccount{
    name : string
    id : number

    constructor(name : string , id : number){
        this.name = name
        this.id = id
    }
}


// creating a new object with the class that checks for the type from User interface
const user1 : User = new UserAccount("adi" , 12)
console.log('user1 : ' , user1)

// type with union
type myBool = true | false
type display = "showWindow" | "showSidepane" | "anotherSIdePane"
type plainNumbers = 1 | 2 | 3 | 4 | 5

// unions in functions 
function getLength(obj : string | string[]){
    return obj.length 
}

// type of -> checking the type 
function wrapperFunction(obj : string | number){
    if(typeof obj == "string" ){
        console.log("The obj is a string")
    }else if(typeof obj == "number"){
        console.log("The obj is a number")
    }
}

// generics -> proviing variables to types 
type StringArray = Array<string>
type NumberArray = Array<number>
type objectWithNameArray = Array<{name : string}>
/*
    [
        { name : "adi" },
        { name : "asd" }
    ]
*/

// declaring own types that use generics 
interface Backpack<Type>{
    add : ( obj : Type ) => void,
    get : () => Type
}

declare const backpack : Backpack<string>

const obj = backpack.get()  
// backpack.add(12) -> gives error as 12 is not a string 

// Structural typing system
// In a structural type system, if two objects have the same shape, they are considered to be of the same type.
interface Point{
    x : number,
    y : number
}

function logPoint(p : Point){
    console.log(p.x , ' : ' , p.y)
}

// the shape of the point object and the shape of the 'Point' interface is the same, so considered the same type 
const point = {x : 12 , y : 14}
logPoint(point)

// the 'Point' interface must be a subset of the point1 object that we are passing to the function 
const point1 = { x : 12 , y : 14 , width : 123}
logPoint(point1)

function logPoint2(p : Point){
    console.log(p.x)
}

// const point2 = {x : 12} -> error : as y is missing 
// logPoint(point2)

// same error even when we are not using p.y in the logPoint2 function 
// const point2 = {x : 12}
// logPoint2(point2)
