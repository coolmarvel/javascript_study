// function func() {
//   if (true) {
//     var a = "a";
//     console.log(a); // 'a'
//   }
//   console.log(a); // 'a'
// }

// func();
// console.log(a); // ReferenceError: a is not defined

// function func() {
//   if (true) {
//     let a = "a";
//     console.log(a); // 'a'
//   }
//   console.log(a); // ReferenceError: a is not defined
// }
// func();
// console.log(a); // ReferenceError: a is not defined

// console.log(greeting); // undefined
// var greeting = "hello";

// func(); // hoisting test
// function func() {
//   console.log("hoisting test");
// }

// console.log(greeting); // ReferenceError: Cannot access 'greeting' before initialization
// const greeting = "hello";

// let foo = 42; // foo is number
// foo = "bar"; // now foo is string
// foo = true; // now foow is boolean

// Primitive Types
// String
// const name = "Han";
// // Number
// const age = 30;
// // Boolean
// const hasJob = true;
// // Null
// const car = null;
// // Undefined
// let anything;
// // Symbol
// const sym = Symbol();

// // Reference Types - Objects
// // Array
// const hobbies = ["walking", "books"];
// // Object literal
// const address = { province: "경기도", city: "성남시" };

// console.log(hasJob); // true
// console.log(typeof hasJob); // boolean

// console.log(typeof hobbies);         // object
// console.log(Array.isArray(address)); // false

// for (let i = 0; i < 10; i++) {
//   if (i === 3) {
//     console.log("It is 3");
//     continue;
//   }

//   if (i === 5) {
//     console.log("5 Stop the loop");
//     break;
//   }

//   console.log("Number " + i);
// }

// const user = { name: "marvel", province: "경기도", city: "성남시" };
// for (const u in user) {
//   console.log(`${u} : ${user[u]}`);
// }

// let i = 0;
// while (i < 5) {
//   console.log("Number " + i);
//   i++;
// }

// let i = 0;
// do {
//   console.log("Number " + i);
//   i++;
// } while (i < 5);

// let i = 100;
// do {
//   console.log("Number " + i);
//   i++;
// } while (i < 5);

// // Loop Through Array
// const locations = ["Seoul", "Busan", "Geongido", "Daegu"];

// // For
// for (let i = 0; i < locations.length; i++) {
//   console.log(locations[i]);
// }

// // ForEach
// locations.forEach(function (location, index, array) {
//   console.log(`${index} : ${location}`);
//   console.log(array);
// });

// // Map
// locations.map(function (location) {
//   console.log(location);
// });

// Alert
alert("Hello World");

// Prompt
const input = prompt();
alert(input);

// Confirm
if (confirm("Yes of No")) {
  console.log("YES");
} else {
  console.log("NO");
}

let val;
// Outter height and width
val = window.outerHeight;
val = window.outerWidth;

// Inner height and width
val = window.innerHeight;
val = window.innerWidth;

// Scroll points
val = window.scrollY;
val = window.scrollX;

console.log(val);

// Location Object
val = window.location;
val = window.location.hostname;
val = window.location.port;
val = window.location.href;
val = window.location.search;

// Redirect
window.location.href = "http://google.com";
// Reload
window.location.reload();

// History Object
window.history.go(-2);
val = window.history.length;

// Navigator Object
val = window.navigator;
val = window.navigator.userAgent;
val = window.navigator.language;

console.log(val);

var greeting = "hello";

function doGreeting() {
  return greeting;
}

console.log(window.greeting);     // hello
console.log(window.doGreeting()); // hello

