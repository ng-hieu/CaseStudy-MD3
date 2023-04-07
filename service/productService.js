const connection = require('../entity/connection.js')

class ProductService {
    connect;

    constructor() {
        connection.connectingToMySQL();
        this.connect = connection.getConnection();
    }

    showAll = () => {
        return new Promise((resolve, reject) => {
            this.connect.query(`select p.nameProduct,
                                       p.priceProduct,
                                       p.quantityProduct,
                                       p.descriptionProduct,
                                       c.nameCategory,
                                       p.imageProduct,
                                       p.productId
                                from product_list p
                                         join category_list c on p.categoryId = c.categoryId`, (error, data) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(data);
                }
            })
        })
    }
    findById = (id) => {
        return new Promise((resolve, reject) => {
            this.connect.query(`select nameProduct, priceProduct, quantityProduct, descriptionProduct
                                from product_list
                                where productId = ${id}`, (error, data) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(data);
                }
            })
        })

    }
}

module.exports = new ProductService();