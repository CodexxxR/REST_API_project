  
const express = require('express');

const mongoose = require('mongoose')
const app = express();

const dbURL = "mongodb+srv://codex:RvEnjNyHToNaPIaz@cluster0.yp6kr.mongodb.net/reactproj?retryWrites=true&w=majority";
mongoose.connect(dbURL,{useNewUrlParser: true, useUnifiedTopology: true})
//   .then((result)=>{
//       console.log('connected to database');
//   })
//   .catch((err)=>{
//       console.log(err)
//   });
const port = process.env.PORT || 3000;
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => app.listen(port, ()=>{
    console.log('server started...')
}))
  
app.use(express.json());

const blogsRouter = require('./routes/blogs');
app.use('/blogs', blogsRouter)

app.use('/api', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
    next();
  });
