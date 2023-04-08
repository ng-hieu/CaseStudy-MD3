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
            this.connect.query(`select nameProduct, priceProduct, quantityProduct, descriptionProduct, imageProduct
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
                                   OR nameCategory LIKE '%${searchValue}%';`, (error, data) => {
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
            this.connect.query(`SELECT * FROM product_list ORDER BY priceProduct;`, (err, data)=>{
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
            this.connect.query(`SELECT * FROM product_list ORDER BY priceProduct DESC;`, (err, data)=>{
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