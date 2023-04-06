const productController = require('./handle/productController');
const  userController=require('./handle/userController');
const router = {
    "home": productController.home,
    'add': productController.add,
    'edit': productController.edit,
    'descriptionProduct':productController.descriptionProduct,
    'signin': userController.signIn,
    'signup': userController.signUp,


}

module.exports = router;