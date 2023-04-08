const productController = require('./handle/productController');
const userController = require('./handle/userController');
const router = {
    "home": productController.home,
    'edit': userController.editProductById,
    'homeAdmin': userController.showProductInAdmin,
    'descriptionProduct': productController.descriptionProduct,
    'signin': userController.signIn,
    'signup': userController.signUp,
    'addProduct': userController.addProduct,
    "":productController.homeBfsign,
    "signout":productController.homeBfsign,
    "delete": userController.deleteProductById,
    "shoppingCart": productController.showShoppingCart,
    'addToCart':productController.addShoppingCart
}

module.exports = router;