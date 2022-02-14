const express = require('express');
const User = require('../models/User.model');
const router = express.Router();
const saltRounds = 5;
const bcrypt = require('bcrypt');

router.route('/signup', )
.get((req, res, next) => {
	res.render('signup');
})
.post((req,res)=>{
	const username = req.body.username
	const password = req.body.password

    //Check the form is NOT empty. At work, please use a library
	if(!username || !password){
    res.render("signup", {errorMessage: "All fields are required"});
    //return
    }

	User.findOne({username})
	.then(user=>{
		if(user && user.username)
		{res.render("signup", {errorMessage: "User already taken!"})}

		const salt = bcrypt.genSaltSync(saltRounds)
		const hashedPwd = bcrypt.hashSync(password, salt)

		User.create({username, password: hashedPwd})
		.then(()=> {
			res.redirect("/")
		})
	})
	.catch(()=>{
			res.redirect("/auth/signup")
		})
});

router.get('/login', (req, res, next) => {
	res.render('login');
});

router.get('/profile', (req, res) => {
	res.render('profile');
});

module.exports = router;
