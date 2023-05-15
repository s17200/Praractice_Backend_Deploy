const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    userId: {
        type: String,
        unique: true
    },

    password: {
        type: String
    },

    provider: {
        type: String,
        require: true
    }
})

module.exports = model("users", UserSchema);
