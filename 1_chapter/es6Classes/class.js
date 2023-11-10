class Person {
  // constructor는 인스턴스의 생성과 동시에 클래스 필드의 생성과 초기화를 실행함.
  constructor(name, email, birthday) {
    this.name = name; // this는 클래스가 생성할 인스턴스를 가리킵니다.
    this.email = email;
    this.birthday = new Date(birthday);
  } // constructor는 생략할 수 있음

  introduce() {
    return `Hello my name is ${this.name}`;
  }

  static multipleNumbers(x, y) {
    return x * y;
  }
}

console.log(Person.multipleNumbers(2, 9));

// const marvel = new Person("marvel", "marvel97@naver.com", "1997.11.25");
// console.log(marvel);
