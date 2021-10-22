const { MongoClient } = require('mongodb')
const uri = "mongodb+srv://admin:admin@cluster0.ostym.mongodb.net/mongo?retryWrites=true&w=majority"
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })

client.connect(err => {
  const collection = client.db("test").collection("devices")
  console.log('MongoDB подключено')

  // perform actions on the collection object
  client.close()
});








// async function main(){

//   const url = 'mongodb+srv://admin:admin@cluster0.ostym.mongodb.net/mongo?retryWrites=true&w=majority';

//   const client = new MongoClient(url);

//   try {
//       // Connect to the MongoDB cluster
//       await client.connect();

//       // Make the appropriate DB calls
//       await  listDatabases(client);

//   } catch (e) {
//       console.error(e);
//   } finally {
//       await client.close();
//   }
// }

// main().catch(console.error);





// const {MongoClient} = require('mongodb')

// const client = new MongoClient('mongodb+srv://admin:admin@cluster0.ostym.mongodb.net/mongo?retryWrites=true&w=majority')

// const start = async () => {
//   try {
//     await client.connect()
//     console.log('Соединение установлено')
//   }
//   catch (e) {
//     console.log(e)
//   }
// }

// start()