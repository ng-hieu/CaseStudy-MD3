const connection = require('../entity/connection.js')
const cookie = require("cookie");

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
            this.connect.query(`select *
                                from product_list
                                where productId = ${id}`, (error, data) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(data[0]);
                }
            })
        })
    }
    addItemToCart = (productId,userId ) => {
        return new Promise((resolve, reject) => {
            this.connect.query(` INSERT INTO cart_detail (userId,productId,quantity)
                                         VALUES (${userId}, ${productId},'1');

            `, (error, data) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(data);
                }
            })
        })
    }
    showItemToCart = (userId) => {
        return new Promise((resolve, reject) => {
            this.connect.query(` SELECT * FROM product_list p join cart_detail c on p.productId = c.productId
                                 where c.userId = ${userId};
            `, (error, data) => {
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