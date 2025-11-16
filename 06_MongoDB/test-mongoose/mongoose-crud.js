const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Person = require("./person-model");
require("dotenv").config({
  path: require("path").resolve(__dirname, "../../.env"),
});
mongoose.set("strictQuery", false); // 경고 끔.

const app = express();

app.use(bodyParser.json()); // HTTP에서 Body를 파싱

app.listen(3000, async () => {
  console.log("Server started at 3000");

  const mongodbUri = process.env.MONGO_URL;

  mongoose.connect(mongodbUri).then(console.log("Connected to MongoDB")); // Mongoose6^ 에서 useNewUrlParser, useUnifiedTopology, useCreateIndex은 기본 설정됨.
});

// 모든 person 데이터 출력
app.get("/person", async (req, res) => {
  const person = await Person.find({});
  console.log(person)
  res.send(person);
});

// 이메일 주소로 검색
app.get("/person/:name", async (req, res) => {
  const person = await Person.findOne({ name: req.params.name });

  res.send(person);
});
// person 데이터 추가
app.post("/person", async (req, res) => {
  const person = new Person(req.body);
  await person.save();
  res.send(person);
});

app.put("/person/:name", async (req, res) => {
  const person = await Person.findOneAndUpdate(
    { name: req.params.name },
    { $set: req.body },
    { new: true }
  );
  console.log(person);
  res.send(person);
});

app.delete("/person/:name", async (req, res) => {
  await Person.deleteMany({ name: req.params.name });
  res.send({ success: true });
});
