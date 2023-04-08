const fs = require('fs')
const productService = require('../../service/productService');
const userService = require('../../service/userSevice')
const cookie = require('cookie');


class ProductController {
    getHtmlProduct = (products, indexHtml) => {
        let productHtml = '';
        products.map(values => {
            productHtml += `<li>
            <div class="product-item">
                <div class="product-top">
                    <a href="/descriptionProduct/${values.productId}" class="product-thumb">
                        <img src="${values.imageProduct}"
                             alt="">
                    </a>
                    <iframe name="dummyframe" id="dummyframe" style="display: none;"></iframe>
                    <form action="/addToCart/${values.productId}" method="post" target="dummyframe" id="form-${values.productId}">
                     <input type="number" value="${values.productId}" name="id" hidden>
                        </form>
                    <a href="#" class="shopping-cart" onclick=" document.getElementById('form-${values.productId}').submit()">ADD SHOPPING CART</a>
                </div>
                <div class="product-info">
                    <a href="" class="product-cat" > ${values.nameCategory}</a>                  
                    <a href="" class="product-name">${values.nameProduct}</a>
                    <div class="product-price">${values.priceProduct}</div>
                </div>
            </div>
        </li>`
        })

        indexHtml = indexHtml.replace(`{product}`, productHtml);
        return indexHtml;
    }
    getShoppingCart = (products, indexHtml) => {
        let productHtml = '';
        products.forEach(values => {
            productHtml += `<tr>
            <td>${values.productId}</td>
            <td>${values.nameProduct}</td>
            <td>${values.priceProduct}</td>
            <td> <img src="${values.imageProduct}" alt=""></td>
            <td>${values.descriptionProduct}</td>
             <td>
             <a href="/edit/${values.productId}" type="button" class="btn btn-outline-secondary">+</a>
                    ${values.quantity}
             <a href="/delete/${values.productId}" type="button" class="btn btn-outline-danger">-</a>
             </td>
        </tr>`
        })

        indexHtml = indexHtml.replace(`{shoppingCart}`, productHtml);
        return indexHtml;
    }

    addShoppingCart = async (req, res, id) => {
        let cookies = cookie.parse(req.headers.cookie);
        let user = JSON.parse(cookies.user).userId;
        await productService.addItemToCart(id, user)
        res.end();
    }
    showShoppingCart = (req,res)=>{
        fs.readFile("./view/product/shoppingCart.html", "utf-8", async (error, indexHtml) => {
            let cookies = cookie.parse(req.headers.cookie);
            let user = JSON.parse(cookies.user).userId;
            let products = await productService.showItemToCart(user) ;
            indexHtml = this.getShoppingCart(products, indexHtml);
            res.write(indexHtml);
            res.end();
        })
    }

    home = (req, res) => {
        let cookies = cookie.parse(req.headers.cookie || '');
        if (cookies.user) {
            let user = JSON.parse(cookies.user);
            fs.readFile("./view/index.html", "utf-8", async (error, indexHtml) => {
                let products = await productService.showAll();
                indexHtml = this.getHtmlProduct(products, indexHtml);
                res.write(indexHtml);
                res.end();
            })
        } else {
            res.writeHead(301, {'location': "/signin"});
            res.end();
        }
    }
    homeBfsign = (req, res) => {
        let cookies = cookie.parse(req.headers.cookie || '');
        if (cookies.user) {
            let user = JSON.parse(cookies.user);
            fs.readFile("./view/homeBfSign.html", "utf-8", async (error, homeBfSignHtml) => {
                let products = await productService.showAll();
                homeBfSignHtml = this.getHtmlProduct(products, homeBfSignHtml);
                res.write(homeBfSignHtml);
                res.end();
            })
        } else {
            res.writeHead(301, {'location': "/signin"});
            res.end();
        }
    }

    descriptionProduct = (req, res, id) => {
        fs.readFile("./view/product/descriptionProduct.html", "utf-8", async (error, descriptionProductHtml) => {
            let products = await productService.findById(id);
            descriptionProductHtml = descriptionProductHtml.replace("{image}", products.imageProduct)
            descriptionProductHtml = descriptionProductHtml.replace("{descriptionName}", products.nameProduct)
            descriptionProductHtml = descriptionProductHtml.replace("{descriptionPrice}", products.priceProduct)
            descriptionProductHtml = descriptionProductHtml.replace("{descriptionDescription}", products.descriptionProduct)
            descriptionProductHtml = descriptionProductHtml.replace("{descriptionQuantity}", products.quantityProduct)
            res.write(descriptionProductHtml);
            res.end();
        })
    }
}

module.exports = new ProductController()