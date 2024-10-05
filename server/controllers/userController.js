//technically this is the data from database
const User = require('../models/userModel')

const jwt = require('jsonwebtoken')

// we create this function to be able to reuse it.
// '_id' will be part of the payload which is the object {}
const createToken = (_id) => {

    return jwt.sign({ _id: _id }, process.env.SECRET, { expiresIn: '3d' })

}


//login user
const loginUser = async (req, res) => {

    //new inputs from the user login page 
    const { username, password } = req.body

    try {

        // User.login is a static method from user model (validation & hashing the pw)
        const user = await User.login(username, password)

        //create token
        const token = createToken(user._id)

        //we are now sending back the token to the browser
        res.status(200).json({ username, token })

    } catch (error) {
        //see customized error in the userModel's 'signup static method'
        res.status(400).json({ msg: error.message })

    }



}

//signup user
const signupUser = async (req, res) => {

    //new inputs from the user signup page 
    const { username, email, password } = req.body;

    try {
        //this where we create the new user which happened in the userModel's 'signup static method' and pass in the inputs above.
        // if creation of new user is successful then we return the newly created 'user' as the 'signup static method' returns.
        //if not successful then catch block will return the error.
        const user = await User.signup(username, email, password)

        //create token
        const token = createToken(user._id)

        //we are now sending back the username & token to the browser
        res.status(200).json({ username, token })

    } catch (error) {
        //error message will be 'Username already taken.' as the 'signup static method' returns when username existed already.
        // another error is when inputs did not meet the requirements of the userSchema in the userModel.js
        //see customized error in the userModel's 'signup static method'
        res.status(400).json({ error: error.message })

    }

}

module.exports = {
    signupUser, loginUser
}