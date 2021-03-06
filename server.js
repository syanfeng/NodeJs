// // const http = require('http');

// // const hostname = '127.0.0.1';
// // const port = 3000;

// // const server = http.createServer((req, res) => {
// //   res.statusCode = 200;
// //   res.setHeader('Content-Type', 'text/plain');
// //   res.end('Hello World\n');
// // });

// // server.listen(port, hostname, () => {
// //   console.log(`Server running at http://${hostname}:${port}/`);
// // });


// var http = require("http");
// var url = require("url");

// function start(route) {
//   function onRequest(request, response) {
//     var pathname = url.parse(request.url).pathname;
//     console.log("Request for " + pathname + " received.");

//     route(pathname);

//     response.writeHead(200, {"Content-Type": "text/plain"});
//     response.write("Hello World");
//     response.end();
//   }

//   http.createServer(onRequest).listen(8888);
//   console.log("Server has started.");
// }

// exports.start = start;

// var http = require('http');
// var fs = require('fs');
// var url = require('url');


// // 创建服务器
// http.createServer( function (request, response) {  
//    // 解析请求，包括文件名
//    var pathname = url.parse(request.url).pathname;
   
//    // 输出请求的文件名
//    console.log("Request for " + pathname + " received.");
   
//    // 从文件系统中读取请求的文件内容
//    fs.readFile(pathname.substr(1), function (err, data) {
//       if (err) {
//          console.log(err);
//          // HTTP 状态码: 404 : NOT FOUND
//          // Content Type: text/plain
//          response.writeHead(404, {'Content-Type': 'text/html'});
//       }else{	         
//          // HTTP 状态码: 200 : OK
//          // Content Type: text/plain
//          response.writeHead(200, {'Content-Type': 'text/html'});	
         
//          // 响应文件内容
//          response.write(data.toString());		
//       }
//       //  发送响应数据
//       response.end();
//    });   
// }).listen(8081);

// // 控制台会输出以下信息
// console.log('Server running at http://127.0.0.1:8081/');


var express = require('express');
var fs = require("fs");
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')

app.use(cookieParser())

// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static('public'));

app.get('/index.html', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
})

app.post('/process_post', urlencodedParser, function (req, res) {

   // 输出 JSON 格式
   response = {
       first_name:req.body.first_name,
       last_name:req.body.last_name
   };
   console.log(response);
   res.end(JSON.stringify(response));
})


app.get('/restful/listUsers', function (req, res) {
   fs.readFile( __dirname + "/json/" + "users.json", 'utf8', function (err, data) {
       console.log( data );
       res.end( data );
   });
})

//添加的新用户数据
var user = {
   "user4" : {
      "name" : "mohit",
      "password" : "password4",
      "profession" : "teacher",
      "id": 4
   }
}

app.get('/restful/addUser', function (req, res) {
   // 读取已存在的数据
   fs.readFile( __dirname + "/json/" + "users.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       data["user4"] = user["user4"];
       console.log( data );
        fs.writeFile(__dirname + '/json/users.json', JSON.stringify(data),  function(err) {
            if (err) {
                return console.error(err);
            }
            console.log("数据写入成功！");
            console.log("--------我是分割线-------------")
            console.log("读取写入的数据！");
            fs.readFile(__dirname + "/json/" + "users.json", 'utf8', function (err, data) {
                if (err) {
                    return console.error(err);
                }
                console.log("异步读取文件数据: " + data.toString());
                res.end( JSON.stringify(data));
            });
        });
       
   });
})

app.get('/restful/showUser/:id', function (req, res) {
   // 首先我们读取已存在的用户
   fs.readFile( __dirname + "/json/" + "users.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       var user = data["user" + req.params.id] 
       console.log( user );
       res.end( JSON.stringify(user));
   });
})

app.get('/restful/deleteUser/:id', function (req, res) {

   // First read existing users.
   fs.readFile( __dirname + "/json/" + "users.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       delete data["user" + req.params.id];
       
       console.log( data );
       res.end( JSON.stringify(data));
   });
})

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("应用实例，访问地址为 http://%s:%s", host, port)

})