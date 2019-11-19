let express = require("express");
let app = express();
let MongoClient = require("mongodb").MongoClient;
let ObjectID = require("mongodb").ObjectID;
let reloadMagic = require("./reload-magic.js");
let multer = require("multer");
let upload = multer({ dest: __dirname + "/uploads/" });
reloadMagic(app);
app.use("/", express.static("build"));
app.use("/uploads", express.static("uploads"));
let dbo = undefined;
let url =
  "mongodb+srv://bob:bobsue@clusteramanda-kqoqy.mongodb.net/test?retryWrites=true&w=majority";
MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
  dbo = db.db("alibayDB");
});

app.get("/all-items", upload.none(), (req, res) => {
  console.log("/all-items endpoint hit");
  dbo
    .collection("items")
    .find({})
    .toArray((error, item) => {
      if (error) {
        console.log("error", error);
        res.send(JSON.stringify({ success: false }));
      }
      res.send(JSON.stringify(item));
    });
});

app.post("/upload-review", upload.none(), (req, res) => {
  console.log("request to upload review");
  let reviewer = req.body.reviewer;
  let review = req.body.review;
  let item = req.body.item;
  dbo.collection("items").
});

app.post("/upload-item", upload.single("img"), (req, res) => {
  console.log("request to upload new item");
  let description = req.body.description;
  let seller = req.body.seller;
  let price = req.body.price;
  let name = req.body.name;
  let file = req.file;
  let frontendPath = "/uploads/" + file.filename;
  dbo.collection("items").insertOne({
    description: description,
    frontendPath: frontendPath,
    price: price,
    name: name,
    seller: seller
  });
  res.send(JSON.stringify({ success: true }));
});

app.post("/signup", upload.none(), (req, res) => {
  console.log("signup endpoint hit");
  let username = req.body.username;
  let password = req.body.password;
  dbo.collection("users").findOne({ username: username }, (error, user) => {
    if (error) {
      console.log("/signup error", error);
      res.send(JSON.stringify({ success: false, error }));
    }
    if (user !== null) {
      res.send(JSON.stringify({ success: false }));
    }
    if (user === null) {
      dbo
        .collection("users")
        .insertOne({ username: username, password: password })
        .then(() => res.send({ success: true }))
        .catch(error =>
          res.send(
            JSON.stringify({
              success: false,
              error
            })
          )
        );
    }
  });
});

app.post("/login", upload.none(), (req, res) => {
  console.log("login endpoint hit");
  let username = req.body.username;
  let password = req.body.password;
  dbo.collection("users").findOne({ username: username }, (error, user) => {
    if (error) {
      console.log("/login error", error);
      res.send(JSON.stringify({ success: false, error }));
      if (user === null) {
        res.send(JSON.stringify({ success: false }));
      }
      if (user.password === password) {
        res.send(JSON.stringify({ success: true }));
      }
      res.send(JSON.stringify({ success: false }));
    }
  });
});

app.all("/*", (req, res, next) => {
  // needed for react router
  res.sendFile(__dirname + "/build/index.html");
});

app.listen(4000, "0.0.0.0", () => {
  console.log("Server running on port 4000");
});
