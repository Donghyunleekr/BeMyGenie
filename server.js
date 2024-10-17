const express = require('express')
const app = express()

app.use(express.static(__dirname + '/public'))

app.listen(8080, () => {console.log('서버실행중')})
app.get('/', (req,res) => {res.sendFile(__dirname+'/index.html')})
app.get('/about', (req,res) => {res.sendFile(__dirname+'/intro.html')})
app.get('/news', (req,res) => {res.send('뉴스야')})
