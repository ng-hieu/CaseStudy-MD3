const fs=require('fs');
const adminSevice= require('../../service/adminSevice');
const cookie = require("cookie");
class editOrderDetail {
    showOrderDetail = (req, res) => {
        if (req.method==="GET") {
            fs.readFile("./view/admin/editOrderAdmin.html", "utf-8", async (error, orderHtml) => {
                let cookies = cookie.parse(req.headers.cookie);
                let user = JSON.parse(cookies.user).userId;
                let order = await adminSevice.getOrderDetailSevice();
                orderHtml = this.getOrderDetail(order, orderHtml);
                res.write(orderHtml);
                res.end();
            })

        }
    }
    getOrderDetail = (orderData, indexHtml) => {
        let orderHtml = '';
        orderData.forEach(values => {
            orderHtml += `<tr>
            <th> id :${values.orderId}</th>
            <th> time :${values.timeOrder}</th>
            <th> total:${values.totaleCost}</th>
            <th> user ID :${values.userId}</th>                        
            <th><form method="post">           
            <a type="button"href="/deleteOrderDetail/${values.orderId}">Xóa</a>     
            </form></th>                        
        </tr>`
        })

        indexHtml = indexHtml.replace(`{orderDetailData}`, orderHtml);
        return indexHtml;
    }
    deleteOrderDetail=async (req,res,id)=> {
        console.log(id)
        await adminSevice.deleteOrderByAdmin(id);
        res.writeHead(301, {'location': '/editOrderDetail'});
        res.end();

    }
}

module.exports = new editOrderDetail();