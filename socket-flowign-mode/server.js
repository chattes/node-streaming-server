const net = require("net");
const chalk = require("chalk");

const someComplexTask = (delay) => {
  return new Promise((res) => {
    setTimeout(() => {
      res();
    }, delay);
  });
};

const writeDataonSocket = () => {
  return (
    [
      "HTTP/1.1 200 OK",
      "Content-Type: application/json; charset=UTF-8",
      "Content-Encoding: UTF-8",
      "Accept-Ranges: bytes",
    ].join("\n") + "\n\n"
  );
};

const handleConnection = (socket) => {
  console.log("Connection Established with client");
  let chunks = [];
  let processBuffer = 5000;
  let buf = Buffer.alloc(10000);
  setInterval(() => {
    let rss = process.memoryUsage().rss / 1024 / 1024;
    if (rss > 100) {
      processBuffer = 20000;
    }
    if (rss > 200) {
      processBuffer = 40000;
    }
    console.log("rss", rss);
  }, 5000);
  socket.on("data", async (chunk) => {
    chunks.push(chunk);
    console.log(chunk.toString());
    // console.log("Current Buffer", buf.length);
    let totalLength = chunks.reduce((prev, current) => {
      return prev + current.byteLength;
    }, 0);

    if (totalLength / 1000 > processBuffer) {
      console.log("Total Data read", totalLength);
      // console.log(chunks.toString());
      buf = Buffer.concat(chunks);
      console.log("Buffer Length,", buf.byteLength);
      socket.pause();
      let randomDelay = Math.random() * (10000 - 1000 + 1) + 1000;
      console.log(`Sleeeping for ${Math.floor(randomDelay / 1000)} seconds`);
      // Lets inroduce some random delay between 1 to 5 seconds
      await someComplexTask(Math.floor(randomDelay));
      console.log("Clearing all buffers");
      chunks = [];
      socket.resume();
    }

    // console.log(chunk);
    // socket.pause();
    // console.log("Chunk Size", chunk.toString().length);
    // socket.resume();
    if (chunk.indexOf("0\r\n\r\n") > 0) {
      let customMessage = {
        requestCompleted: "We are done Here!",
      };
      let messageData = JSON.stringify(customMessage);
      let length = Buffer.byteLength(messageData);
      let finalData = length + messageData;
      socket.write(writeDataonSocket());
      socket.write(messageData, () => {
        console.log("Response written to Socket");
      });
      socket.end();

      // socket.write(
      //   "HTTP/1.1 200 OK\r\nServer: my-custom-server\r\nContent-Length: 0\r\n\r\n",
      //   () => {
      //     console.log("Response written to Socket");
      //   }
      // );
    }
  });

  socket.on("end", () => {
    console.log(chalk.yellow("Request Done!!"));
  });

  //   socket.setTimeout(3000);
  //   socket.on("timeout", () => {
  //     console.log(chalk.bgRed("socket timeout"));
  //     socket.end();
  //   });
};

const server = net.createServer();
server.on("connection", handleConnection);
server.on("error", (err) => {
  console.log(chalk.bgRedBright("Centralized Handler for any error \n"));
  console.trace(err);
});
server.listen(3001, () => {
  console.log("Server listening on 3001");
});
