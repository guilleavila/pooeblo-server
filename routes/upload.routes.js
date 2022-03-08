const router = require("express").Router()

const uploader = require('./../config/cloudinary.config')

router.post('/image', uploader.array('photos'), (req, res) => {

    let response = req.file || req.files

    console.log('-----', response)

    if (!response) {
        res.status(500).json({ errorMessage: 'Error cargando el archivo' })
        return
    }

    res.json({ cloudinary_urls: response.map(res => res.path) })
})

router.post('/imageOne', uploader.single('imageData'), (req, res) => {

    if (!req.file) {
        res.status(500).json({ errorMessage: 'Error caragndo el archivo' })
        return
    }

    res.json({ cloudinary_url: req.file.path })
})

module.exports = router