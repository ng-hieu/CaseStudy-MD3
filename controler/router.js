const productController = require('./handle/productController');
const  userController= require('./handle/userController');
const router = {
    "home": productController.home,
    'descriptionProduct':productController.descriptionProduct,
    'signin': userController.signIn,
    'signup': userController.signUp,
    'addProduct': userController.addProduct,
    'edit': productController.edit,
    "":productController.homeBfsign,
    "signout":productController.homeBfsign
}

module.exports = router;