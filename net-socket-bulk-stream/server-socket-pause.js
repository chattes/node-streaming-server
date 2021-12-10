const net = require("net");
const chalk = require("chalk");
const { EventEmitter } = require("events");

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

class JSONReader {
  bytesToRead = 0;
  chunks = [];
  parsedJSONCounter = 0;
  JSONEmitter;

  constructor() {
    this.JSONEmitter = new EventEmitter();
  }

  setBytestoRead(len) {
    this.bytesToRead = len;
  }
  reset() {
    this.bytesToRead = 0;
    this.chunks = [];
  }
  parseJSON() {
    try {
      let buffer = Buffer.concat(this.chunks);
      let parsedJSON = JSON.parse(buffer);
      this.parsedJSONCounter++;
      return parsedJSON;
    } catch (error) {
      console.error("Error parsing JSON String", error);
    }
  }

  readBytes(inStream) {
    let body = inStream.read(this.bytesToRead);

    if (body) {
      this.chunks.push(body);
      const jsonData = this.parseJSON();
      this.reset();
      this.JSONEmitter.emit("json", jsonData);
      return;
    }

    body = inStream.read();
    if (!body) return;
    this.chunks.push(body);
    this.bytesToRead = this.bytesToRead - Buffer.byteLength(body);
  }

  makeJSONFromStream(inStream) {
    if (this.bytesToRead > 0) {
      this.readBytes(inStream);
    }
    let lenBytes;
    while (null !== (lenBytes = inStream.read(4))) {
      this.bytesToRead = lenBytes.readUInt32BE();
      this.readBytes(inStream);
    }
  }
}

const handleConnection = (socket) => {
  let watchInterval;
  let allDataProcessedCount = 0;
  console.log("Connected");
  watchInterval = setInterval(() => {
    console.log("rss", process.memoryUsage().rss / 1024 / 1024);
    console.log("Data Processed::", allDataProcessedCount);
  }, 6000);
  const flushAndProcess = () => {
    return new Promise((resolve) => {
      // process 50KB of Data
      if (Buffer.byteLength(JSON.stringify(dataToProcess)) > 500000) {
        setTimeout(() => {
          allDataProcessedCount = allDataProcessedCount + dataToProcess.length;
          // console.log("Flushing Data and Processing");
          dataToProcess = [];
          resolve();
        }, 3000);
      } else {
        resolve();
      }
    });
  };

  const jsonReader = new JSONReader();
  let dataToProcess = [];
  //   socket.on("close", () => console.log("Socket closed"));
  jsonReader.JSONEmitter.on("json", (jsonData) => dataToProcess.push(jsonData));
  socket.on("end", () => {
    console.log("Socket ended");
  });
  socket.on("readable", async () => {
    try {
      await flushAndProcess();
      jsonReader.makeJSONFromStream(socket);
    } catch (error) {
      console.error(error);
    }
  });
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
