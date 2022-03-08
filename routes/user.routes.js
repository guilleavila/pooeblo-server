const router = require('express').Router()

const User = require('./../models/User.model')
const House = require('./../models/House.model')
const { isAuthenticated } = require('../middlewares/jwt.middleware')

// --- GET USER'S DETAILS ROUTE
router.get('/', isAuthenticated, (req, res) => {

    const { _id } = req.payload

    User
        .findById(_id)
        .populate('followedVillages')
        .populate('favHouses')
        .populate({
            path: 'favHouses',
            populate: [
                { path: 'village' }
            ]
        })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


// --- EDIT USER ROUTE
router.put('/edit', isAuthenticated, (req, res) => {

    const { _id } = req.payload
    const { firstName, lastName, email, phoneNumber, birthDate, profileImg } = req.body

    User
        .findByIdAndUpdate(_id, { firstName, lastName, email, phoneNumber, birthDate, profileImg })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


// --- DELETE USER ROUTE
router.delete("/:user_id/delete", (req, res) => {

    const { user_id } = req.params  // este caso es correcto --> no es para borrarte a ti mismo

    User
        .findByIdAndDelete(user_id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


// --- GET ALL PROPERTIES
router.get("/properties", isAuthenticated, (req, res) => {

    const { _id } = req.payload

    House
        .find({ owner: _id })
        .populate('village')
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

module.exports = router