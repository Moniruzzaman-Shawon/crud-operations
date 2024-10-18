const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 4000;

//middleware
app.use(cors());
app.use(express.json());

//username october24
//password october1234
//mongodb+srv://october24:october1234@clusteroctober24.izw4d.mongodb.net/?retryWrites=true&w=majority&appName=ClusterOctober24


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://october24:october1234@clusteroctober24.izw4d.mongodb.net/?retryWrites=true&w=majority&appName=ClusterOctober24";

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

        const database = client.db("usersDB");
        const userCollection = database.collection("users");

        app.get('/users', async (req, res) => {
            const cursor = userCollection.find();
            const result = await cursor.toArray();
            res.send(result);

        })

        app.post('/users', async (req, res) => {
            const user = req.body;
            console.log('New User', user);
            const result = await userCollection.insertOne(user);
            res.send(result);


        })



        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        //await client.close();
    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send("Crud is running");
})

app.listen(port, () => {
    console.log(`Crud Running on port ${port}`);

})