const router = require('express').Router()

const House = require('./../models/House.model')
const User = require('./../models/User.model')
const Subscription = require('./../models/Subscription.model')
const Booking = require('./../models/Booking.model')
const { isAuthenticated } = require('../middlewares/jwt.middleware')


// --- GET ALL HOUSES ROUTE
router.get("/", (req, res) => {

    House
        .find()
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


// --- CREATE HOUSE ROUTE AND CREATE OWNER SUBSCRIPTION
router.post("/create", isAuthenticated, (req, res) => {

    const userId = req.payload._id

    const { name, description, priceDay, services, roomsDescription, maxGuests, images, availableDaysLeft, lat, lng, village, street, owner } = req.body

    const location = {
        type: 'Point',
        coordinates: [lat, lng]
    }

    House
        .create({ name, description, priceDay, services, roomsDescription, maxGuests, images, availableDaysLeft, location, village, street, owner })
        .then(({ _id }) => {
            return Subscription.create({ coRenter: userId, house: _id, totalDays: 0, totalPrice: 0, daysLeftToBook: 365 })
        })
        .then(response => res.json(response))
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})


// --- HOUSE DETAILS ROUTE
router.get("/:house_id", (req, res) => {

    const { house_id } = req.params

    House
        .findById(house_id)
        .populate('village')
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


// --- EDIT HOUSE ROUTE
router.put("/:house_id/edit", (req, res) => {

    const { house_id } = req.params
    // const { name, description, priceDay, services, roomsDescription, maxGuests, availableDaysLeft, lat, lng } = req.body
    const { name, description, priceDay, services, roomsDescription, maxGuests, availableDaysLeft } = req.body


    // const location = {
    //     type: 'Point',
    //     coordinates: [lat, lng]
    // }

    House
        .findByIdAndUpdate(house_id, { name, description, priceDay, services, roomsDescription, maxGuests, availableDaysLeft })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


// --- DELETE ONE IMAGE
router.put("/:house_id/edit-image", (req, res) => {

    const { house_id } = req.params
    const houseImages = req.body

    House
        .findByIdAndUpdate(house_id, { images: houseImages }, { new: true })
        .then(response => res.json(response))
        .catch(err => console.log(err))
})


// --- UPDATE IMAGES
router.put("/:house_id/upload-images", (req, res) => {

    const { house_id } = req.params
    const houseImages = req.body.images

    House
        .findByIdAndUpdate(house_id, { $addToSet: { images: { $each: houseImages } } }, { new: true })
        .then(response => {
            console.log('LO QUE ME LLEGA ------------->', houseImages)
            console.log('LA RESPONSE ------------->', response)
            res.json(response)
        })
        .catch(err => {
            console.log('EL ERROR ------------>', err)
            res.status(500).json(err)
        })


})


// --- DELETE HOUSE ROUTE
router.delete("/:house_id/delete", (req, res) => {

    const { house_id } = req.params

    House
        .findByIdAndDelete(house_id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


// --- ADD HOUSE TO FAVS ROUTE
router.put('/:house_id/add-to-fav', isAuthenticated, (req, res) => {

    const { house_id } = req.params
    const { _id } = req.payload

    User
        .findByIdAndUpdate(_id, { $addToSet: { favHouses: house_id } }, { new: true })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


// --- SUBTRACT HOUSE FROM FAVS ROUTE
router.put('/:house_id/subtract-from-fav', isAuthenticated, (req, res) => {

    const { house_id } = req.params
    const { _id } = req.payload


    User
        .findByIdAndUpdate(_id, { $pull: { favHouses: house_id } })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


// --- GET ALL BOOKINGS (all users) OF ONE HOUSE
router.get('/:house_id/get-all-bookings', (req, res) => {

    const { house_id } = req.params


    Subscription
        .find({ house: house_id })
        .then(foundSubscriptions => {

            let bookings = foundSubscriptions.map(elm => Booking.find({ subscription: elm._id }).populate('subscription').populate({ path: 'subscription', populate: [{ path: 'coRenter' }] }))

            return Promise.all(bookings)
        })

        .then((response) => {

            let ultimateArr = []            // flat

            response.forEach(elm => ultimateArr.push(...elm))
            console.log('SPREAD', ultimateArr)
            return res.json(ultimateArr)
        })
        .catch(err => res.status(500).json(err))
})

// --- GET ALL BOOKINGS OF ONE HOUSE (LOGED USER)
router.get('/:house_id/get-all-my-bookings', isAuthenticated, (req, res) => {

    const { house_id } = req.params
    const { _id } = req.payload


    Subscription
        .find({ house: house_id, coRenter: _id })
        .then(foundSubscriptions => {

            let bookings = foundSubscriptions.map(elm => Booking.find({ subscription: elm._id }))

            return Promise.all(bookings)
        })
        .then((response) => {

            let ultimateArr = []

            response.forEach(elm => ultimateArr.push(...elm))
            return res.json(ultimateArr)
        })
        .catch(err => res.status(500).json(err))
})


// --- GET USER'S SUBSCRIPTIONS
router.get('/:house_id/get-subscription', isAuthenticated, (req, res) => {

    const { house_id } = req.params
    const { _id } = req.payload

    Subscription
        .find({ house: house_id, coRenter: _id })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

module.exports = router