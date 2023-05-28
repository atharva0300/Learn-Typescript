// Function Overloads

function makeDate(timestamp: number): Date;
function makeDate(m: number, d: number, y: number): Date;
function makeDate(mOrTimestamp: number, d?: number, y?: number): Date {
  if (d !== undefined && y !== undefined) {
    return new Date(y, mOrTimestamp, d);
  } else {
    return new Date(mOrTimestamp);
  }
}

// overload signatures
const d1 = makeDate(12345678);
const d2 = makeDate(5, 5, 5);
// const d3 = makeDate(1,3) -> the function does not take 2 arguments, only 1 or 3 


// Overload Signature and Implementation structure 
function fn(x : string ) : void 
function fn(){
    //
}

fn();   // this gives error 
/*
    Explaination of the error : The signature of the implementation is not visible from the outside. 
                                When writing an overloaded function, you should always have two or more signatures above the implementation of the function.
*/

// The implementation signature must also be compatible with the overload signatures. 
// For example, these functions have errors because the implementation signature doesn’t match the overloads in a correct way:

function fn(x: boolean): void;
// Argument type isn't right
function fn(x: string): void;
// This overload signature is not compatible with its implementation signature.

function fn(x: boolean) {}


function fn(x: string): string;
// Return type isn't right
function fn(x: number): boolean;
// This overload signature is not compatible with its implementation signature.

function fn(x: string | number) {
  return "oops";
}

