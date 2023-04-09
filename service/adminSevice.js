const connection = require ('../entity/connection.js')
class AdminSevice{
    connect;
    constructor() {
        connection.connectingToMySQL();
        this.connect = connection.getConnection();
    }
    getOrderDetailSevice = () => {
        return new Promise((resolve, reject) => {
            this.connect.query(`SELECT * FROM case_study_md3.order_list;`, (error, orderData)=>{
                if(error) {
                    reject(error);
                } else {
                    resolve(orderData);
                }
            })
        })
    }
    deleteOrderByAdmin = (id) => {
        return new Promise((resolve, reject)=>{
            this.connect.query(`DELETE  FROM order_list WHERE (orderId = ${id});`, (err, product)=>{
                if(err){
                    reject(err)
                } else {
                    resolve(product);
                }
            })
        })
    }
}

module.exports = new AdminSevice();