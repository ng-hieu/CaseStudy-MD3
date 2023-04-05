const productController = require('./handle/productController')
const router = {
    "home": productController.home,
    'navbar':productController.navbar
}

module.exports = router;