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
  socket.on("data", async (chunk) => {
    // console.log(chunk.toString());
    socket.pause();
    const delay = Math.floor(Math.random() * (3000 + 1));
    await someComplexTask(delay);
    socket.resume();
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
