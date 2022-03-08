const router = require("express").Router();

router.use("/auth", require('./auth.routes'))
router.use("/user", require('./user.routes'))
router.use('/villages', require('./villages.routes'))
router.use('/subscriptions', require('./subscriptions.routes'))
router.use("/houses", require('./houses.routes'))
router.use("/bookings", require('./bookings.routes'))
router.use("/upload", require('./upload.routes'))
router.use("/stripe", require('./stripe.routes'))

module.exports = router;
