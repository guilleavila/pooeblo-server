const router = require('express').Router()

const { Router } = require('express')
const Booking = require('../models/Booking.model')
const Subscription = require('../models/Subscription.model')


// --- CREATE BOOKING ROUTE 
router.post("/create", (req, res) => {

    const { subscription, entryDate, exitDate } = req.body

    const entry = new Date(entryDate), exit = new Date(exitDate)

    const totalDays = (exit - entry) / (1000 * 3600 * 24)

    const promise1 = Booking.create({ subscription, entryDate, exitDate })
    const promise2 = Subscription.findByIdAndUpdate(subscription, { $inc: { daysLeftToBook: -totalDays } }, { new: true })

    Promise
        .all([promise1, promise2])
        .then(response => res.json(response))
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})


// --- BOOKING DETAILS ROUTE
router.get("/:booking_id", (req, res) => {

    const { booking_id } = req.params

    Booking
        .findById(booking_id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


// --- EDIT BOOKING
router.put('/:booking_id/edit', (req, res) => {

    const { booking_id } = req.params

    const { entryDate, exitDate } = req.body

    const entry = new Date(entryDate)
    const exit = new Date(exitDate)

    const totalDays = (exit - entry) / (1000 * 3600 * 24)

    Booking
        .findById(booking_id)
        .then(foundBooking => {  // guardamos fechas originales
            const originalEntry = deletedBooking.entryDate
            const originalExit = deletedBooking.exitDate
            const originalTotalDays = (originalExit - originalEntry) / (1000 * 3600 * 24)

            return Subscription.findByIdAndUpdate(foundBooking.subscription, { $inc: { daysLeftToBook: originalTotalDays } }, { new: true })
        })
        .then(() => {
            return Booking.findByIdAndUpdate(booking_id, { entryDate, exitDate })
        })
        .then((updatedBooking) => {
            return Subscription.findByIdAndUpdate(updatedBooking.subscription, { $inc: { daysLeftToBook: -totalDays } }, { new: true })
        })

    // .then(foundBooking => {  // guardamos fechas originales
    //     const { originalEntry, originalExit } = foundBooking
    //     const originalTotalDays = (originalExit - originalEntry) / (1000 * 3600 * 24)

    //     return Promise.all([
    //         Subscription.findByIdAndUpdate(foundBooking.subscription, { $inc: { daysLeftToBook: originalTotalDays } }, { new: true }),
    //         Booking.findByIdAndUpdate(booking_id, { entryDate, exitDate })
    //     ])
    // })
    // .then(([, updatedBooking]) => {
    //     return Subscription.findByIdAndUpdate(updatedBooking.subscription, { $inc: { daysLeftToBook: -totalDays } }, { new: true })
    // })



})

// --- BOOKING DELETE ROUTE
router.delete("/:booking_id/delete", (req, res) => {

    const { booking_id } = req.params

    Booking
        .findByIdAndDelete(booking_id)
        .then(deletedBooking => {
            const entry = deletedBooking.entryDate
            const exit = deletedBooking.exitDate

            const totalDays = (exit - entry) / (1000 * 3600 * 24)

            return Subscription.findByIdAndUpdate(deletedBooking.subscription, { $inc: { daysLeftToBook: totalDays } }, { new: true })
        })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

module.exports = router