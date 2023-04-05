<<<<<<< HEAD
//import fs from "fs";
const fs = require('fs')
=======
const fs = require('fs')

>>>>>>> 035448d949e22890899b5b7e6f4427ab82faec63
class ProductControler {


    home = (req, res) => {
        fs.readFile("./view/index.html", "utf-8", (err, indexHtml) => {
            res.write(indexHtml)
            res.end();
        })

    }
}

module.exports = new ProductControler()