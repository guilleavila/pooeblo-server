const router = require("express").Router()

const Stripe = require('stripe')

const stripe = new Stripe()

router.post('/checkout', async (req, res) => {

    const { id, amount } = req.body

    const payment = await stripe.paymentIntents.create({
        amount: amount,
        currency: 'EUR',
        description: 'Suscripción',
        payment_method: id,
        confirm: true
    })

    console.log(payment)
})



module.exports = router