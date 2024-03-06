import express from "express";
import Driver from '../models/driver.js'
const driverRouter = express.Router();

driverRouter.get('/drivers', async (req, res) => {
    try {
        const drivers = await Driver.find().populate('teamId')
        res.json(drivers)
    } catch (error) {
        console.error(error.message);
    }
})

driverRouter.post('/drivers', async (req, res) => {
    try {
        const newDriver = await Driver.create(req.body)
        res.json(newDriver);
    } catch (error) {
        console.error(error.message);
    }
})

driverRouter.get('/drivers/:id', async (req, res) => {
    try {
        const driverbyId = await Driver.findById(req.params.id).populate('teamId');
        res.json(driverbyId);
    } catch (error) {
        console.error(error.message);
    }
})

driverRouter.put('/drivers/:id', async (req, res) => {
    try {
        const updatedDriver = await Driver.findByIdAndUpdate(req.params.id, {
            last_name: req.body.last_name,
            first_name: req.body.first_name,
            teamId: req.body.teamId
        }, { new: true });
        res.json(updatedDriver);
    } catch (error) {
        console.error(error.message)
    }
})

driverRouter.delete('/drivers/:id', async (req, res) => {
    try {
        await Driver.findByIdAndDelete(req.params.id)
        res.json('Driver has been delete')
    } catch (error) {
        console.error(error.message)
    }
})


export default driverRouter