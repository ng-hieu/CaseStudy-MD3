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
    "sortUp": productController.sortUp,
    "sortDown": productController.sortDown,
    "showInfor": productController.showInforUser,
    "shoppingCart": productController.showShoppingCart,
    'addToCart': productController.addShoppingCart,
    'delItemToCart': productController.delItemToCart,
    "delAllToCart": productController.delAllToCart,
    'increaseQuantityToCart':productController.increaseQuantityToCart,
    'reduceQuantityToCart':productController.reduceQuantityToCart,

}

module.exports = router;