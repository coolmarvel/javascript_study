class Car {
  // 여러 메서드를 정의할 수 있음
  method1() {}
  method2() {}
  method3() {}
}

class Animal {
  constructor() {}

  method1() {}
  method2() {}
  method3() {}
}

// Polymorphism -- 클래스는 메서드는 같지만 구현이 다릅니다.
class PaymentGateway {
  constructor() {
    this.connect();
  }

  connect() {
    // 결제 제공업체에 연결
    // ...
  }

  pay(amount) {}

  refund(amount) {}
}

class Paypal extends PaymentGateway {
  pay(amount) {
    // Paypal 전용 로직 구현
  }

  refund(amount) {
    // Paypal 전용 로직 구현
  }

  connect() {
    // Paypal 전용 로직 구현
  }
}

class Visa extends PaymentGateway {
  pay(amount) {
    // Visa 전용 로직 구현
  }

  refund(amount) {
    // Visa 전용 로직 구현
  }

  connect() {
    // Visa 전용 로직 구현
  }
}

class Customor {
  makePayment(gateway, amount) {
    return gateway.pay(amount);
  }

  // 만약 다형성이 없다면 이런식으로 메서드들을 생성해야함.
  // payByPaypal(amount) {}
  // payByVisa(amount) {}

  getRefund(gateway, amount) {
    return gateway.refund(amount);
  }
}

const marvel = new Customor();
const paypal = new Paypal();
const visaCard = new Visa();

marvel.makePayment(paypal, 100);
marvel.makePayment(visaCard, 100);
