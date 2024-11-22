const express = require('express')
const {CreateAOrder} = require('./order_controller')

const router = express.Router()

router.post("/",CreateAOrder)

module.exports = router