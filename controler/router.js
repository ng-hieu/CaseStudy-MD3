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
    "delete": userController.deleteProductById,
    "": productController.homeBfsign,
    "signout": productController.homeBfsign,
    "shoppingCart": productController.showShoppingCart,
    'addToCart': productController.addShoppingCart,
    'delItemToCart': productController.delItemToCart,
    'delAllToCart': productController.delAllToCart

}

module.exports = router;