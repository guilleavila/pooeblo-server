const router = require('express').Router()

const Village = require('../models/Village.model')
const User = require('../models/User.model')
const House = require('../models/House.model')
const Subscription = require('../models/Subscription.model')
const { isAuthenticated } = require('../middlewares/jwt.middleware')


// GET --- GET ALL VILLAGES

router.get('/', (req, res) => {

    Village
        .find()
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


// GET --- GET ONE VILLAGE

router.get('/findOneVillage/:village_id', (req, res) => {

    const { village_id } = req.params

    Village
        .findById(village_id)
        .sort({ name: 1 })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


// PUT --- EDIT VILLAGE INFO

router.put('/:village_id/edit-info', (req, res) => {

    const { village_id } = req.params
    const { name, phoneNumber, CCAA, province, profileImg, description, website, lat, lng } = req.body

    const location = {
        type: 'Point',
        coordinates: [lat, lng]
    }

    Village
        .findByIdAndUpdate(village_id, { name, phoneNumber, CCAA, province, profileImg, description, website, location }, { new: true })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


// PUT --- EDIT VILLAGE FEATURES

router.put('/:village_id/edit-features', (req, res) => {

    const { village_id } = req.params
    let { distanceToCity, residents, averageRentingPrice, averagePurchasePrice, healthService, sportsFacilities, isCoastalVillage, isMountainVillage, otherServices } = req.body

    healthService === 'on' ? healthService = true : healthService = false       // .checked prop
    sportsFacilities === 'on' ? sportsFacilities = true : sportsFacilities = false


    Village
        .findByIdAndUpdate(village_id, { features: { distanceToCity, residents, averageRentingPrice, averagePurchasePrice, healthService, sportsFacilities, isCoastalVillage, isMountainVillage, otherServices } }, { new: true })
        .then(response => res.json(response))
        .catch(err => {
            res.status(500).json(err)
        })
})



// DELETE --- DELETE VILLAGE
// debe estar protegida solo para ADMIN

router.delete('/:village_id/delete', (req, res) => {
    const { village_id } = req.params

    Village
        .findByIdAndRemove(village_id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


// PUT --- FOLLOW VILLAGE
router.put('/:village_id/follow', isAuthenticated, (req, res) => {
    const { village_id } = req.params
    const { _id } = req.payload

    User
        .findByIdAndUpdate(_id, { $addToSet: { followedVillages: village_id } })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


// PUT --- UNFOLLOW VILLAGE
router.put('/:village_id/unfollow', isAuthenticated, (req, res) => {
    const { village_id } = req.params
    const { _id } = req.payload

    User
        .findByIdAndUpdate(_id, { $pull: { followedVillages: village_id } })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


// GET --- GET ALL HOUSES OF ONE VILLAGE
router.get('/:village_id/houses', (req, res) => {

    const { village_id } = req.params

    House
        .find({ village: village_id })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


// GET --- GET ALL SUBSCRIPTIONS OF A VILLAGE
router.get('/:village_id/subscriptions', (req, res) => {

    const { village_id } = req.params

    House
        .find({ village: village_id })
        .then(foundHouses => {

            let subscriptions = foundHouses.map(elm => Subscription.find({ house: elm._id }))
            return Promise.all(subscriptions)
        })
        .then((response) => {
            let ultimateArr = []

            response.forEach(elm => ultimateArr.push(...elm))
            return res.json(ultimateArr)
        })
        .catch(err => res.status(500).json(err))

})


// GET --- SEARCH VILLAGE BY NAME
router.get('/search-village-by-name/:input_text', (req, res) => {

    const { input_text } = req.params

    Village
        .find({ name: { $regex: input_text, $options: 'i' } })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


// GET --- GET ALL PROVINCES
// router.get('/provinces/:input_text', (req, res) => {

//     const provinces = []
//     const { input_text } = req.params 

//     Village
//         .find()
//         .select('province')
//         .then(response => {



//             let filteredProvinces = [...new Set(response)]
//             filteredProvinces
//                 .filter((eachProvince) => eachProvince.toLowerCase().includes(input_text))
//                 .map(eachProvince => eachProvince[0].toUpperCase() + eachProvince.substring(1))

//             console.log(filteredProvinces)
//             res.json(filteredProvinces)
//         })
//         .catch(err => res.status(500).json(err))
// })


router.get('/provinces/:input_text', (req, res) => {

    const provinces = []
    const { input_text } = req.params

    Village
        .find()
        .select('province')
        .then(response => {
            response.forEach(elm => !provinces.includes(elm.province) && provinces.push(elm.province))
            let filteredProvinces = provinces.filter((eachProvince) => {
                return eachProvince.toLowerCase().includes(input_text.toLowerCase())
            })
            res.json(filteredProvinces)
        })
        .catch(err => res.status(500).json(err))
})


// GET - SEARCH VILLAGE BY PROVINCE
router.get('/search-villages-by-province/:input_select', (req, res) => {

    const { input_select } = req.params

    Village
        .find({ province: { $regex: input_select, $options: 'i' } })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

// GET - SEARCH COAST VILLAGE
router.get('/search-villages-in-the-coast', (req, res) => {

    Village
        .find({ 'features.isCoastalVillage': true })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

// GET - SEARCH MOUNTAIN VILLAGE
router.get('/search-villages-in-the-mountain', (req, res) => {

    Village
        .find({ 'features.isMountainVillage': true })
        .then(response => res.json(response))
        .catch(err => console.log(err))
})

// GET - SEARCH VILLAGE CLOSE TO CITY


module.exports = router