const http = require("http");
const { promisify } = require("util");

const sleep = promisify(setTimeout);

const server = http.createServer((req, res) => {
  req.on("close", () => console.log("Closed"));
  req.on("end", () => {
    let buf = Buffer.concat(chunks);
    console.log(JSON.parse(buf));
    res.writeHead(200, {
      "Content-Type": "application/json",
    });
    res.write(JSON.stringify({ status: "processed" }));
    res.end();
  });
  let chunks = [];
  let index = 0;

  req.on("readable", async () => {
    // await sleep(1000);
    await sleep(500);
    while ((chunk = req.read())) {
      console.log("processing...");
      chunks.push(chunk);
    }
  });
});
server.listen(3000, () => {
  // setInterval(() => {
  //   console.log("rss", process.memoryUsage().rss / 1024 / 1024);
  // }, 10000);
  console.log("Listening on 3000");
});
