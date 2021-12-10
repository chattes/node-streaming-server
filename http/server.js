const { Socket } = require("dgram");
const http = require("http");
const { promisify } = require("util");

const sleep = promisify(setTimeout);

const server = http.createServer((req, res) => {
  req.on("close", () => console.log("Closed"));
  req.on("end", () => res.end());
  req.on("readable", async () => {
    let len;
    while ((len = req.read(4))) {
      let bodyLength = len.readUInt32BE();
      let body = req.read(bodyLength);
      if (!body) {
        req.unshift(len);
        return;
      }
      let data = JSON.parse(body);
      await sleep(1000);
      console.log(data.length);
    }
  });
});
server.listen(3000, () => {
  // setInterval(() => {
  //   console.log("rss", process.memoryUsage().rss / 1024 / 1024);
  // }, 10000);
  console.log("Listening on 3000");
});
