const express = require("express");
const User = require("../modules/User");
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
JWT_SECRET = 'deepakkasignature';
const fetchuser = require("../middleWare/fetchUser");


// Route 1 : POst request for creating user http://localhost:5000/api/auth/createuser
router.post("/createuser", [
    body('name', "Minimum 5 char").isLength({ min: 5 }),
    body('email', "Enter a valid email").isEmail(),
    body('password', "Minimum 5 char").isLength({ min: 5 })
],
    async (req, res) => {
        let success=false;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success,errors: errors.array() });
        }
        try {
            
            //fetching the matching email from mongoDB with mongoose 
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({ success,error: "Email already exists" });
            }
            const salt = await bcrypt.genSalt(10);
            const secPassword = await bcrypt.hash(req.body.password, salt);
            user = await User.create({
                name: req.body.name,
                password: secPassword,
                email: req.body.email
            })
            const data = {
                user: {
                    id: user.id
                }
            }
            console.log(data.user);
            const jsnToken = jwt.sign(data, JWT_SECRET);
            console.log(jsnToken);
            success=true;
            res.send({ success,jsnToken })
        } catch (error) {
            res.status(500).json({success,error:error.message});
        }

    })

//Route 2 : POst request for logging user details user http://localhost:5000/api/auth/login ,no login required
router.post("/login", [

    body('email', "Enter a valid email").isEmail(),
    body('password', "Can't leave this field empty").isLength({min:1})
],
    async (req, res) => {
        let success=false;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success,errors: errors.array() });
        }

        try {
            const { email, password } = req.body;
            console.log(email);
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ success,error: "user not found" });
            }
            const passwordCompare = await bcrypt.compare(password, user.password);
            if (!passwordCompare) {
                return res.status(400).json({ success,error: "Invalid credentials" });
            }
            const data = {
                user: {
                    id: user.id
                }
            }
            const jsnToken = jwt.sign(data, JWT_SECRET);
            success=true;
            res.send({ success,jsnToken });
        } catch (error) {
            res.status(500).json({success,error:error.message});
        }
    })

//Route 3 : Post request for logging user details user http://localhost:5000/api/auth/getuser ,login required
router.post("/getuser",fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        res.status(500).json({error:error.message});
    }
});



module.exports = router;