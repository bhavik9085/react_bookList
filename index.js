// defining the server port
const port = 8080

// initializing installed dependencies
import express from 'express';
import dotenv from 'dotenv';
import axios from 'axios';
import cors from 'cors';

dotenv.config()
const app = express()
app.use(cors())

// listening for port 5000
app.listen(8080, ()=> console.log(`Server is running on ${port}` ))

// API request
app.get('/', (req,res)=>{
    const key = process.env.SOME_KEY;
    res.json(key);    
})

app.get('/:password/:email', (req,res)=>{
    const key = process.env.SOME_KEY;

    axios({
        method: 'post',
        url: 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+key,
        data: {
            "email":req.params.email,"password":req.params.password,"returnSecureToken":true
        }
      }).then(function (response) { 
            res.json(response.data);
        }).catch(function (error) {
            res.json(error);
        });
    
})
