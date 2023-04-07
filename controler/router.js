const productController = require('./handle/productController');
const  userController=require('./handle/userController');
const router = {
    "home": productController.home,
    'edit': userController.editProductById,
    'descriptionProduct':productController.descriptionProduct,
    'signin': userController.signIn,
    'signup': userController.signUp,
    'addProduct': userController.addProduct,
}

module.exports = router;