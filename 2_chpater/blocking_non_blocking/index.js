const fs = require("fs");
const data = fs.readFileSync("../../README.md"); // blocks here until file is read
console.log(data);

// will run after console.log

fs.readFile("README.md", (err, data) => {
  if (err) throw err;
  console.log(data);
});
// will run before console.log

fs.readFile("README.md", (err, data) => {
  if (err) throw err;
  console.log(data);
});
fs.unlinkSync("README.md");

fs.readFile("README.md", (read_err, data) => {
  if (read_err) throw read_err;
  console.log(data);

  fs.unlink("README.md", (unlink_err) => {
    if (unlink_err) throw unlink_err;
  });
});
