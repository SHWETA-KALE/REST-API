//creating express server
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const url = 'mongodb://localhost/AlienDBex'

//connecting database 
mongoose.connect(url, {useNewUrlParser:true})
//useNewUrlParser: this is used to avoid any warning

//for having the hold on the connection
const con = mongoose.connection

con.on('open', ()=>{
    console.log('connected...')
})

const alienRouter = require('./routes/aliens');  // Adjust the path as needed

//middleware
app.use(express.json())
app.use('/aliens', alienRouter)


const PORT = 9000
app.listen(PORT, ( )=>{
console.log(`server started at ${PORT}`)
})