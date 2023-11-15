// setTimeout(() => {
//   console.log("timeout");
// }, 0);

// setImmediate(() => {
//   console.log("immediate");
// });

// process.nextTick(() => {
//   console.log("nextTick");
// });

// console.log("current event loop");

// let count = 0;

// const cb = () => {
//   console.log(`Processing nextTick cb ${++count}`);
// };

// setImmediate(() => console.log("setImmediate is called"));
// setTimeout(() => {
//   console.log("setTimeout executed");
// }, 100);

// process.nextTick(cb);

// console.log("Start");

// let count = 0;
// const cb = () => {
//   if (count < 2000) {
//     console.log(`Processing setImmediate cb ${++count}`);
//     setImmediate(cb);
//   }
// };
// setImmediate(cb);
// setTimeout(() => console.log("setTimeout executed"), 50);
// console.log("Start");

// timeout vs immdiate
// setTimeout(() => console.log("timeout"));
// setImmediate(() => console.log("immediate"));

const fs = require("fs");

fs.readFile(__filename, () => {
  setTimeout(() => console.log("timeout"));
  setImmediate(() => console.log("immediate"));
});
