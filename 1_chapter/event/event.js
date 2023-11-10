window.onload = () => {
  // 문서가 load 될 때 이 함수 실행
  let text = document.getElementById("text");
  // 아이디가 'text'인 요소를 return
  text.innerHTML = "HTML 문서 loaded";
};

const aElemnt = document.querySelector("a");
aElemnt.addEventListener("click", () => {
  alert("a element clicked");
});

const buttonElement = document.querySelector(".btn");
buttonElement.addEventListener("click", handleClick);
function handleClick(event) {
  let val;
  val = event;

  // Event target element
  val = event.target;
  val = event.target.id;
  val = event.target.className;
  val = event.target.classList;

  // Event type
  val = event.type;

  // 윈도우로부터의 거리 좌표
  val = event.clientY;
  val = event.clientX;

  // 요소로부터의 거리 좌표
  val = event.offsetY;
  val = event.offsetX;

  console.log(val);
}

// Click Event
// const submitBtn = document.querySelector(".submit-btn");
// const container = document.querySelector("form");
// const title = document.querySelector("h2");

// // Click
// submitBtn.addEventListener("click", handleEvent);
// // DoubleClick
// submitBtn.addEventListener("dbclick", handleEvent);
// // Mousedown
// submitBtn.addEventListener("mousedown", handleEvent);
// // Mouseup
// submitBtn.addEventListener("mouseup", handleEvent);
// // Mouseenter
// submitBtn.addEventListener("mouseenter", handleEvent);
// // Mouseleave
// submitBtn.addEventListener("mouseleave", handleEvent);
// // Mousemove
// submitBtn.addEventListener("mousemove", handleEvent);

// // Event Handler
// function handleEvent(event) {
//   event.preventDefault();
//   console.log(`EVENT TYPE: ${event.type}`);
//   title.textContent = `MouseX: ${event.offsetX} MouseT: ${event.offsetY}`;
// }

// FROM EVENT
const form = document.querySelector("form");
const emailInput = document.getElementById("email");
const title = document.querySelector("h2");

// Clear input
emailInput.value = "";

form.addEventListener("submit", handleEvent);

// Keydown
emailInput.addEventListener("keydown", handleEvent);
// Keyup
emailInput.addEventListener("keyup", handleEvent);
// Keypress
emailInput.addEventListener("keypress", handleEvent);
// Focus
emailInput.addEventListener("focus", handleEvent);
// Blur (focus 하고 다른 곳 클릭하면...)
emailInput.addEventListener("blur", handleEvent);
// Cut (잘라내기 할 때)
emailInput.addEventListener("cut", handleEvent);
// Paste (붙여넣기 할 때)
emailInput.addEventListener("paste", handleEvent);
// Input (input 요소 값이 달라졌을 때)
emailInput.addEventListener("input", handleEvent);

function handleEvent(event) {
  console.log(`EVENT TYPE: ${event.type}`);

  if (event.type === "submit") {
    event.preventDefault();
  }

  console.log(event.target.value);
  title.innerHTML = event.target.value;
}
