const connection = require ('../entity/connection.js')

class UserService{
    connect;
    constructor() {
        connection.connectingToMySQL();
        this.connect = connection.getConnection();
    }
    getUser = (user) => {
        return new Promise((resolve, reject) => {
            this.connect.query(`select email,password from user_list where email='${user.email}' and password='${user.password}'`, (error, user)=>{
                if(error) {
                    reject(error);
                } else {
                    resolve(user);
                }
            })
        })
    }
}

module.exports = new UserService();