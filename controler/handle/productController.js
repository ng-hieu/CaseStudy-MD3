const fs = require('fs')
const productService = require('../../service/productService');

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
        fs.readFile("./view/index.html", "utf-8", async (error, indexHtml) => {
            let products = await productService.showAll();
            indexHtml = this.getHtmlProduct(products, indexHtml);
            res.write(indexHtml);
            res.end();
        })
    }
    signIn = (req,res) =>{
        fs.readFile("./view/sign/signIn.html", "utf-8", async (error, signInHtml) => {
            let products = await productService.showAll();
            signInHtml = this.getHtmlProduct(products, signInHtml);
            res.write(signInHtml);
            res.end();
        })
    }
    signUp = (req,res) =>{
        fs.readFile("./view/sign/signUp.html", "utf-8", async (error, signUpHtml) => {
            let products = await productService.showAll();
            signUpHtml = this.getHtmlProduct(products, signUpHtml);
            res.write(signUpHtml);
            res.end();
        })
    }
    add = (req,res,) =>{
        fs.readFile("./view/product/add.html", "utf-8", async (error, addHtml) => {
            let products = await productService.showAll();
            addHtml = this.getHtmlProduct(products, addHtml);
            res.write(addHtml);
            res.end();
        })
    }

}

module.exports = new ProductController()