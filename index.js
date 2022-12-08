const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 3001;
const FriendModel = require("./models/Friends");
const cors = require("cors");

app.use(cors());
app.use(express.json());

mongoose.connect(
  "mongodb://localhost:27017/MERN?readPreference=primary&appname=MongoDB%20Compass&ssl=false",
  // "mongodb+srv://naitikp2002:Naitik@123@mern.nczhkbo.mongodb.net/?retryWrites=true&w=majority",
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

app.put("/update", async (req, res) => {
  const newAge=req.body.newAge;
  const id= req.body.id;

  try {
    await FriendModel.findById(id,(error, friendToUpdate)=>
    {
      friendToUpdate.age = Number(newAge);
      friendToUpdate.save();
    })
  }catch (err) {
    console.error(err);
  }
  res.send("Updated");
});

app.listen(process.env.PORT || 3001, () => {
  console.log("listening on port");
});
