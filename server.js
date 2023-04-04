const http = require('http')
const fs = require('fs')

http.createServer((req, res) => {
    if (req.method === "GET") {
        fs.readFile("./view/index.html", "utf-8", (err, indexHtml) => {
            res.write(indexHtml)
            res.end();
        })
    } else {
        let url = req.url
        let arrPath = url.split('/')
        let path = '';
        let id = -1
        if (arrPath.length > 2) {
            path = arrPath[1];
            id = arrPath[2];
        } else {
            path = arrPath[1]
        }
        let chosenHandle;
        chosenHandle(req, res, id)
    }


}).listen(8080, () => {
    console.log('server is running')
})