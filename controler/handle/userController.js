const fs = require('fs');
const qs = require('qs');
const userSevice = require('../../service/userSevice');
const cateroryService = require('../../service/categoryService')
const cookie = require('cookie');

class userController {
    signIn = (req, res) => {
        if (req.method === "GET") {
            fs.readFile("./view/sign/signIn.html", "utf-8", async (error, signInHtml) => {
                res.write(signInHtml);
                res.end();
            })
        } else {
            let data = '';
            req.on('data', chunk => {
                data += chunk;
            })
            req.on('end', async () => {
                let user = qs.parse(data);
                let account = await userSevice.getUser(user);
                if (account.length === 0) {
                    res.writeHead(301, {'location': "/"});
                    res.end();
                } else {
                    res.setHeader('Set-Cookie', cookie.serialize('user', JSON.stringify(account[0]), {
                        httpOnly: true,
                        maxAge: 60 * 60 * 24 * 7 // 1 week
                    }));
                    res.writeHead(301, {'location': "/home"});
                    res.end();
                }

            })
        }

    }
    signUp = (req, res) => {
        if (req.method === "GET") {
            fs.readFile("./view/sign/signUp.html", "utf-8", async (error, signUpHtml) => {
                res.write(signUpHtml);
                res.end();
            })
        } else {
            let data = '';
            req.on('data', chunk => {
                data += chunk;
            })
            req.on('end', async () => {
                let userData = qs.parse(data);
                await userSevice.addUser(userData);
                res.writeHead(301, {'location': "/signin"});
                res.end();
            })
        }
    }

    addProduct = async (req, res) => {
        if (req.method === 'GET') {
            fs.readFile('./view/admin/addProduct.html', 'utf-8', async (err, addHtml) => {
                let categories = await cateroryService.showAll()
                let htmlCategory = '';
                categories.map(item => {
                    htmlCategory += `<option value="${item.categoryId}">${item.nameCategory}</option>'`
                })
                addHtml = addHtml.replace('{categories}', htmlCategory)
                res.write(addHtml)
                res.end()
            })
        } else {
            let data = '';
            req.on('data', chuck => {
                data += chuck;
            })
            req.on('end', async () => {
                let addProduct = qs.parse(data)
                await userSevice.addProduct(addProduct)
                res.writeHead(301, {'location': '/home'})
                res.end();
            })
        }

    }

}

module.exports = new userController();