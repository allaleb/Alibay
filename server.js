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
app.use("/public", express.static("public"));
let dbo = undefined;
let url =
  "mongodb+srv://bob:bobsue@clusteramanda-kqoqy.mongodb.net/test?retryWrites=true&w=majority";
MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
  dbo = db.db("alibayDB");
});

app.post("/signup", upload.none(), (req, res) => {
  console.log("signup endpoint hit");
  let username = req.body.username;
  let password = req.body.password;
  dbo.collection("users").findOne({ username: username }, (error, user) => {
    if (error) {
      console.log("/signup error", error);
      res.send(JSON.stringify({ success: false, error }));
      return;
    }
    if (user !== null) {
      res.send(JSON.stringify({ success: false }));
      return;
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
      return;
    }
    if (user === null) {
      res.send(JSON.stringify({ success: false }));
      return;
    }
    if (user.password === password) {
      res.send(JSON.stringify({ success: true }));
    }
  });
});

app.post("/upload-review", upload.none(), (req, res) => {
  console.log("request to /upload-review");
  let reviewer = req.body.reviewer;
  let review = req.body.review;
  let itemId = req.body.itemId;
  dbo.collection("reviews").insertOne({
    reviewId: itemId,
    reviewer: reviewer,
    review: review
  });
  res.send(JSON.stringify({ success: true }));
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
    seller: seller,
    thumbnailPath: frontendPath
  });
  res.send(JSON.stringify({ success: true }));
});

app.post("/item-reviews"),
  upload.none(),
  (req, res) => {
    console.log("request to get /item-reviews");
    let itemId = req.body.itemId;
    dbo
      .collection("reviews")
      .find({ reviewId: itemId })
      .toArray((error, reviews) => {
        if (error) {
          console.log("error", error);
          res.send(JSON.stringify({ success: false }));
          return;
        }
        res.send(JSON.stringify(reviews));
      });
  };

app.get("/all-reviews", (req, res) => {
  console.log("request to get /all-reviews");
  dbo
    .collection("reviews")
    .find({})
    .toArray((error, reviews) => {
      if (error) {
        console.log("error", error);
        res.send(JSON.stringify({ success: false }));
        return;
      }
      res.send(JSON.stringify(reviews));
    });
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
        return;
      }
      res.send(JSON.stringify(item));
    });
});

app.post("/search", upload.none(), (req, res) => {
  console.log("request to /search endpoint");
  let searchTerm = req.body.searchTerm;
  dbo
    .collection("items")
    .find({
      $or: [
        { description: { $regex: new RegExp(searchTerm, "i") } },
        { name: { $regex: new RegExp(searchTerm, "i") } }
      ]
    })
    .toArray((error, item) => {
      if (error) {
        console.log("error", error);
        res.send(JSON.stringify({ success: false }));
        return;
      }
      res.send(JSON.stringify(item));
    });
});

app.get("/users", (req, res) => {
  console.log("/users endpoint hit");
  dbo
    .collection("users")
    .find({})
    .toArray((error, users) => {
      if (error) {
        console.log("error", error);
        res.send(JSON.stringify({ success: false }));
        return;
      }
      res.send(JSON.stringify(users));
    });
});

app.all("/*", (req, res, next) => {
  res.sendFile(__dirname + "/build/index.html");
});

app.listen(4000, "0.0.0.0", () => {
  console.log("Server running on port 4000");
});
