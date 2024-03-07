import express from "express"
import User from '../models/user.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const authRouter = express.Router()

authRouter.post('/register', async (req, res) => {
    const { first_name, last_name, email, password } = req.body
    try {
        const emailverification = await User.findOne({ email: email })
        if (emailverification) {
            return res.json("email already exists")
        }
        const generateSalt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hashSync(password, generateSalt)

        const user = new User({
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: hashPassword
        })
        user.save()
        res.send(`Welcome ${user.first_name}`)
    } catch (error) {
        res.json(error)
    }
})

authRouter.post('/login', async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.findOne({ email: email })
        if(!user) return res.json('Email or password incorrect')
        
        const token = jwt.sign({id: user._id, first_name: user.first_name, last_name: user.last_name}, process.env.JWT_SECRET_KEY)
        res.header('auth-token', token)
        res.json(token)

    } catch (error) {
        res.json(error)
    }
})


export default authRouter;