var helloworld = "Hello World";
console.log(helloworld);
// You can then declare that a JavaScript object conforms to the shape of your new interface by using syntax like : TypeName after a variable declaration:
var user = {
    name: 'ATarva',
    id: 12
};
// You can use an interface declaration with classes:
var UserAccount = /** @class */ (function () {
    function UserAccount(name, id) {
        this.name = name;
        this.id = id;
    }
    return UserAccount;
}());
// using the interface class 
var user2 = new UserAccount("atharva", 123);
// Unions provide a way to handle different types too. For example, you may have a function that takes an array or a string:
function getLength(obj) {
    // the obj can be a string or an array of strings as well
    return obj.length;
}
// using typeof to check the data type 
function wrapInArray(obj) {
    if (typeof obj === 'string') {
        console.log("this is a string");
        return [obj];
    }
    else if (Array.isArray(obj)) {
        console.log('this is an array');
        return obj;
    }
}
function logPoint(p) {
    console.log("".concat(p.x, ", ").concat(p.y));
}
// logs "12,  26"
var point = { x: 12, y: 26 };
logPoint(point);
var point3 = { x: 12, y: 26, z: 89 };
logPoint(point3); // logs "12, 26"
var rect = { x: 33, y: 3, width: 30, height: 80 };
logPoint(rect); // logs "33, 3"
//const color = { hex: "#187ABF" }; // error
// logPoint(color);
var VirtualPoint = /** @class */ (function () {
    function VirtualPoint(x, y) {
        this.x = x;
        this.y = y;
    }
    return VirtualPoint;
}());
console.log('virtual point log point : ');
var newPoint = new VirtualPoint(13, 24);
logPoint(newPoint);
