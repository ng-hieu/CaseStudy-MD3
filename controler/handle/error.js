const fs = require('fs')

class Error {
    shownotFound = (req, res) => {
        fs.readFile('./view/error/error.html', 'utf-8', (err, errorHtml) => {
            res.write(errorHtml)
            res.end()
        })
    }
}

module.exports = new Error();