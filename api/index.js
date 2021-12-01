const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()

app.use(cors())

mongoose.connect(
  'mongodb://admin:admin@cluster0-shard-00-00.ostym.mongodb.net:27017,cluster0-shard-00-01.ostym.mongodb.net:27017,cluster0-shard-00-02.ostym.mongodb.net:27017/mongo?ssl=true&replicaSet=atlas-3ngcm9-shard-0&authSource=admin&retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true }
)
  .then(() => console.log('Соединение с БД установлено'))
  .catch(err => console.error(err))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const user = require('./routes/user')

app.use(user)

module.exports = app

if (require.main === module) {
  const port = process.env.PORT || 3001
  app.listen(port, () => {
    console.log(`'Сервер доступен по localhost:'${port}`)
  })
}