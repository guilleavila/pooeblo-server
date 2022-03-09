const router = require('express').Router()

const { isAuthenticated } = require('../middlewares/jwt.middleware')
const Post = require('../models/Post.model')
const User = require('../models/User.model')


// --- CREATE POST ROUTE 
router.post("/create", isAuthenticated, (req, res) => {

    const { _id } = req.payload
    const { image, content } = req.body

    Post
        .create({ image, content, likes: 0, creator: _id })
        .then(response => {
            res.json(response)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})


// --- GET ALL POSTS ROUTE
router.get("/", (req, res) => {

    Post
        .find()
        .populate('creator')
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


// --- GET ALL POST OF ONE VILLAGE
router.get("/get-villagge-posts/:village_id", (req, res) => {

    const { village_id } = req.params

    Post
        .find({ creator: village_id })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


// --- GET ALL POSTS OF YOUR FOLLOWED VILLAGES
router.get("/get-followed-villages-posts", isAuthenticated, (req, res) => {

    const { _id } = req.payload

    User
        .findById(_id)
        .select('followedVillages')
        .then(response => {

            let followersPosts = response.followedVillages.map(elm => Post.find({ creator: elm._id }))
            return Promise.all(followersPosts)
        })
        .then((response) => res.json(response.flat()))
        .catch(err => res.status(500).json(err))
})


// --- POST DETAILS ROUTE
router.get("/:post_id", (req, res) => {

    const { post_id } = req.params

    Post
        .findById(post_id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


// --- EDIT POST ROUTE
router.put('/:post_id/edit', (req, res) => {

    const { post_id } = req.params
    const { content } = req.body

    Post
        .findByIdAndUpdate(post_id, { content })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


// --- POST DELETE ROUTE
router.delete("/:post_id/delete", (req, res) => {

    const { post_id } = req.params

    Post
        .findByIdAndDelete(post_id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

module.exports = router