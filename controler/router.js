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
    "signout": productController.homeBfsign,
    "shoppingCart": productController.showShoppingCart,
    'addToCart':productController.addShoppingCart,
    "editOrderDetail":adMincontroller.showOrderDetail,
    "deleteOrderDetail":adMincontroller.deleteOrderDetail,
    "sortUp": productController.sortUp,
    "sortDown": productController.sortDown,
    "showInfor": productController.showInforUser,
    'delItemToCart':productController.delItemToCart,
    "deleteAll":productController.delAllToCart,
    'increaseQuantityToCart':productController.increaseQuantityToCart,
    'reduceQuantityToCart':productController.reduceQuantityToCart,
    "buy":productController.buyProduct,

}

module.exports = router;