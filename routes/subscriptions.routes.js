const router = require('express').Router()

const Subscription = require('../models/Subscription.model')
const House = require('../models/House.model')
const { isAuthenticated } = require('../middlewares/jwt.middleware')

// GET - GET USER'S SUBSCRIPTIONS
router.get('/my-subscription', isAuthenticated, (req, res) => {
    // no es un formulario --> mirar contexto
    const { _id } = req.payload


    Subscription
        .find({ coRenter: _id })
        .populate('house')
        .populate({
            path: 'house',
            populate: [
                { path: 'village' }
            ]
        })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


// POST --- CREATE SUBSCRIPTION
router.post('/create', isAuthenticated, (req, res) => {

    // el corenter y la house no salen de ahí
    const { house, totalDays } = req.body
    const {_id} = req.payload

    House
        .findById(house)
        .select('priceDay')
        .then(({ priceDay }) => {
            const totalPrice = priceDay * totalDays
            return Subscription.create({ coRenter: _id, house, totalDays, totalPrice, daysLeftToBook: totalDays })
        })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


// DELETE --- CANCEL SUBSCRIPTION
router.delete('/:subscription_id/delete', (req, res) => {

    const { subscription_id } = req.params

    Subscription
        .findByIdAndRemove(subscription_id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


module.exports = router