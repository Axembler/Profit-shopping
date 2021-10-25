var MongoClient = require('mongodb').MongoClient;
var uri = "mongodb://admin:admin@cluster0-shard-00-00.ostym.mongodb.net:27017,cluster0-shard-00-01.ostym.mongodb.net:27017,cluster0-shard-00-02.ostym.mongodb.net:27017/mongo?ssl=true&replicaSet=atlas-3ngcm9-shard-0&authSource=admin&retryWrites=true&w=majority";
MongoClient.connect(uri, function(err, client) {
  console.log('MongoDB успешно подключено')
  const collection = client.db("test").collection("devices");

  const db = client.db('main')
  const users = db.createCollection('users')

  users.insertMany(
    [
      {
        id: 2,
        login: 'login2',
        name: 'name2',
        gender: 'male',
      },
      {
        id: 3,
        login: 'login3',
        name: 'name3',
        gender: 'female',
      },
    ],
    (err, result) => {
      if (err) {
        console.log('Unable insert user: ', err)
        throw err
      }
    }
  )

  users.find()

  client.close();
});