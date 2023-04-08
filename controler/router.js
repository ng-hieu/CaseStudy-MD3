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
<<<<<<< HEAD
    "":productController.homeBfsign,
    "signout":productController.homeBfsign,
    "delete": userController.deleteProductById,
=======
    "": productController.homeBfsign,
    "signout": productController.homeBfsign,
    "shoppingCart": productController.showShoppingCart,
    'addToCart':productController.addShoppingCart
>>>>>>> 583e46a562ce9db0d1dac577bf09a2c179fd373d
}

module.exports = router;