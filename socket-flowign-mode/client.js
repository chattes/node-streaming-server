var http = require("http");
var fs = require("fs");
const uuid = require("uuid");

let data = [
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
  {
    _id: "6192c126d5cbb66dd0324d4b",
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
  {
    _id: "6192c126615b281f2fd4cf4e",
    index: 2,
    guid: "eb21bb4b-7c41-49b2-ace9-350539cc2726",
    isActive: false,
    balance: "2,937.07",
    picture: "http://placehold.it/32x32",
    age: 35,
    eyeColor: "brown",
    name: "Graves Christensen",
    gender: "male",
    company: "EXOSWITCH",
    email: "graveschristensen@exoswitch.com",
    phone: "+1 (856) 568-3606",
    address: "343 Schenck Court, Muse, New Jersey, 583",
    about:
      "Nulla consequat proident ipsum eiusmod ipsum anim occaecat ex culpa et esse anim. Sit officia culpa cillum cupidatat nisi sint ullamco cupidatat labore minim ipsum laborum. Excepteur veniam eu enim aliqua ad ut sunt irure. Elit Lorem excepteur mollit qui Lorem do eiusmod id cupidatat sunt deserunt. Nostrud fugiat ad minim magna. Nulla esse irure voluptate esse esse labore mollit aliqua in.\r\n",
    registered: "2016-06-24T11:17:37 +04:00",
    latitude: 30.226682,
    longitude: -145.42101,
    tags: ["amet", "consectetur"],
    friends: [
      { id: 0, name: "Glenn Lang" },
      { id: 1, name: "Huffman Nelson" },
      { id: 2, name: "Roseann Morrow" },
    ],
    greeting: "Hello, Graves Christensen! You have 10 unread messages.",
    favoriteFruit: "strawberry",
  },
  {
    _id: "6192c1265874a5e4882225a1",
    index: 3,
    guid: "8847c1d5-ff8d-4fa5-9bda-517594f23aae",
    isActive: false,
    balance: "1,168.64",
    picture: "http://placehold.it/32x32",
    age: 30,
    eyeColor: "green",
    name: "Molly Kelly",
    gender: "female",
    company: "UNI",
    email: "mollykelly@uni.com",
    phone: "+1 (935) 489-2151",
    address: "246 Essex Street, Yukon, Florida, 2741",
    about:
      "Irure tempor Lorem quis in incididunt exercitation ut incididunt cupidatat laboris id do labore dolor. Cillum ipsum voluptate officia exercitation. Velit dolor do ipsum id in esse aliquip laborum elit laborum aliquip ex enim. In cupidatat duis dolor est aliqua. Est culpa sit sit enim sunt aliquip ea magna ut consectetur dolor amet duis consequat. Deserunt veniam veniam pariatur sint velit magna nostrud sit veniam. Elit ea eiusmod ea exercitation officia esse magna elit.\r\n",
    registered: "2018-04-15T07:05:31 +04:00",
    latitude: 70.199552,
    longitude: 127.31784,
    tags: ["ipsum", "incididunt"],
    friends: [
      { id: 0, name: "Lori Wright" },
      { id: 1, name: "Carney Payne" },
      { id: 2, name: "Rachel Pierce" },
    ],
    greeting: "Hello, Molly Kelly! You have 2 unread messages.",
    favoriteFruit: "banana",
  },
  {
    _id: "6192c126e21f24cc91e734e9",
    index: 4,
    guid: "d2ad1419-643b-4f13-a5d8-fa9618022444",
    isActive: false,
    balance: "2,369.22",
    picture: "http://placehold.it/32x32",
    age: 33,
    eyeColor: "brown",
    name: "Greene Mosley",
    gender: "male",
    company: "SHEPARD",
    email: "greenemosley@shepard.com",
    phone: "+1 (973) 577-3260",
    address: "531 Drew Street, Salix, Indiana, 2383",
    about:
      "Consequat proident minim proident voluptate sint excepteur minim pariatur consectetur elit minim anim nisi nulla. Lorem non dolor ex enim sint. Voluptate duis id deserunt nulla dolor dolore in occaecat est dolor magna irure.\r\n",
    registered: "2014-02-18T02:35:15 +05:00",
    latitude: -56.451859,
    longitude: 102.882924,
    tags: ["occaecat", "pariatur"],
    friends: [
      { id: 0, name: "Karin Knapp" },
      { id: 1, name: "Olivia Conrad" },
      { id: 2, name: "Stewart Hooper" },
    ],
    greeting: "Hello, Greene Mosley! You have 6 unread messages.",
    favoriteFruit: "banana",
  },
];

const sleep = (delay) => {
  return new Promise((res) => {
    setTimeout(() => {
      res();
    }, delay);
  });
};

const makeBatchedRequest = async () => {
  let drained = true;
  let options = {
    method: "POST",
    hostname: "localhost",
    port: 3001,
    path: "/",
    headers: {
      "Content-Type": "application/json",
    },
  };

  let req = http.request(options, function (res) {
    let chunks = [];

    res.on("data", function (chunk) {
      chunks.push(chunk);
    });

    res.on("end", function (chunk) {
      console.log("Request Completed");
      let body = Buffer.concat(chunks);
      let json = JSON.parse(body);
      console.log(json);
    });

    res.on("error", function (error) {
      console.error(error);
    });
  });
  req.on("drain", () => {
    console.log("buffer drained.. write more");
    drained = true;
  });
  const goAheadandWrite = () => {
    return new Promise((res) => {
      setInterval(() => {
        if (drained) {
          res();
        }
      }, 500);
    });
  };
  const _write = async (obj) => {
    let dataToWrite = JSON.stringify(obj);
    let dataBytes = Buffer.byteLength(dataToWrite);
    let buffer = Buffer.alloc(4 + dataBytes);
    buffer.writeUInt32BE(dataBytes);
    buffer.write(dataToWrite, 4);
    drained = req.write(buffer);
    if (!drained) {
      console.log("Pausing Writes", drained);
      await goAheadandWrite();
      console.log("Resume Writes");
    }
  };

  for (let i = 0; i < 1; i++) {
    let batch = data[0];
    batch._id = i;
    await _write(batch);
  }
  console.log("All Sent .. Close Request");
  req.end();
};

makeBatchedRequest();
