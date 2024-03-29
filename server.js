const http = require('http')
const router = require('./controler/router')
const handleController = require('./controler/handle/error')
http.createServer((req, res) => {

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
    if (router[path]) {
        chosenHandle = router[path]
    } else {
        chosenHandle = handleController.shownotFound
    }
    chosenHandle(req, res, id);


}).listen(8080, () => {
    console.log('server 8080 is running')
})