import express from "express";
import Team from '../models/team.js'
const teamRouter = express.Router();

teamRouter.get('/teams', async (req, res) => {
    try {
        const teams = await Team.find()
        res.json(teams)
    } catch (error) {
        console.error(error.message);
    }
})

teamRouter.post('/teams', async (req, res) => {
    try {
        const newTeam = await Team.create(req.body)
        res.json(newTeam);
    } catch (error) {
        console.error(error.message);
    }
})

teamRouter.get('/teams/:id', async (req, res) => {
    try {
        const teambyId = await Team.findById(req.params.id);
        res.json(teambyId);
    } catch (error) {
        console.error(error.message);
    }
})

teamRouter.put('/teams/:id', async (req, res) => {
    try {
        const updatedTeam = await Team.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
        }, { new: true });
        res.json(updatedTeam);
    } catch (error) {
        console.error(error.message)
    }
})

teamRouter.delete('/teams/:id', async (req, res) => {
    try {
        await Team.findByIdAndDelete(req.params.id)
        res.json('Team has been delete')
    } catch (error) {
        console.error(error.message)
    }
})


export default teamRouter