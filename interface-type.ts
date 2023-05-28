// Interface VS Type

// 1. Interface are expandable but types are not expandable 
// example - 

    // interface 
interface Animal {
    name: string;
}

interface Bear extends Animal {
    honey: boolean;
}

const bear = getBear();
bear.name;
bear.honey;

    // type
type Animal2 = {
    name: string;
  }
  
  type Bear2 = Animal2 & { 
    honey: boolean;
  }
  
  const bear2 = getBear2();
  bear2.name;
  bear2.honey;



// 2. Interface allows you to add new fields to an existing interface but type cannot be changed after creating 
// example 

  // interface 
  interface Window {
    title: string;
}
  
interface Window {
    ts: TypeScriptAPI
}
  
const src = 'const a = "Hello World"';
window.ts.transpileModule(src, {});

    // type 
type Window = {
    title: string;
}
      
type Window = {
    ts: TypeScriptAPI;
}
// Error: Duplicate identifier 'Window'.
     