const express = require('express')
const router = express.Router()
var MongoClient = require('mongodb').MongoClient;
// 引入jsonwebtoken
const jwt = require('jsonwebtoken')
const fs = require('fs')
// const secretStr = 'sdfsjfklsjfiewjwoieow'

// 根据mongodb生成的_id查询数据
var ObjectId = require('mongodb').ObjectId
var url = "mongodb://localhost:27017/";

var payload = {
    user : 'william',
    admin : true
}

router.post('/login',function(req,res){
    let name = req.body.name,
        pwd = req.body.pwd;
    var cert = fs.readFileSync('./private.key')
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("blog");
        var noSqlStr = {name:name,pwd:pwd}
        dbo.collection("userlist"). find(noSqlStr).toArray(function(err, result) { // 返回集合中所有数据
            if (err) throw err;
            // console.log(result);
            // 验证通过，服务端回传token
            if(!!result.length){
                var token = jwt.sign(payload, cert, { algorithm: 'RS256' ,expiresIn:'30s'});
                res.send({
                    status : true,
                    msg : '',
                    token : token
                })
            }          
            db.close();
        });
    });
})

// 验证jsonwebtoken是否过期的中间件，在login接口后面执行，除了login接口的请求外，其他接口都需要验证token
router.use(function jwtVerify(req, res, next) {
    let token = req.get('token')
    console.log(token)
    var cert = fs.readFileSync('./public.key');  
    // 先解密
    jwt.verify(token, cert,function(err,decoded){
        if(err || !decoded) res.send({data:null,status:false,msg:err})
        
        if(decoded.user == payload.user){
            next();
        }
        
    });
});

router.get('/search',function(req,res){
    res.send({data:'查询成功',msg:'',status:true})
})


module.exports = router