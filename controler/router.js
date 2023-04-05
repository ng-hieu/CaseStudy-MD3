const productController = require('./handle/productController')
const router = {
    "home": productController.home,
    'signIn': productController.signIn,
    'signUp': productController.signUp,
}

module.exports = router;