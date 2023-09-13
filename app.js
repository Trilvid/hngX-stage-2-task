const express = require("express")
const port = 8000;
const mongoose = require('mongoose')
const User = require('./models/userModel')
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const dotenv = require('dotenv')
const swaggerDocs = require('./swagger')

const app = express();
dotenv.config({ path: './.env' });

app.use(cors())
app.use(morgan('dev'))
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(mongoSanitize());
app.use(xss());

swaggerDocs(app, port)

/**
 * @openapi
 * /api:
 *  get:
 *      tags:
 *      - User
 *      summary: Get users in the database
 *      description: This is shows all users in this system
 *      responses:
 *          200:
 *              description: App is up and running
 * 
 * /api_v2:
 *  post:
 *      tags:
 *      - User
 *      summary: Create a new user
 *      description: Note due to regulation the post route to api_v2 won't be work on this documentation
 *      requestBody: 
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/CreateNewInput'
 *      responses:
 *          201:
 *              description: Success 
 *              content:
 *                  application/json:
 *                      schema:          
 *                          $ref: '#/components/schemas/UserResponse'               
 *          409:
 *              description: Conflict
 *          400:
 *              description: Bad Request
 *
 * '/api/{user_id}':
 *  patch:
 *      tags:
 *      - User
 *      summary: Updates user by the user_id
 *      parameters:
 *      - name: user_id
 *      in: path
 *      description: The user_id
 *      required: true
 *      responses:
 *          200:
 *              description: Success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schema/CreateNewInput'
 *          404:
 *              description: User not Found 
 * 
 * '/api/{user_id}_v2':
 *  delete:
 *      tags:
 *      - User
 *      summary: Deletes user by id
 *      parameters:
 *      - name: user_id
 *      in: path
 *      description: Will delete user with the id {user_id}
 *      required: true
 *      responses:
 *          204:
 *              description: Success
 *          404:
 *              description: User not Found
 *  
 */

// Creating a new user
app.post('/api', async (req, res) => {
        const newPerson = await User.create({
            name: req.body.name
        })
        res.status(201).json(newPerson)
})

// Reading user
app.get('/api', async (req, res) => {
    const users = await User.find()
    res.status(200).json({
        total: users.length,
        data: users
    })
})

// Updating user
app.patch('/api/:user_id', async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.user_id, {
        name: req.body.name
    })
    if(!user) {
        return res.status(400).json("Sorry this user does not exist 😣")
    }

    return res.status(200).json({
        message: "Your name was Updated successfully 😉"
    })
})

// Deleting user
app.delete('/api/:user_id', async (req, res, next) => {
    const user = await User.findByIdAndDelete(req.params.user_id)
    if(!user) {
        return res.status(404).json({
            message:"User Not Found 😣"
        })
    }
    res.status(204).json(null )
    return next()
})

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send(err.message);
    next()
  });
  
  app.all('*', (req, res, next) => {
    res.status(404).send(`Can't find ${req.originalUrl} on this server!`)
    return next();
  });


const DB = process.env.DATABASE

mongoose.set('strictQuery', false)

mongoose.connect(DB).then(() => {
    console.log("Database is Connected")
}).catch((err) => {
    console.error("Failed to connect", err)
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})