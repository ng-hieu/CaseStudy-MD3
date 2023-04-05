const productController = require('./handle/productController')
const router = {
    "home": productController.home,
}

module.exports = router;