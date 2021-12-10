const { Socket } = require("dgram");
const http = require("http");
const { promisify } = require("util");
const EventEmitter = require("events");

const sleep = promisify(setTimeout);

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

const server = http.createServer((req, res) => {
  let dataToProcess = [];
  let jsonReader = new JSONReader();
  const flushAndProcess = () => {
    return new Promise((resolve) => {
      if (dataToProcess.length % 10000 === 0) {
        setTimeout(() => {
          console.log("Flushing Data and Processing");
          dataToProcess = [];
          resolve();
        }, 3000);
      } else {
        resolve();
      }
    });
  };
  jsonReader.JSONEmitter.on("json", (jsonData) => dataToProcess.push(jsonData));
  req.on("close", () => console.log("Closed"));
  req.on("end", () => {
    console.log("Request End.. Data processed", jsonReader.parsedJSONCounter);
    res.end();
  });
  // req.on("data", (chunk) => console.log("data", chunk.toString()));
  req.on("readable", async () => {
    await flushAndProcess();
    jsonReader.makeJSONFromStream(req);
  });
});
server.listen(3000, () => {
  setInterval(() => {
    console.log("rss", process.memoryUsage().rss / 1024 / 1024);
  }, 1000);
  console.log("Listening on 3000");
});
