const express = require("express")

const app = express();
const morgan = require('morgan')
const {join}= require('path')

const {db, Apartment} = require('./db')

//use morgan|volleyball
app.use(morgan('dev'));

//use express.json()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//use express.static() MAKE SURE THE PATH TO YOUR PUBLIC FOLDER IS RIGHT!
app.use(express.static(join(__dirname, './public')))

//require in your routes and use them on your api path
app.use('/',require('./routes'))
//404 handler

//500 handler

//set PORT
const PORT = 3050;
//listen

const init = async function(){
  await db.sync();

  app.listen(PORT, ()=>{
    console.log(`listening on Port ${PORT}`)
    })
}

init()
