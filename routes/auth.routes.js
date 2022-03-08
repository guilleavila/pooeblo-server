const router = require("express").Router()

const bcrypt = require('bcryptjs')
const saltRounds = 10

const jwt = require('jsonwebtoken')
const { isAuthenticated } = require('./../middlewares/jwt.middleware')

const User = require("../models/User.model")
const Village = require('../models/Village.model')



// --- USER SIGNUP ROUTE
router.post('/user-signup', (req, res, next) => {

    const { firstName, lastName, email, password, phoneNumber, birthDate } = req.body

    if (email === '' || password === '' || firstName === '' || lastName === '' || phoneNumber === '' || birthDate === '') {
        res.status(400).json({ message: 'Provide all inputs' })
        return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
    if (!emailRegex.test(email)) {
        res.status(400).json({ message: 'Provide valid email address' })
        return
    }

    if (password.length < 4) { // al terminar de progamar, passwordRegex
        res.status(400).json({ message: 'Password must have at least 4 characters' })
    }

    User
        .findOne({ email })
        .then((foundUser) => {
            if (foundUser) {
                res.status(400).json({ message: 'User already exists' })
                return
            }

            const salt = bcrypt.genSaltSync(saltRounds)
            const hashedPassword = bcrypt.hashSync(password, salt)

            return User.create({ firstName, lastName, email, password: hashedPassword, phoneNumber, birthDate })
        })
        .then((createdUser) => {
            const { firstName, lastName, email, phoneNumber, birthDate, profileImg, followedVillages, favHouses, _id } = createdUser

            const user = { firstName, lastName, email, phoneNumber, birthDate, profileImg, followedVillages, favHouses, _id }

            res.status(201).json({ user })
        })
        .catch(err => {
            res.status(500).json({ message: 'Internal server error' })
        })
})



// --- VILLAGE SIGNUP ROUTE
router.post('/village-signup', (req, res, next) => {

    const { name, lat, lng, email, password, phoneNumber, CCAA, province } = req.body

    const location = {
        type: 'Point',
        coordinates: [lat, lng]
    }

    if (email === '' || password === '' || name === '' || CCAA === '' || province === '') {
        res.status(400).json({ message: 'Provide all inputs' })
        return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
    if (!emailRegex.test(email)) {
        res.status(400).json({ message: 'Provide valid email address' })
        return
    }

    if (password.length < 4) { // al terminar de progamar, passwordRegex
        res.status(400).json({ message: 'Password must have at least 4 characters' })
    }

    Village
        .findOne({ email })
        .then((foundVillage) => {
            if (foundVillage) {
                res.status(400).json({ message: 'Village already exists' })
                return
            }

            const salt = bcrypt.genSaltSync(saltRounds)
            const hashedPassword = bcrypt.hashSync(password, salt)

            return Village.create({ name, location, email, password: hashedPassword, phoneNumber, CCAA, province })
        })
        .then((createdVillage) => {
            const { name, lat, lng, email, phoneNumber, CCAA, province, _id } = createdVillage

            const village = { name, lat, lng, email, phoneNumber, CCAA, province, _id }

            res.status(201).json({ village })
        })
        .catch(err => {
            res.status(500).json({ message: 'Internal server error' })
        })
})



// --- USER & VILLAGE LOGIN ROUTE
router.post('/login', (req, res, next) => {
    const { email, password } = req.body

    if (email === '' || password === '') {
        res.status(400).json({ message: 'Provide email and password' })
        return
    }

    const promises = [User.findOne({ email }), Village.findOne({ email })]

    Promise
        .all(promises)
        .then(([foundUser, foundVillage]) => {

            let isVillage = false
            let isUser = false

            if (foundUser === null) {

                if (!foundVillage) {
                    res.status(401).json({ message: 'Village not found' })
                    return
                }

                if (bcrypt.compareSync(password, foundVillage.password)) {

                    isVillage = true

                    const { name, email, _id } = foundVillage

                    const payload = { name, email, isVillage, isUser, _id }

                    const authToken = jwt.sign(
                        payload,
                        process.env.TOKEN_SECRET,
                        { algorithm: 'HS256', expiresIn: '6h' }
                    )

                    res.status(200).json({ authToken })

                } else {
                    res.status(401).json({ message: 'Unable to authenticate the user' })
                }
            } else if (foundVillage === null) {

                if (!foundUser) {
                    res.status(401).json({ message: 'User not found' })
                    return
                }

                if (bcrypt.compareSync(password, foundUser.password)) {

                    isUser = true

                    const { firstName, lastName, email, _id } = foundUser

                    const payload = { firstName, lastName, email, isVillage, isUser, _id }

                    const authToken = jwt.sign(
                        payload,
                        process.env.TOKEN_SECRET,
                        { algorithm: 'HS256', expiresIn: '6h' }
                    )

                    res.status(200).json({ authToken })

                } else {
                    res.status(401).json({ message: 'Unable to authenticate the user' })
                }

            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Internal Server Error' })
        })
})


// --- USER VERIFY ROUTE
router.get('/verify', isAuthenticated, (req, res, next) => {
    res.status(200).json(req.payload)
})


module.exports = router