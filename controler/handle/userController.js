const fs = require('fs');
const qs = require('qs');
const userSevice = require('../../service/userSevice');
const cateroryService = require('../../service/categoryService')
const cookie = require('cookie');
const productService = require("../../service/productService");

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
                    if (account[0].roleUser===1){
                        res.writeHead(301, {'location': "/home"});
                        res.end();
                    }else {
                        res.writeHead(301, {'location': "/homeAdmin"});
                        res.end();
                    }

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
    productInAdmin = (products, indexHtml) => {
            let productHtml = '';
            products.map(values => {
                productHtml +=
                    `<li>
            <div class="product-item">
                <div class="product-top">
                        <img src="${values.imageProduct}"
                             alt="">
                </div>
                <div class="product-info">
                    <a href="" class="product-cat">Bao cao su</a>
                    <a href="" class="product-name">${values.nameProduct}</a>
                    <div class="product-price">${values.priceProduct}</div>
                    <div>
                        <a type="button" href="/edit/${values.productId}">Sửa</a>
                        <button type="submit">Xóa</button>
                    </div>
                </div>
            </div>
        </li>`
            })
            indexHtml = indexHtml.replace(`{product}`, productHtml);
            return indexHtml;
        };

    showProductInAdmin = (req, res) => {
        let cookies = cookie.parse(req.headers.cookie || '');
        if (cookies.user){
            let user=JSON.parse(cookies.user);
            fs.readFile("./view/admin/homeOfAdmin.html", "utf-8", async (error, indexHtml) => {
                let products = await productService.showAll();
                indexHtml = this.productInAdmin(products, indexHtml);
                res.write(indexHtml);
                res.end();
            })
        } else {
            res.writeHead(301, {'location': "/signin"});
            res.end();
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
    editProductById = async (req, res, id) => {
        if(req.method === 'GET'){
            fs.readFile('./view/admin/editAdmin.html', 'utf-8', async (err, valueProduct) => {
                if(err){
                    console.log(err);
                } else {
                    let productNeed = await productService.findById(id);
                    let category = await cateroryService.showAll();
                    valueProduct = valueProduct.replace('{nameProduct}', productNeed.nameProduct);
                    valueProduct = valueProduct.replace('{priceProduct}', productNeed.priceProduct);
                    valueProduct = valueProduct.replace('{quantityProduct}', productNeed.quantityProduct);
                    valueProduct = valueProduct.replace('{descriptionProduct}', productNeed.descriptionProduct);
                    let htmlCategory = '';
                    category.map(item => {
                        htmlCategory += `<option value="${item.categoryId}">${item.nameCategory}</option>`
                    })
                    valueProduct = valueProduct.replace('{categories}', htmlCategory);
                    valueProduct = valueProduct.replace('{imageProduct}', productNeed.imageProduct);
                    res.write(valueProduct);
                    res.end();
                }
            })
        }
        else {
            let data = '';
            req.on('data', chunk => {
                data += chunk
            })
            req.on('end', async ()=>{
                let productEdit = qs.parse(data);
                await userSevice.editProductByAdmin(id,productEdit);
                res.writeHead(301, {'location': '/homeAdmin'})
                res.end();
            })
        }
    }
}

module.exports = new userController();