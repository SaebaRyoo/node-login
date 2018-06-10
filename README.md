# Quick Start
> 示例中使用的是非对称的加密方式,在服务器生成私钥，并根据私钥生成公钥，登录验证通过后将由包含私钥签名的token传给客户端，并保存
1. npm install 
2. 私钥生成：ssh-keygen -t rsa -b 2048 -f private.key
3. 公钥生成：openssl rsa -in private.key -pubout -outform PEM -out public.key
4. npm start 
