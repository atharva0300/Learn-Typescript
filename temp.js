var user = {
    id: 12,
    name: "atharva"
};
console.log('user : ', user);
var UserAccount = /** @class */ (function () {
    function UserAccount(name, id) {
        this.name = name;
        this.id = id;
    }
    return UserAccount;
}());
// creating a new object with the class that checks for the type from User interface
var user1 = new UserAccount("adi", 12);
console.log('user1 : ', user1);
// unions in functions 
function getLength(obj) {
    return obj.length;
}
// type of -> checking the type 
function wrapperFunction(obj) {
    if (typeof obj == "string") {
        console.log("The obj is a string");
    }
    else if (typeof obj == "number") {
        console.log("The obj is a number");
    }
}
var obj = backpack.get();
function logPoint(p) {
    console.log(p.x, ' : ', p.y);
}
// the shape of the point object and the shape of the 'Point' interface is the same, so considered the same type 
var point = { x: 12, y: 14 };
logPoint(point);
// the 'Point' interface must be a subset of the point1 object that we are passing to the function 
var point1 = { x: 12, y: 14, width: 123 };
logPoint(point1);
function logPoint2(p) {
    console.log(p.x);
}
// const point2 = {x : 12} -> error : as y is missing 
// logPoint(point2)
// same error even when we are not using p.y in the logPoint2 function 
// const point2 = {x : 12}
// logPoint2(point2)
