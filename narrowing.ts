function padLeft(padding: number | string, input: string) {
    if (typeof padding === "number") {
      return " ".repeat(padding) + input;
    }
    return padding + input;
  }

/*
As we’ve seen, JavaScript supports a typeof operator which can give very basic information about the type of values we have at runtime. TypeScript expects this to return a certain set of strings:

    "string"
    "number"
    "bigint"
    "boolean"
    "symbol"
    "undefined"
    "object"
    "function"
*/

/*
In JavaScript, constructs like if first “coerce” their conditions to booleans to make sense of them, and then choose their branches depending on whether the result is true or false. Values like

    0
    NaN
    "" (the empty string)
    0n (the bigint version of zero)
    null
    undefined

*/

function printAll(strs: string | string[] | null) {
    if (strs && typeof strs === "object") {
      for (const s of strs) {
        console.log(s);
      }
    } else if (typeof strs === "string") {
      console.log(strs);
    }
  }

function multiplyAll(
    values: number[] | undefined,
    factor: number
): number[] | undefined {
    if (!values) {
      return values;
    } else {
      return values.map((x) => x * factor);
    }
  }


/* 
DONT DO THIS

function printAll(strs: string | string[] | null) {
  // !!!!!!!!!!!!!!!!
  //  DON'T DO THIS!
  //   KEEP READING
  // !!!!!!!!!!!!!!!!
  if (strs) {
    if (typeof strs === "object") {
      for (const s of strs) {
        console.log(s);
      }
    } else if (typeof strs === "string") {
      console.log(strs);
    }
  }
}

*/


function printAll(strs: string | string[] | null) {
    if (strs !== null) {
      if (typeof strs === "object") {
        for (const s of strs) {
                         
  (parameter) strs: string[]
          console.log(s);
        }
      } else if (typeof strs === "string") {
        console.log(strs);
                     
  (parameter) strs: string
      }
    }
  }


  // -----------------------------------------------

  interface Container {
    value: number | null | undefined;
  }
   
  function multiplyValue(container: Container, factor: number) {
    // Remove both 'null' and 'undefined' from the type.
    if (container.value != null) {
      console.log(container.value);
                             
  (property) Container.value: number
   
      // Now we can safely multiply 'container.value'.
      container.value *= factor;
    }
  }


// 'in' operator narrowing 
// JavaScript has an operator for determining if an object has a property with a name: the in operator. TypeScript takes this into account as a way to narrow down potential types.
type Fish = { swim : () => void }
type Bird = { fly : () => void }

function move(animal : Fish | Bird){
    if ( "swim" in animal){
        // checking if the swim key is present in animal 
        return animal.swim
    }

    return animal.fly()
}

// adding another type Human and redefining the move function

type Fish = { swim: () => void };
type Bird = { fly: () => void };
type Human = { swim?: () => void; fly?: () => void };
 
function move(animal: Fish | Bird | Human) {
  if ("swim" in animal) {
    animal; // (parameter) animal: Fish | Huma
      
  } else {
    animal; // (parameter) animal: Bird | Human
  }
}

// instanceof narrowing 
// JavaScript has an operator for checking whether or not a value is an “instance” of another value. 
// More specifically, in JavaScript x instanceof Foo checks whether the prototype chain of x contains Foo.prototype
function logValue(x: Date | string) {
    if (x instanceof Date) {
      console.log(x.toUTCString()); // (parameter) x: Date
    } else {
      console.log(x.toUpperCase()); // (parameter) x: string
    }
  }


// Assignments 
let x = Math.random() < 0.5 ? 10 : "hello world!";
   // let x: string | number
x = 1;
 
console.log(x);
    // let x: number
x = "goodbye!";
 
console.log(x); 
    // let x: string

// x = true    error -> as x can either be string or number adn not boolean
console.log(x)


// Using type predicates 
const zoo: (Fish | Bird)[] = [getSmallPet(), getSmallPet(), getSmallPet()];
const underWater1: Fish[] = zoo.filter(isFish);
// or, equivalently
const underWater2: Fish[] = zoo.filter(isFish) as Fish[];
 
// The predicate may need repeating for more complex examples
const underWater3: Fish[] = zoo.filter((pet): pet is Fish => {
  if (pet.name === "sharkey") return false;
  return isFish(pet);
});


// Assertion functions 
// Discriminated Unions 
function getArea(shape: Shape) {
    if (shape.kind === "circle") {
      return Math.PI * shape.radius ** 2;   // 'shape.radius' is possibly 'undefined'.
  
    }
  }
// Hmm, TypeScript still doesn’t know what to do here. We’ve hit a point where we know more about our values than the type checker does. 
// We could try to use a non-null assertion (a ! after shape.radius) to say that radius is definitely present.

// The problem with this encoding of Shape is that the type-checker doesn’t have any way to know whether or not radius or sideLength are present based on the kind property. 
// We need to communicate what we know to the type checker. 
// With that in mind, let’s take another swing at defining Shape.
interface Circle {
    kind: "circle";
    radius: number;
}
   
interface Square {
    kind: "square";
    sideLength: number;
}
   
type Shape = Circle | Square;
// Here, we’ve properly separated Shape out into two types with different values for the kind property, but radius and sideLength are declared as required properties in their respective types.

function getArea(shape: Shape) {
    if (shape.kind === "circle") {
      return Math.PI * shape.radius ** 2;   // (parameter) shape: Circle
    }
  }
// That got rid of the error! When every type in a union contains a common property with literal types, TypeScript considers that to be a discriminated union, and can narrow out the members of the union.

// The never type 
// Exhaustive checking 
type Shape = Circle | Square;
 
function getArea(shape: Shape) {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.sideLength ** 2;
    default:
      const _exhaustiveCheck: never = shape;
      return _exhaustiveCheck;
  }
}