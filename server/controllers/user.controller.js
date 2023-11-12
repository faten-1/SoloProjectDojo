const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SECRET = "mysupersecret "


module.exports = {
    register: async (req, res) => {
        try {
            const potentialUser = await User.findOne({ email: req.body.email })

            if (potentialUser) {
                res.status(400).json({ message: "email already exists" })
            } else {
                const newUser = await User.create(req.body)
                const usertoken = jwt.sign({ _id: newUser.id, email: newUser.email }, SECRET, { expiresIn: "1d" })
                res.cookie("usertoken", usertoken, {
                    httpOnly: true
                }).json({ message: "success", user: newUser })
            }
        } catch (error) {
            res.status(400).json(error)
        }
    },
    login: async (req, res) => {
        try {
            const user = await User.findOne({ email: req.body.email });
            if (user) {
                const passwordMatch = await bcrypt.compare(req.body.password, user.password)
                if (passwordMatch) {
                    const usertoken = jwt.sign({ _id: user.id, email: user.email }, SECRET, { expiresIn: "1d" })
                    res.cookie("usertoken", usertoken, {
                        httpOnly: true
                    }).json({ message: "success", user: user })
                } else {
                    res.status(400).json({ message: "invalid login attempt" })
                }
            } else {
                res.status(400).json({ message: "invalid login attempt" })
            }

        } catch (err) {
            res.status(400).json(err)
        }
    },
    logout: (req,res) => {
        res.clearCookie("usertoken")
        .json({message:"succes log out "})
    },
    getLoggedUser: async (req, res) => {
        try {
            jwt.verify(req.cookies.usertoken, SECRET)
            res.json({ successMessage: "User loggedIn working..." })

        }catch(err) {
            res.status(401).json({message:"Unauthorized"})
        }
        
        
    }

}