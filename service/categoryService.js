const connection = require ('../entity/connection.js')

class CategoryService{
    connect;
    constructor() {
        connection.connectingToMySQL();
        this.connect = connection.getConnection();
    }
    showAll = () => {
        return new Promise((resolve, reject) => {
            this.connect.query(`SELECT * FROM case_study_md3.category_list;`, (error, category)=>{
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