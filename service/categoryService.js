const connection = require ('../entity/connection.js')

class CategoryService{
    connect;
    constructor() {
        connection.connectingToMySQL();
        this.connect = connection.getConnection();
    }
    showAll = (id) => {
        return new Promise((resolve, reject) => {
            this.connect.query(`select * from category_list where categoryId = ${id}`, (error, category)=>{
                if(error) {
                    reject(error);
                } else {
                    resolve(category);
                }
            })
        })
    }
}

module.exports = new CategoryService();