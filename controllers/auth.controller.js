require('dotenv').config();
const axios = require('axios');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const TOKEN_SECRET_KEY = process.env.TOKEN_SECRET_KEY;

const CreateToken = (user_details) => {
    return jwt.sign(user_details, TOKEN_SECRET_KEY);
}

const verifyToken=(token)=> {

    return  jwt.verify(token, TOKEN_SECRET_KEY);

}

const RegisterUser = async (data) => {

    let isExist = await User.findOne({ userId: data.userId });

    if (isExist) {
        throw new Error("Email already in use")
    }

    try {
        const hash = bcrypt.hashSync(data.password, 4);
        let response = await User.create({ name: data.name, userId: data.userId, password: hash, provider: "native" });
        let json = response.toJSON();
        //delete json.password;
        
        return { registered: json };
    } catch (error) {
        throw new Error("There is an internal problem");
    }
}

const LoginUser = async (data) => {
    try {
        const { userId, password } = data;
        let isExist = await User.findOne({ userId: data.userId });
        let json = isExist.toJSON();
        if (!isExist) {
                throw new Error("Please register first")
        }else{
            let decoded=bcrypt.compareSync(password, isExist.password);
            if(decoded){
                let token=CreateToken(json)
                return {Token:token};
            }else{
                throw new Error("Incorrect Password");
            }
          
        }
        
        
    } catch (error) {
        throw new Error("There is an internal problem");
    }
}

const  loggedInUser = async(token)=> {

    // whether the token is valid or not
   console.log("hello2")
    let user = verifyToken(token)
    delete user.password
    console.log(user)

    // if it is valid, who is the logged in user
    return user;
}

module.exports = { RegisterUser, LoginUser,loggedInUser };


