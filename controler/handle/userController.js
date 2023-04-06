const fs = require('fs');
const qs=require('qs');
const userSevice = require('../../service/userSevice');
class userController {
    signIn = (req, res) => {
        if (req.method === "GET") {
            fs.readFile("./view/sign/signIn.html", "utf-8", async (error, signInHtml) => {
                res.write(signInHtml);
                res.end();
            })
        }else {
            let data='';
            req.on('data',chunk=>{
                data+=chunk;
            })
            req.on('end',  async ()=>{
                let user = qs.parse(data);
                let account= await userSevice.getUser(user);
                if (account.length===0){
                    res.writeHead(301,{'location':"/"});
                    res.end();
                }else {
                    res.writeHead(301,{'location':"/home"});
                    res.end();
                }

            })
        }

    }
    signUp = (req, res) => {
        fs.readFile("./view/sign/signUp.html", "utf-8", async (error, signUpHtml) => {
            res.write(signUpHtml);
            res.end();
        })
    }
}

module.exports = new userController();