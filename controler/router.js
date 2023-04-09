const productController = require('./handle/productController');
const userController = require('./handle/userController');
const adMincontroller = require('./handle/adminController');
const router = {
    "home": productController.home,
    'edit': userController.editProductById,
    'homeAdmin': userController.showProductInAdmin,
    'descriptionProduct': productController.descriptionProduct,
    'signin': userController.signIn,
    'signup': userController.signUp,
    'addProduct': userController.addProduct,
    "":productController.homeBfsign,
    "delete": userController.deleteProductById,
    "sortUp": productController.sortUp,
    "sortDown": productController.sortDown,
    "showInfor": productController.showInforUser,
    "signout": productController.homeBfsign,
    "shoppingCart": productController.showShoppingCart,
    'addToCart': productController.addShoppingCart,
    'delItemToCart': productController.delItemToCart,
    "delAllToCart": productController.delAllToCart,
    'increaseQuantityToCart':productController.increaseQuantityToCart,
    'reduceQuantityToCart':productController.reduceQuantityToCart,
    "editOrderDetail":adMincontroller.showOrderDetail,
    "deleteOrderDetail":adMincontroller.deleteOrderDetail,
}

module.exports = router;