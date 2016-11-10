const http = require('http');
const url = require('url');

function writeempty(res){
    res.setHeader('Content-Type','text/plain');
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.writeHead(200);
    res.end('');
}

http.createServer((req,res) => {
    var pathname = url.parse(req.url).pathname;

    switch(pathname){
        case '/userinfo':
            if(req.method.toUpperCase() == 'GET'){
                res.setHeader('Content-Type','application/json');
                res.setHeader('Access-Control-Allow-Origin','*');
                res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
                res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
                res.writeHead(200);
                res.end(JSON.stringify({
                    code: 'A0001', //业务成功A0001,未登录A0002,其他错误其他
                    data: {
                        name: 'zmrdlb'
                    },
                    errmsg: 'success'
                }),'utf8');
            }else{
                writeempty(res);
            }
            break;
        default:
            writeempty(res);
            break;
    }
}).listen(8000);
