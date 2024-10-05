const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const requireAuth = async (req, res, next) => {
    // we grab the headers from frontend on fetch Home/create new project/ delete (see notes) and verify the 'authorization'
    const { authorization } = req.headers

    // if authorization has no value
    if (!authorization) {
        return res.status(401).json({ error: 'Authorization token required' })
    }


    // if has value then we get the token from the authorization by split method (split on the space)
    // 'Bearer jlsjalfjslafjlafjl.jslfjsafjsalfj' sample of the token in the authorization headers
    const token = authorization.split(' ')[1]

    try {
        // grabbing the id from the existing token and verify against the above 'token'
        const { _id } = jwt.verify(token, process.env.SECRET)

        // this 'req.user' now has only one property '_id' instead of entire user
        // note that 'req.user' the 'user' is a new variable attached to req which can be named anything you want ie 'req.abc'
        // now when 'next()' is called it goes to next function like in the route 'router.get('/', getProjects)' and in the controllers 'projectsController.js' 'req' has now a property named 'user' or 'abc' which contained an '_id' of the user.
        req.user = await User.findOne({ _id }).select('_id')
        next()

    } catch (error) {

        res.status(401).json({ error: 'Request is not authorized' })

    }
}

module.exports = requireAuth