require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const userRoutes = require('./routes/user')
const projectsRoutes = require('./routes/projects')


//EXPRESS APP
const app = express();
app.use(cors());

app.use(express.json())

//MIDDLEWARE (GLOBAL). this always run before any request below it and make sure to call 'next()'.
//this middleware will console.log '/ GET' every refresh of the page. '/. is the path from req.path and 'GET' from req.method
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})



app.get('/', (req, res) => {
    res.json({ msg: 'Welcome to NORDZ Firm site powered by MERN' })
})

app.use('/api/projects', projectsRoutes)
app.use('/api/user', userRoutes);


//CONNECT TO DB (it is ASYNC)
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        //LISTEN FOR REQUEST
        app.listen(process.env.PORT, () => {
            console.log('Connected to DB and Listening to port', process.env.PORT)
        });

    })
    .catch((error) => {
        console.log(error.message)
    })

