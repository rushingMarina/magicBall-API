
const express = require('express');
const bodyParser = require('body-parser');
var bcrypt = require('bcryptjs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
   client: 'pg',
   connection: {
    host : 'postgresql-animate-65889',
    user : 'marina',
    password : '',
    database : 'magicball'
  }
});

// db.select('*').from('users').then(data => {
// 	console.log(data);
// });

const app = express();


app.use(bodyParser.json());

app.use(cors());


app.get('/', (req, res) => {
	res.send("it is working :P");
})

//signin, we using post in order to safly transfer info
app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)})

//register 
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})

// Profile, /:id means we can asccess it with .params
app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)})

app.put('/image', (req, res) => {image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)})






app.listen(process.env.PORT || 3000, () => {
	console.log(`app is running on port ${process.env.PORT}`);
})

/*
/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user , increasing entries
*/