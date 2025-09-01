const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://laslark1991:Wlsrud!!20@test-my-app.z6ysuct.mongodb.net/?retryWrites=true&w=majority&appName=test-my-app";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        userNewUrlParser: true,
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
    }
}
// run().catch(console.dir);


async function main() {
    try {

        await client.connect();

        console.log('Successfully Connected.');

        const collection = client.db('test').collection('person');

        //Add a data. 
        // await collection.insertOne({ name: 'Andy', age: 30 });
        // console.log('Document added successfully');

        await collection.insertMany([{name: 'Fujiwara Takumi', age: 18, crew: "ProjectD"}, {name: 'Takahashi Ryosuke', age: 25, crew: "ProjectD"}, {name: 'Takahashi Keisuke', age: 21, crew: "ProjectD"}])

        //Search document
        const documents = await collection.find({crew: "ProjectD"}).toArray();
        console.log('Documents found : ', documents);


        await collection.deleteMany({name: "Taka"});
        console.log('Delete => ', documents);
    } catch (err) {
        console.log(err);
    } finally {
        await client.close();
    }
}

main();