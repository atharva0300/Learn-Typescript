function greater(fn : ( a : string ) => void ){
    // takes a function, with the input paramter as a string and returns void 
    fn("Hello, world")
}

function printToConsole(s : string){
    console.log(s)
}

greater(printToConsole)
// passing the printToConsole funciton to the greater function 

// Using type alias 
type GreetFunction = ( a : string ) => void 
function greater(fn : GreetFunction){
    // ... 
}

type DescribableFunction = {
    description : string
    ( someArg : number ) : boolean
    // a function that takes a number and returns a boolean value 
}

function doSomething(fn : DescribableFunction){
    console.log(fn.description + " returned " + fn(6))
    // fn(6) => calling the Describable funnction and passing 6 into it -> which returns a boolean value
}

function myFunc(soneArg : number){
    return someArg > 3
    // returns boolean 
}

myFunc.description = "defualt description"

// now the myFunc object contains the description and a function which is same as the DescribableFunction type

doSomething(myFunc) // no errors as myFunc is same as the DescribableFunction
// passing the myFunc into the doSomething function 
// now the fn : is myFunc


// Construct signatures 
// JavaScript functions can also be invoked with the new operator. 
// TypeScript refers to these as constructors because they usually create a new object. 
// You can write a construct signature by adding the new keyword in front of a call signature:
type someConstructor = {
    new ( s : string ) : SomeObject // returns someObject
    // this defines the constructor to the type object 
    // this constructor is invoked when new instance of this object is creatd
}

function fn( ctor : someConstructor){
    return new ctor("this is a new string")
    // string goes into the constructor 
}

interface CallorConstruct{
    new ( s : string ) : Date   // constructor that takes a string and returns a Date() 
    (n? : number ) : string // a function that takes a number and returns a string
}


// Generic functions 
// It’s common to write a function where the types of the input relate to the type of the output, or where the types of two inputs are related in some way. 
// Let’s consider for a moment a function that returns the first element of an array:
function firstElement(arr : any[]){
    return arr[0]
}

function firstElement<Type>(arr : Type[]) : Type | undefined {
    // a function that takes a Type[] array and returns a Type or undefined
    return arr[0]
    // returns a Type 
}

// if s is of type string 
const s = firstElement(['a' , 'b' , 'c'])
// Type[] => string[]
// <Type> => <string>
// Type => string 

// if n is of type number 
const n = firstElement([1,2,3])
// Type[] => number[]
// <Type> => <number>
// Type => number

// if u is of type undefined 
const u = firstElement([])
// Type is undefined 
// so it will return undefined

function map<Input , Output>(arr : Input[] , func : (arg : Input) => Output) : Output[] {
    // a function that takes parameters of type <Input, Output>
    // arr paramter that is of Type Input[]
    // func : that returns a Output Type 
    // and this function returns a Output[] Type 
    return arr.map(func)
    // returns Output[]
}

const parsed = map(['1' , '2' , '3'] , (n) => parseInt(n))
// ['1' , '2' , '3'] => <Input> Type 
// (n) => parseInt(n) => <Output> Type


// Constraints
// We’ve written some generic functions that can work on any kind of value. 
// Sometimes we want to relate two values, but can only operate on a certain subset of values. 
// In this case, we can use a constraint to limit the kinds of types that a type parameter can accept.
function longest<Type extends { length : number }>(a : Type , b : Type ){
    if (a.length >= b.length){
        return a
    }else{
        return b
    }
}

// longestArray is of type 'number[]'
const longestArray = longest([1,2] , [3,4,5])
// passed 2 arrays of type number[]
// a = [1,2] and b = [3,4,5]

// longestArray is of type string[]
const longestStringArray = longest(['a' , 'b'] , ['a' , 'n' , 'm'])
// a = ['a' , 'b'] and b = ['a'  , 'n' , 'm']

// Error! Numbers don't have a 'length' property
// const notOK = longest(10, 100);

// Because we constrained Type to { length: number }, we were allowed to access the .length property of the a and b parameters. Without the type constraint, we wouldn’t be able to access those properties because the values might have been some other type without a length property.

// Specfying Type Arguments 
// TypeScript can usually infer the intended type arguments in a generic call, but not always. For example, let’s say you wrote a function to combine two arrays:
function combine<Type>(arr1: Type[], arr2: Type[]): Type[] {
    return arr1.concat(arr2);
}

// const arr = combine([1, 2, 3], ["hello"]);  -> error : string is not assignable to number 
// this can be overcomed by 
const arr = combine<string | number>([1, 2, 3], ["hello"]);
// now ['hello'] is of type string[]


// Push type paramters down
function firstElement1<Type>(arr: Type[]) {
    return arr[0];
  }
   
  function firstElement2<Type extends any[]>(arr: Type) {
    return arr[0];
  }
   
  // a: number (good)
  const a = firstElement1([1, 2, 3]);
  // b: any (bad)
  const b = firstElement2([1, 2, 3]);

// These might seem identical at first glance, but firstElement1 is a much better way to write this function. Its inferred return type is Type, but firstElement2’s inferred return type is any because TypeScript has to resolve the arr[0] expression using the constraint type, rather than “waiting” to resolve the element during a call.

// use fewer type parameters 
function filter1<Type>(arr: Type[], func: (arg: Type) => boolean): Type[] {
    return arr.filter(func);
  }
   
  function filter2<Type, Func extends (arg: Type) => boolean>(
    arr: Type[],
    func: Func
  ): Type[] {
    return arr.filter(func);
  }


  // Optional parameters 
  function fn(n : number){
    console.log(n.toFixed())
    console.log(n.toFixed(3))
  }

  function fn( x?: number ){
    // 
  }

  fn()  // okay 
  fn(12)    // okay 
  // Although the parameter is specified as type number, the x parameter will actually have the type number | undefined because unspecified parameters in JavaScript get the value undefined

  // default parameter
  function fn(x = 10){
    // 
  }

  // optional parameters in callback 
  function myForEach(arr : any[] , callback : (arg : any , index?: number ) => void ){
    for(let i=0;i<arr.length;i++){
        callback(arr[i] , i)
    }
  }

  // calling the function 
  myForEach([1,2,3] , (a) => console.log(a))
  myForEach([1,2,3] , (a , i) => console.log(a , i))

  // What this actually means is that callback might get invoked with one argument. In other words, the function definition says that the implementation might look like this:
  function myForEach(arr : any[] , callback : ( arg : any , index?: number) => void ){
    for(let i=0;i<arr.length;i++){
        callback(arr[i])
    }
  }



  