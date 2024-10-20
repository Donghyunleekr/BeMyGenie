const express = require('express')
const app = express()

app.use(express.static(__dirname + '/public'))
app.set('view enigne','ejs')
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const { MongoClient, ObjectId } = require('mongodb')

let db
const url = 'mongodb+srv://admin:as590602+@cluster0.83biv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
new MongoClient(url).connect().then((client)=>{
  console.log('DB연결성공')
  db = client.db('forum')
  app.listen(8080, () => {console.log('서버실행중')})
}).catch((err)=>{
  console.log(err)
})


app.get('/', (req,res) => {res.sendFile(__dirname+'/index.html')})

app.get('/write',(req,res) => {
    res.render('write.ejs')
})

app.post('/add', async (req,res) => {
            try {
            if (req.body.title == ''){
                res.send("Need to have title!")
            }
            else{
            await db.collection('post').insertOne({title: req.body.title, content: req.body.content})
            res.redirect('/list')
        }

        } catch(e){
            console.log(e)
            res.status(500).send('server error')
        }
        })

app.get('/about', (req,res) => {res.sendFile(__dirname+'/intro.html')})
// app.get('/news', (req,res) => {
//     db.collection('post').insertOne({title: '두번째 내용'})
// })
app.get('/list',async   (req,res) => {
    let result = await db.collection('post').find().toArray()
    console.log(result)
    res.render('list.ejs', { post : result})
})

app.get('/detail/:id', async (req,res)=>{
    // console.log(req.params)
    let result = await db.collection('post').findOne({_id : new ObjectId(req.params.id)})
    console.log(result)
    res.render('detail.ejs', {result : result})
})

app.get('/time',async   (req,res) => {
    // let result = await db.collection('post').find().toArray()
    // console.log(result)
    res.render('time.ejs', { time : new Date()})
})