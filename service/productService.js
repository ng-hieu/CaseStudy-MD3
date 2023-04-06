const connection = require ('../entity/connection.js')

class ProductService {
    connect;
    constructor() {
        connection.connectingToMySQL();
        this.connect = connection.getConnection();
    }
    showAll = () => {
        return new Promise((resolve, reject) => {
            this.connect.query('select productId, nameProduct, priceProduct, quantityProduct from product_list', (error, data) => {
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
            this.connect.query(`select nameProduct,priceProduct,quantityProduct,descriptionProduct from product_list where productId=${id}`, (error, data) => {
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