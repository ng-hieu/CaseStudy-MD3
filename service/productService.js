const connection = require('../entity/connection.js')
const cookie = require("cookie");

class ProductService {
    connect;

    constructor() {
        connection.connectingToMySQL();
        this.connect = connection.getConnection();
    }

    //Display all variable in SQL Database
    showAll = () => {
        return new Promise((resolve, reject) => {
            this.connect.query(`select p.productId,
                                       p.nameProduct,
                                       p.priceProduct,
                                       p.quantityProduct,
                                       p.descriptionProduct,
                                       c.nameCategory,
                                       p.imageProduct
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

    // Search SQL Database for product with the same ID
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

    // Searched product SQL Database by price in descending order
    searchProducts = (searchValue) => {
        return new Promise((resolve, reject) => {
            this.connect.query(`SELECT p.productId,
                                       p.nameProduct,
                                       p.priceProduct,
                                       p.quantityProduct,
                                       p.descriptionProduct,
                                       c.nameCategory,
                                       p.imageProduct
                                FROM product_list p
                                         JOIN category_list c ON p.categoryId = c.categoryId
                                WHERE nameProduct LIKE '%${searchValue}%'
                                   OR nameCategory LIKE '%${searchValue}%'`, (error, data) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(data);
                }
            })
        })
    }
    sortUpByPrice = () =>{
        return new Promise((resolve, reject) => {
            this.connect.query(`SELECT product_list.nameProduct, category_list.nameCategory, product_list.priceProduct
                                FROM product_List
                                INNER JOIN category_list
                                ON product_list.categoryId = category_list.categoryId ORDER BY priceProduct;`, (err, data)=>{
                if (error) {
                    reject(error);
                } else {
                    resolve(data);
                }
            })
        })
    }
    sortDownByPrice = () =>{
        return new Promise((resolve, reject) => {
            this.connect.query(`SELECT product_list.nameProduct, category_list.nameCategory, product_list.priceProduct
                                FROM product_List
                                         INNER JOIN category_list
                                                    ON product_list.categoryId = category_list.categoryId
                                WHERE nameProduct LIKE '%${searchValue}%'
                                   OR nameCategory LIKE '%${searchValue}%'
                                ORDER BY priceProduct DESC;`)
        })
    }
    showInforCustomer = (id) => {
        return new Promise((resolve, reject) => {
            this.connect.query(`SELECT u.userId, u.nameUser, u.ageUser, u.email, u.phoneUser, u.addressUser, COUNT(od.orderId) AS orders
                                FROM user_list u JOIN order_list o ON u.userId = o.userId
                                                 JOIN order_detail od ON od.orderId = o.orderId WHERE u.userId = ${id};`, (err, data)=>{
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            })
        })
    }
}

module.exports = new ProductService();