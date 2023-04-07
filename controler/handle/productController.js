const fs = require('fs')
const productService = require('../../service/productService');
const cookie = require('cookie');

class ProductController {
    getHtmlProduct = (products, indexHtml) => {
        let productHtml = '';
        products.map(values => {
            productHtml += `<li>
            <div class="product-item">
                <div class="product-top">
                    <a href="/signin" class="product-thumb">
                        <img src="${values.imageProduct}"
                             alt="">
                    </a>
                    <a href="" class="shopping-cart">ADD SHOPPING CART</a>
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

    home = (req, res) => {
        let cookies = cookie.parse(req.headers.cookie || '');
        if (cookies.user){
            let user=JSON.parse(cookies.user);
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
        if (cookies.user){
            let user=JSON.parse(cookies.user);
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


    descriptionProduct=(req,res,id)=>{
        fs.readFile("./view/product/descriptionProduct.html", "utf-8", async (error, descriptionProductHtml) => {
            let products = await productService.findById(id);
            descriptionProductHtml = this.getHtmlProduct(products, descriptionProductHtml);
            res.write(descriptionProductHtml);
            res.end();
        })
    }
}

module.exports = new ProductController()