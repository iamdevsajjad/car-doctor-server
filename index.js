const express = require("express");
const app = express();
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();
const cors = require("cors");

const port = process.env.PORT || 5000;

//middleware

app.use(cors());
app.use(express.json());




const uri =`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.p5n6wf0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
  //`mongodb+srv://docUser:8W4KCCiePYreZsCJ@cluster0.p5n6wf0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

  console.log(process.env.DB_USER)
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
   const serviceCollection = client.db("carDoctor").collection("services");

   app.get("/services", async (req, res) => {
    const cursor = serviceCollection.find();
    const result = await cursor.toArray();
    res.send(result)
   })


   await client.db("admin").command({ping : 1});
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at ${port}`);
});
