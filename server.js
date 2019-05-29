const express = require('express');
const bodyParser = require('body-parser');
var bcrypt = require('bcryptjs');
const cors = require('cors');

const app = express();




app.use(bodyParser.json());

app.use(cors());

const database = {
	users: [
		{
		  id: '123',
		  name: 'John',
		  email: 'john@gmail.com',
		  password: 'coockies',
		  entries: 0,
		  joined: new Date()
		 },
		 {
		  id: '124',
		  name: 'Matin',
		  email: 'matin@gmail.com',
		  password: 'apples',
		  entries: 0,
		  joined: new Date()
		 }
	], 
	login: [
		{
			id: '987',
			hash: '',
			email: 'john@gmail.com'
		}
	]
}

app.get('/', (req, res) => {
	res.send(database.users);
})

//signin, we using post in order to safly transfer info
app.post('/signin', (req, res)=> {
	bcrypt.compare("apples", '$2a$10$JlvWuAq3Kyp8GuoCU24StuoRlBFkQDqpWdJw2ZqKwUusVn3C/PEn6', function(err, res) {
    // res === true
    	console.log("first guess", res);
	});
	bcrypt.compare("not_bacon", '$2a$10$JlvWuAq3Kyp8GuoCU24StuoRlBFkQDqpWdJw2ZqKwUusVn3C/PEn6', function(err, res) {
	    // res === false
	    console.log("second guess", res);
	});
	if (req.body.email === database.users[0].email &&
		req.body.password === database.users[0].password) {
		res.json(database.users[0]);
	} else {
		res.status(400).json('error loggin in');
	}
})

//register 
app.post('/register', (req, res) => {
	const { email, name, password } = req.body;
	bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(password, salt, function(err, hash) {
        // Store hash in your password DB.
        console.log(hash);

      });
    });
	database.users.push({
		  id: '125',
		  name: name,
		  email: email,
		  entries: 0,
		  joined: new Date()
	})
	res.json(database.users[database.users.length-1]);
})

// Profile, /:id means we can asccess it with .params
app.get('/profile/:id', (req, res) => {
	const {id} = req.params;
	let found = false; 
	database.users.forEach(user => {
		if (user.id === id) {
			found =true;
			return res.json(user);
		} 
	})
	if (!found) {
		res.status(400).json('not found');
	}

})

app.put('/image', (req, res) => {
	const {id} = req.body;
	let found = false; 
	database.users.forEach(user => {
		if (user.id === id) {
			found =true;
			user.entries++;
			return res.json(user.entries);
		} 
	})
	if (!found) {
		res.status(400).json('not found');
	}
})






app.listen(3000, () => {
	console.log("app is running on port 3000");
})

/*
/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user , increasing entries

*/