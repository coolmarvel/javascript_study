async function makeRequests() {
  try {
    const response1 = await fetch("https://jsonplaceholder.typicode.com/todos/1");
    const jsonResponse1 = await response1.json();
    console.log("jsonResponse1", jsonResponse1);

    const response2 = await fetch("https://jsonplaceholder.typicode.com/todos/2");
    const jsonResponse2 = await response2.json();
    console.log("jsonResponse2", jsonResponse2);
  } catch (error) {
    console.log(error);
  } finally {
    console.log("---all process done---");
  }
}
makeRequests();

const myPromise = new Promise((resolve, reject) => {
  const error = false;
  if (!error) {
    setTimeout(() => {
      resolve("success");
    }, 1000);
  } else {
    setTimeout(() => {
      reject("failure");
    }, 1000);
  }
});

myPromise.then(
  (result) => {
    console.log(result);
  },
  (err) => {
    console.log(err);
  }
);
