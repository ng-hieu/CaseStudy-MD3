const mysql = require('mysql');

class Connection {
    MySQLConfig = {
        host: 'localhost',
        user: 'root',
        password: '123456',
        database: 'case_study_md3'
    }
    getConnection = () => {
        return mysql.createConnection(this.MySQLConfig);
    }

    connectingToMySQL = () => {
        this.getConnection().connect((error) => {
            if (error) {
                console.log(error, 'Connection unsuccessful');
            } else {
                console.log('Connection to the Database is successful');
            }
        })
    }
}

module.exports = new Connection();