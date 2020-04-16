const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const objectId = require("mongodb").ObjectID;

const app = express();
const jsonParser = express.json();

const mongoClient = new MongoClient("mongodb://localhost:27017/", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

let dbClient;

app.use(express.static(__dirname + "/public"));

mongoClient.connect(function(err, client) {
  if (err) {
    console.log("Connection error: ", err);
    throw err;
  }
  dbClient = client;
  app.locals.collection = client.db("goodsdb").collection("goods");
  app.listen(3000, function() {
    console.log("Server waiting for connection.");
  });
});

app.get("/api/goods", function(req, res) {
  const collection = req.app.locals.collection;
  collection.find({}).toArray(function(err, goods) {
    if (err) return console.log(err);
    res.send(goods);
  });
});
app.get("/api/goods/:goodsName", function(req, res) {
  const goodsName = req.params.goodsName;
  const collection = req.app.locals.collection;
  collection.findOne({ name: goodsName }, function(err, goods) {
    if (err) return console.log(err);
    res.send(goods);
  });
});

app.post("/api/goods", jsonParser, function(req, res) {
  if (!req.body) return res.sendStatus(400);

  const goodsId = req.body.idef;
  const goodsName = req.body.name;
  const goodsPrice = req.body.price;
  const goods = { id: goodsId, name: goodsName, price: goodsPrice };
  const collection = req.app.locals.collection;
  collection.insertOne(goods, function(err, result) {
    if (err) return console.log(err);
    res.send(goods);
  });
});

// прослушиваем прерывание работы программы (ctrl-c)
process.on("SIGINT", () => {
  dbClient.close();
  process.exit();
});
