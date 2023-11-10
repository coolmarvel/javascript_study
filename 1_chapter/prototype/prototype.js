// let user = {
//   name: "marvel",
//   age: 27,
// };

// console.log(user.name); // marvel
// console.log(user.hasOwnProperty("email")); // false

// function Person(name, email, birthday) {
//   this.name = name;
//   this.email = email;
//   this.birthday = new Date(birthday);

//   this.calculateAge = function () {
//     const diff = Date.now() - this.birthday.getTime();
//     const ageDate = new Date(diff);

//     return Math.abs(ageDate.getUTCFullYear() - 1970);
//   };
// }

// const marvel = new Person("marvel", "marvel97@naver.com", "11/25/1997");
// const windfall = new Person("windfall", "abc@def.com", "11/12/1982");

// console.log(marvel);
// console.log(windfall);

// Person Constructor
// function Person(name, email, birthday) {
//   this.name = name;
//   this.email = email;
//   this.birthday = new Date(birthday);
// }

// Person.prototype.calculateAge = function () {
//   const diff = Date.now() - this.birthday.getTime();
//   const ageDate = new Date(diff);

//   return Math.abs(ageDate.getUTCFullYear() - 1970);
// };

// const marvel = new Person("marvel", "marvel97@naver.com", "11/25/1997");
// const windfall = new Person("windfall", "abc@def.com", "11/12/1982");

// console.log(marvel);
// console.log(windfall);

// Object.create() // 메서드는 지정된 프로토타입 객체 및 속성(property)을 갖는 새 객체를 만듭니다.

// function Person(name, email, birthday) {
//   let person = Object.create(personPrototype);
//   person.name = name;
//   person.email = email;
//   person.birthday = new Date(birthday);

//   return person;
// }

// const personPrototype = {
//   calculateAge() {
//     const diff = Date.now() - this.birthday.getTime();
//     const ageDate = new Date(diff);

//     return Math.abs(ageDate.getUTCFullYear() - 1970);
//   },
// };

// const marvel = new Person("marvel", "marvel97@naver.com", "11/25/1997");
// const windfall = new Person("windfall", "abc@def.com", "11/12/1982");

// console.log(marvel);
// console.log(windfall);
