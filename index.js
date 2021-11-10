const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
// const uri =
//   "mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.2vil1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const client = new MongoClient(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
const uri = "mongodb+srv://alamin-matlab_2021:gVZPplwupeaQWwOJ@cluster0.2vil1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

console.log(uri);
app.get("/", (req, res) => {
  res.send("Welcome our Shampoo Plus Website!");
  console.log(req);
});
client.connect((err) => {
  const shampooCollection = client.db("shampooPlusWebsite").collection("shampoo");

 const BooksCollection = client.db("shampooPlusWebsite").collection("books");

  const ReviewCollection = client.db("shampooPlusWebsite").collection("review");
  // perform actions on the collection object

  // Add Product
 app.post("/addShampoo", async (req, res) => {
    const result = await shampooCollection.insertOne(req.body);
  });

 // Add Reviews
 app.post("/addReview", async (req, res) => {
   console.log(req.body)
  const result = await ReviewCollection.insertOne(req.body);
  console.log(result)
  });

  // Add MyBooks
  app.post("/myBook", async (req, res) => {
    const result = await BooksCollection.insertOne(req.body);
  });
//put/update
app.put('/users', async (req, res) => {
    const result = await usersCollection.updateOne({ email: req.body.email}, {$set: req.body}, {upsert: true });
    res.send(result)
  });
// Get Reviews
 app.get("/reviews", async (req, res) => {
  const result = await ReviewCollection.find({}).toArray();
  res.send(result);
 })


  // Get My books
  app.get("/myBooks/:email", async (req, res) => {
    const result = await BooksCollection.find({
      email: req.params.email,
    }).toArray();
    res.send(result);
  });

  // Get All Books
  app.get("/allBooks", async (req, res) => {
    const result = await BooksCollection.find({}).toArray();
    res.send(result);
  });

  // Delete MyBook
  app.delete("/deleteBook/:id", async (req, res) => {
    console.log(req.params.id);
    const result = await BooksCollection.deleteOne({
      _id: req.params.id,
    });
    res.send(result);
  });

  // Get Products
  app.get("/products", async (req, res) => {
    const result = await shampooCollection.find({}).toArray();
    res.send(result);
  });
  // client.close();
});
app.listen(process.env.PORT || port, () => {
  console.log(`listening at ${port}`)
});
