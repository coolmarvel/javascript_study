// // // function func() {
// // //   if (true) {
// // //     var a = "a";
// // //     console.log(a); // 'a'
// // //   }
// // //   console.log(a); // 'a'
// // // }

// // // func();
// // // console.log(a); // ReferenceError: a is not defined

// // // function func() {
// // //   if (true) {
// // //     let a = "a";
// // //     console.log(a); // 'a'
// // //   }
// // //   console.log(a); // ReferenceError: a is not defined
// // // }
// // // func();
// // // console.log(a); // ReferenceError: a is not defined

// // // console.log(greeting); // undefined
// // // var greeting = "hello";

// // // func(); // hoisting test
// // // function func() {
// // //   console.log("hoisting test");
// // // }

// // // console.log(greeting); // ReferenceError: Cannot access 'greeting' before initialization
// // // const greeting = "hello";

// // // let foo = 42; // foo is number
// // // foo = "bar"; // now foo is string
// // // foo = true; // now foow is boolean

// // // Primitive Types
// // // String
// // // const name = "Han";
// // // // Number
// // // const age = 30;
// // // // Boolean
// // // const hasJob = true;
// // // // Null
// // // const car = null;
// // // // Undefined
// // // let anything;
// // // // Symbol
// // // const sym = Symbol();

// // // // Reference Types - Objects
// // // // Array
// // // const hobbies = ["walking", "books"];
// // // // Object literal
// // // const address = { province: "경기도", city: "성남시" };

// // // console.log(hasJob); // true
// // // console.log(typeof hasJob); // boolean

// // // console.log(typeof hobbies);         // object
// // // console.log(Array.isArray(address)); // false

// // // for (let i = 0; i < 10; i++) {
// // //   if (i === 3) {
// // //     console.log("It is 3");
// // //     continue;
// // //   }

// // //   if (i === 5) {
// // //     console.log("5 Stop the loop");
// // //     break;
// // //   }

// // //   console.log("Number " + i);
// // // }

// // // const user = { name: "marvel", province: "경기도", city: "성남시" };
// // // for (const u in user) {
// // //   console.log(`${u} : ${user[u]}`);
// // // }

// // // let i = 0;
// // // while (i < 5) {
// // //   console.log("Number " + i);
// // //   i++;
// // // }

// // // let i = 0;
// // // do {
// // //   console.log("Number " + i);
// // //   i++;
// // // } while (i < 5);

// // // let i = 100;
// // // do {
// // //   console.log("Number " + i);
// // //   i++;
// // // } while (i < 5);

// // // // Loop Through Array
// // // const locations = ["Seoul", "Busan", "Geongido", "Daegu"];

// // // // For
// // // for (let i = 0; i < locations.length; i++) {
// // //   console.log(locations[i]);
// // // }

// // // // ForEach
// // // locations.forEach(function (location, index, array) {
// // //   console.log(`${index} : ${location}`);
// // //   console.log(array);
// // // });

// // // // Map
// // // locations.map(function (location) {
// // //   console.log(location);
// // // });

// // // Alert
// // alert("Hello World");

// // // Prompt
// // const input = prompt();
// // alert(input);

// // // Confirm
// // if (confirm("Yes of No")) {
// //   console.log("YES");
// // } else {
// //   console.log("NO");
// // }

// // let val;
// // // Outter height and width
// // val = window.outerHeight;
// // val = window.outerWidth;

// // // Inner height and width
// // val = window.innerHeight;
// // val = window.innerWidth;

// // // Scroll points
// // val = window.scrollY;
// // val = window.scrollX;

// // console.log(val);

// // // Location Object
// // val = window.location;
// // val = window.location.hostname;
// // val = window.location.port;
// // val = window.location.href;
// // val = window.location.search;

// // // Redirect
// // window.location.href = "http://google.com";
// // // Reload
// // window.location.reload();

// // // History Object
// // window.history.go(-2);
// // val = window.history.length;

// // // Navigator Object
// // val = window.navigator;
// // val = window.navigator.userAgent;
// // val = window.navigator.language;

// // console.log(val);

// // var greeting = "hello";

// // function doGreeting() {
// //   return greeting;
// // }

// // console.log(window.greeting);     // hello
// // console.log(window.doGreeting()); // hello

// // let val;

// // val = document;
// // val = document.baseURI;                 // 웹 페이지의 절대 URI를 반환
// // val = document.head;                    // <head> 태그 반환
// // val = document.body;                    // <body> 태그 반환
// // val = document.doctype;                 // 웹 페이지의 문서 형식을 반환
// // val = document.cookie;                  // 웹 페이지의 쿠키를 반환

// // val = document.forms;                   // <form> 태그 반환
// // val = document.forms[0].id;
// // val = document.forms[0].action;
// // val = document.forms[0].method;

// // val = document.links;                   // href 속성이 있는 <a> 태그 반환
// // val = document.links[0];
// // val = document.links[0].id;
// // val = document.links[0].classList[0];
// // val = document.links[0].className;

// // val = document.images;                  // <img> 태그 반환

// // val = document.scripts;                 // <script> 태그 반환
// // val = document.scripts[0].getAttribute("src");

// // console.log(val);

// // 파라미터로 전달한 ID를 가진 태그를 반환
// document.getElementById(요소아이디);

// // 파라미터로 전달한 name 속성을 가진 태그를 반환
// document.getElementsByName(name속성값);

// // 파라미터로 전달한 선택자에 맞는 첫 번째 태그를 반환
// document.querySelector(선택자);

// // document.getElementById()
// console.log(document.getElementById("header-container"));
// console.log(document.getElementById("header-heading").className);

// // styling 변경
// headerContainer.style.fontSize = "10px";
// headerContainer.style.display = "none";

// // content 변경
// headerContainer.textContent = "Text Content";
// headerContainer.innerText = "Inner Text";
// headerContainer.innerHTML = '<span style="color:blue">Inner HTML</span>';

// // document.querySelector()
// console.log(document.querySelector("#form-first-div"));
// console.log(document.querySelector(".form-container"));
// console.log(document.querySelector("h5"));

// document.querySelector("li").style.color = "blue";
// document.querySelector("ul li").style.color = "red";

// document.querySelector("li:last-child").style.color = "red";
// document.querySelector("li:last-child(3)").style.color = "orange";
// document.querySelector("li:last-child(4)").style.color = "Hello World";
// document.querySelector("li:last-child(odd)").style.color = "gray";
// document.querySelector("li:last-child(even)").style.color = "lightgray";

// 파라미터로 전달한 태그이름을 가진 모든 태그들을 반환(배열)
document.getElementsByTagName(태그이름);

// 파라미터로 전달한 클래스 이름을 가진 모든 태그들ㅇ르 반환(배열)
document.getElementsByClassName(클래스이름);

// 파라미터로 전달한 선택자에 맞는 모든 태그들을 반환(배열)
document.querySelectorAll(선택자);

// document.getElementByClassName
const items = document.getElementsByClassName("list-group-item");
console.log(items);
console.log(items[0]);
items[0].style.color = "blue";
items[3].textContent = "Hi";

// document.getElementByTagName
let list = document.getElementsByTagName("li");
console.log(list);
console.log(list[0]);
list[0].style.color = "red";
list[3].textContent = "Hello";

// HTML 모음을 배열로 만들기
list = Array.from(list);

list.reverse();

list.forEach((li, index) => {
  console.log(li.className);
  li.textContent = `${index}. List`;
});

console.log(list);

// document.querySelectorAll
const items = document.querySelectorAll("ul.list-group li.list-group-item");

items.forEach((item, index) => {
  item.textContent = `${index}. List`;
});

const liOdd = document.querySelectorAll("li:nth-child(odd)");
const liEven = document.querySelectorAll("li:nth-child(even)");

liOdd.forEach((li, index) => {
  li.style.background = "gray";
});

for (let i = 0; i < liEven.length; i++) {
  liEven[i].style.background = "lightgray";
}

console.log(items);

// innerHTML vs innerText vs textContent
const element = document.getElementById("container");

console.log(element.innerHTML);
console.log(element.innerText);
console.log(element.textContent);
