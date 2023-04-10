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
    addItemToCart = (productId, userId) => {
        return new Promise((resolve, reject) => {
            this.connect.query(
                `INSERT INTO cart_detail (userId, productId, quantity)
                 VALUES (${userId}, ${productId}, '1')`,
                (error, data) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(data)
                    }
                }
            );
        });
    };
    showItemToCart = (userId) => {
        return new Promise((resolve, reject) => {
            this.connect.query(` SELECT *
                                 FROM product_list p
                                          join cart_detail c on p.productId = c.productId
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
    deItemToCart = (userId, productId) => {
        return new Promise((resolve, reject) => {
            this.connect.query(`DELETE
                                FROM cart_detail
                                WHERE userId = ${userId}
                                  AND productId = ${productId}`, (error, data) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(data);
                }
            })
        })
    }
    delAllItemToCart =(userId) => {
        return new Promise((resolve, reject) => {
            this.connect.query(`DELETE 
                                FROM cart_detail
                                WHERE userId = ${userId}`, (error, data) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(data);
                }
            })
        })
    }
    increaseQuantityToCart = (userId, productId) => {
        return new Promise((resolve, reject) => {
            this.connect.query(`UPDATE cart_detail
                                SET quantity = quantity + 1
                                WHERE userId = ${userId}
                                  AND productId = ${productId}`, (error, data) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(data);
                }
            })
        })
    }
    reduceQuantityToCart = (userId, productId) => {
        return new Promise((resolve, reject) => {
            this.connect.query(`UPDATE cart_detail
                                SET quantity = quantity - 1
                                WHERE userId = ${userId}
                                  AND productId = ${productId};
            `, (error) => {
                if (error) {
                    reject(error);
                } else {
                    return new Promise((resolve, reject) => {
                        this.connect.query(`DELETE
                                            FROM cart_detail
                                            WHERE quantity = 1
                                              and userId = ${userId}
                                              AND productId = ${productId}`, (error, data) => {
                            if (error) {
                                reject(error);
                            } else {
                                resolve(data);
                            }
                        })
                    })

                }
            })
        })
    }
    totalPriceToCart = (userId) => {
        return new Promise((resolve, reject) => {
            this.connect.query(`SELECT SUM(c.quantity * p.priceProduct) AS \`totalPrice\`
                                FROM cart_detail c
                                         JOIN product_list p ON c.productId = p.productId
                                WHERE c.userId = ${userId}`, (error, data) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(data[0].totalPrice);
                }
            })
        })
    }

    // Searched product SQL Database by price in descending order
    searchProducts = (searchValue) => {
        return new Promise((resolve, reject) => {
            this.connect.query(`SELECT p.nameProduct, c.nameCategory, p.priceProduct, p.imageProduct
                                FROM product_List p JOIN category_list c
                                                         ON p.categoryId = c.categoryId
                                WHERE p.nameProduct LIKE '%${searchValue}%';`, (error, data) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(data);
                }
            })
        })
    }
    sortUpByPrice = () => {
        return new Promise((resolve, reject) => {
            this.connect.query(`SELECT product_list.nameProduct,
                                       category_list.nameCategory,
                                       product_list.priceProduct,
                                       product_list.imageProduct
                                FROM product_List
                                         JOIN category_list
                                              ON product_list.categoryId = category_list.categoryId
                                ORDER BY product_list.priceProduct;`, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            })
        })
    }
    sortDownByPrice = () => {
        return new Promise((resolve, reject) => {
            this.connect.query(`SELECT product_list.nameProduct,
                                       category_list.nameCategory,
                                       product_list.priceProduct,
                                       product_list.imageProduct
                                FROM product_List
                                         JOIN category_list
                                              ON product_list.categoryId = category_list.categoryId
                                ORDER BY product_list.priceProduct DESC;`, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            })
        })
    }
    showInforCustomer = (id) => {
        return new Promise((resolve, reject) => {
            this.connect.query(`SELECT u.userId,
                                       u.nameUser,
                                       u.ageUser,
                                       u.email,
                                       u.phoneUser,
                                       u.addressUser,
                                       COUNT(od.orderId) AS orders
                                FROM user_list u
                                         JOIN order_list o ON u.userId = o.userId
                                         JOIN order_detail od ON od.orderId = o.orderId
                                WHERE u.userId = ${id};`, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            })
        })
    }
    searchProducts = (searchValue) => {
        return new Promise((resolve, reject) => {
            this.connect.query(`SELECT p.nameProduct, c.nameCategory, p.priceProduct, p.imageProduct
                                FROM product_List p JOIN category_list c
                                                         ON p.categoryId = c.categoryId
                                WHERE p.nameProduct LIKE '%${searchValue}%';`, (error, data) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(data);
                }
            })
        })
    }
    totalPriceToCart = (userId, productId) => {
        return new Promise((resolve, reject) => {
            this.connect.query(`select sum(c.quantity * p.priceProduct) from cart_detail c join product_list p on c.productId = p.productId where c.userId = ${userId} and c.productId = ${productId}`, (error, data) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(data);
                }
            })
        })
    }

}

module
    .exports = new ProductService();