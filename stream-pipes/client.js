const { Readable, pipeline } = require("stream");
const http = require("http");
const { promisify } = require("util");

const sleep = promisify(setTimeout);
let drainEventCalled = 0;

const data = [
  {
    _id: "6192c126465ae155e3d6f2f9",
    isactive: true,
    balance: "2,125.46",
    picture: "http://placehold.it/32x32",
    age: 30,
    eyecolor: "brown",
    name: "aguilar ruiz",
    gender: "male",
    company: "vetron",
    email: "aguilarruiz@vetron.com",
    phone: "+1 (830) 508-2418",
    address: "451 scott avenue, vincent, american samoa, 4990",
    about:
      "consequat voluptate laborum magna elit est dolor qui non. non sunt ad labore nulla anim ipsum tempor do fugiat eu ipsum fugiat cillum. laboris officia est lorem quis sit ad consequat ullamco enim occaecat nisi. in ipsum reprehenderit labore laboris reprehenderit dolore eiusmod ut dolore eiusmod. irure in reprehenderit adipisicing exercitation occaecat eu ullamco voluptate laborum ex in minim voluptate incididunt. reprehenderit aute tempor enim enim cupidatat anim aliquip cupidatat nisi et amet. do quis cillum nostrud proident sit eiusmod aliqua nisi incididunt magna.\r\n",
    registered: "2019-12-10t09:52:42 +05:00",
    latitude: 30.443211,
    longitude: 168.052318,
    tags: ["aliquip", "nulla"],
    friends: [
      { id: 0, name: "shauna juarez" },
      { id: 1, name: "alvarado bright" },
      { id: 2, name: "mendez miller" },
    ],
    greeting: "hello, aguilar ruiz! you have 8 unread messages.",
    favoritefruit: "strawberry",
  },
];

async function* genData() {
  for (let i = 0; i < 50000; i++) {
    let chunk = Array(50).fill(data[0]);
    // chunk._id = i;
    let body = JSON.stringify(chunk);
    let dataBytes = Buffer.byteLength(body);
    let buffer = Buffer.alloc(4 + dataBytes);
    buffer.writeUInt32BE(dataBytes);
    buffer.write(body, 4);
    yield buffer;
  }
}

const source = Readable.from(genData());
let options = {
  method: "POST",
  hostname: "localhost",
  port: 3000,
  path: "/",
  headers: {
    "Content-Type": "application/json",
  },
};
const request = http.request(options, (res) => {
  console.log("Request Done");
});

request.on("drain", () => {
  drainEventCalled++;
  if (drainEventCalled % 500 === 0) {
    process.nextTick(() => console.log("Drained Buffer"));
  }
});
setInterval(() => {
  console.log("rss client::", process.memoryUsage().rss / 1024 / 1024);
}, 10000);

pipeline(source, request, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("Done. Drain Event Called: ", drainEventCalled);
});
