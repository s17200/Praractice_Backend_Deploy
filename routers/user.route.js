const express = require('express');
const router = express.Router();
const {RegisterUser, LoginUser}=require('../controllers/auth.controller')
const {auth} =require('../middlewares/auth')

router.post('/register', async (req, res) => {

    try {
        let response = await RegisterUser(req.body);
        res.send(response);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
})

router.post("/login", async (req, res) => {

    try {
        let response = await LoginUser(req.body);
        res.send(response);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }

});

router.get('/loggedInUser', auth, async (req, res) => {
    try {
        
        const user = req.user;

        return res.send({
            data: user
        })

    } catch(err) {
        console.error(err.message);

        return res.status(500).send({
            error: 'Something went wrong'
        })
    }
});


router.get('/register',(req,res)=>{
    res.send("In a register")
})

module.exports = router;