import express from "express";
import User from '../models/user.js'
const userRouter = express.Router();

userRouter.get('/users', async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (error) {
        console.error(error.message);
    }
})

userRouter.post('/users', async (req, res) => {
    try {
        const newUser = await User.create(req.body)
        res.json(newUser);
    } catch (error) {
        console.error(error.message);
    }
})

userRouter.get('/users/:id', async (req, res) => {
    try {
        const userbyId = await User.findById(req.params.id);
        res.json(userbyId);
    } catch (error) {
        console.error(error.message);
    }
})

userRouter.put('/users/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            last_name: req.body.last_name,
            first_name: req.body.first_name,
            email: req.body.email,
            password: req.body.password
        }, { new: true });
        res.json(updatedUser);
    } catch (error) {
        console.error(error.message)
    }
})

userRouter.delete('/users/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.json('User has been delete')
    } catch (error) {
        console.error(error.message)
    }
})


export default userRouter