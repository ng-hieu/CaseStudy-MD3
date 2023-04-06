const fs = require('fs')
const productService = require('../../service/productService');
const cookie=require('cookie');
class ProductController {
    getHtmlProduct = (products, indexHtml) => {
        let productHtml = '';
        products.map(values => {
            productHtml += `<tr>    
                <th scope="row">${values.id}</th>
                <td>${values.name_product}</td>
                <td>${values.price}</td>
                <td>${values.quantity}</td>`
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