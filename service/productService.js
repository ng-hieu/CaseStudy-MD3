const connection = require ('../entity/connection.js')

class ProductService {
    connect;
    constructor() {
        connection.connectingToMySQL();
        this.connect = connection.getConnection();
    }
    showAll = () => {
        return new Promise((resolve, reject) => {
            this.connect.query('select productId, nameProduct, priceProduct, quantityProduct, imageProduct from product_list', (error, data) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(data);
                }
            })
        })
    }
    findById=(id)=>{
        return new Promise((resolve, reject) => {
            this.connect.query(`SELECT p.*, c.nameCategory
                                    FROM product_list p JOIN category_list c ON p.categoryId = c.categoryId WHERE p.productId=${id}`, (error, data) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(data[0]);
                }
            })
        })

    }
}

module.exports = new ProductService();