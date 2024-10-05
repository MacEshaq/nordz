const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');


const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true
    }
})

//STATIC SIGNUP METHOD
//when we call the static signup method in other component(controller) it will be like 'User.signup(pass in the new inputs from user)' to create new user.
userSchema.statics.signup = async function (username, email, password) {

    //VALIDATION BEFORE CREATING THE NEW USER
    if (!username || !email || !password) {
        throw Error('All fields must be filled')
    }

    if (!validator.isEmail(email)) {
        throw Error('Email is not valid')
    }

    if (!validator.isStrongPassword(password)) {
        throw Error('Password not strong enough')
    }

    const exists = await this.findOne({ username })
    if (exists) {
        throw Error('Username already taken.')
    }

    //END OF VALIDATION

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ username, email, password: hash })

    return user
}


//STATIC LOGIN METHOD
//when we call the static login method in other component(controller) it will be like 'User.login(username & password)' to login the user.
userSchema.statics.login = async function (username, password) {
    //VALIDATION BEFORE LOGIN THE USER
    if (!username || !password) {
        throw Error('All fields must be filled')
    }

    const user = await this.findOne({ username })
    if (!user) {
        throw Error('Incorrect username')
    }
    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw Error('Incorrect password')
    }

    return user

}


module.exports = mongoose.model('User', userSchema)
