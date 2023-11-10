class Person {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }

  introduce() {
    return `Hello my name is ${this.name}`;
  }
}

class Client extends Person {
  constructor(name, email, phone, address) {
    super(name, email);

    this.phone = phone; // 부모 클래스에게 상속받아 자식 클래스를 만들고,
    this.address = address; // 자식 클래스에 부모 클래스의 속성을 볼러올 때 super()를 사용
  }
}

const marvel = new Client("marvel", "marvel97@naver.com", "010-1234-5678", "Seoul");

console.log(marvel.introduce());
