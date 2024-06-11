
require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;
const { MongoClient, ServerApiVersion } = require('mongodb');
const { connect } = require('mongoose');
const uri = `mongodb+srv://${process.env.username}:${process.env.password}@cluster0.vxrsjss.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const User = require('./src/models/User');

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
    console.log("Closed connection to MongoDB");
  }
}
// run().catch(console.dir);

// Connect to MongoDB
connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });


app.use(express.json());

app.get('/', async (req, res) => {
  // const db = await client.db("sample_mflix");
  // const collection = db.collection("movies");
  // const result = await collection.find().toArray();

  const users = await User.find();
  console.log(users);

  res.json(result);
  // res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});