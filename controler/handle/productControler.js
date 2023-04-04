import fs from "fs";

class ProductControler {


    home = (req, res) => {
        fs.readFile("./view/index.html", "utf-8", (err, indexHtml) => {
            res.write(indexHtml)
            res.end();
        })

    }
}

module.exports = new ProductControler();