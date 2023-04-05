const productController = require('./handle/productController')
const router = {
    "home": productController.home,
    'signin': productController.signIn,
    'signup': productController.signUp,
    'add': productController.add,
    'edit': productController.edit,
}

module.exports = router;