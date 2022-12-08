const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 3001;
const FriendModel = require("./models/Friends");
const cors = require("cors");

app.use(cors());
app.use(express.json());

mongoose.connect(
  "mongodb+srv://naitikp2002:Naitik@123@mern.nczhkbo.mongodb.net/MERN?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);

app.post("/addfriend", async (req, res) => {
  const name = req.body.name;
  const age= req.body.age;
  const description= req.body.description; 

  const friend = new FriendModel({ name: name, age: age, description: description});
  await friend.save();
  res.send("INSERTED Data");
});

app.get("/read", async (req, res) => {
  FriendModel.find({}, (err, result) => {
    if (err) res.send(err);
    else res.send(result);
  });
});

app.listen(process.env.PORT || 3001, () => {
  console.log("listening on port");
});
