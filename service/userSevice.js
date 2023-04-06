const connection = require('../entity/connection.js')

class UserService {
    connect;

    constructor() {
        connection.connectingToMySQL();
        this.connect = connection.getConnection();
    }

    getUser = (user) => {
        return new Promise((resolve, reject) => {
            this.connect.query(`select email, password
                                from user_list
                                where email = '${user.email}'
                                  and password = '${user.password}'`, (error, user) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(user);
                }
            })
        })
    }
    addUser = (user) => {
        return new Promise((resolve, reject) => {
            this.connect.query(`INSERT INTO \`case_study_md3\`.\`user_list\` (\`email\`, \`password\`,
                                                                              \`nameUser\`, \`ageUser\`, \`phoneUser\`,
                                                                              \`addressUser\`, \`roleUser\`)
                                VALUES ('${user.email}', '${user.password}', '${user.username}', '${user.age}',
                                        '${user.phone}', '${user.address}', '1');`, (error, user) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(user);
                }
            })
        })
    }

    addProduct = (product) => {
        return new Promise((resolve, reject) => {
            this.connect.query(`INSERT INTO \`case_study_md3\`.\`product_list\` ( \`nameProduct\`,
                                                                                 \`priceProduct\`, \`quantityProduct\`,
                                                                                 \`descriptionProduct\`, \`categoryId\`,
                                                                                 \`imageProduct\`)
                                VALUES ('${product.nameProduct}', '${product.priceProduct}', '${product.quantityProduct}', '${product.descriptionProduct}', '${product.categoryId}', '${product.image}')`,
                (error, user) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(user);
                }
            })
        })
    }


}

module.exports = new UserService();