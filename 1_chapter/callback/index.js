// // 1st request
// const response1 = request("http://abc.com");

// // 2nd request
// const response2 = request("http://bcd.com", response1);

function firstFunction(parameters, callback) {
  // do something
  const response1 = request(`http://abc.com?id=${parameters.id}`);
  callback(response1);
}

function secondFunction(response1, callback) {
  const response2 = request(`http://bcd.com`, response1);
  callback();
}

firstFunction(params, function (response1) {
  secondFunction(response1, function () {
    thirdFunction(params, function () {
      // ...
    });
  });
});
