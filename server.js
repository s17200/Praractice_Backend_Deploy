const express = require('express');
const cors = require('cors');
const connectToDatabase = require('./configs/db');
const auth =require('./routers/user.route')

const app = express();

app.use(cors());
app.use(express.json());
app.use('/auth', auth);

app.get('/',(req,res)=>{
    res.send("hello servers")
})

const PORT = 3002;

connectToDatabase();
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}...`);
})