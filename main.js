// var fs = require("fs");

// var data = fs.readFileSync('input.txt');

// console.log(data.toString());

// fs.readFile('input.txt', function (err, data) {
//     if (err) return console.error(err);
//     console.log(data.toString());
// });
// console.log("程序执行结束!");

// // 引入 events 模块
// var events = require('events');
// // 创建 eventEmitter 对象
// var eventEmitter = new events.EventEmitter();

// // 创建事件处理程序
// var connectHandler = function connected() {
//    console.log('连接成功。');
  
//    // 触发 data_received 事件 
//    eventEmitter.emit('data_received');
// }

// // 绑定 connection 事件处理程序
// eventEmitter.on('connection', connectHandler);
 
// // 使用匿名函数绑定 data_received 事件
// eventEmitter.on('data_received', function(){
//    console.log('数据接收成功。');
// });

// // 触发 connection 事件 
// eventEmitter.emit('connection');

// console.log("程序执行完毕。");

// var fs = require("fs");

// fs.readFile('input.txt', function (err, data) {
//    if (err){
//       console.log(err.stack);
//       return;
//    }
//    console.log(data.toString());
// });
// console.log("程序执行完毕");

// var Hello = require('./hello');
// hello = new Hello(); 
// hello.setName('BYVoid'); 
// hello.sayHello(); 

// hello2 = new Hello(); 
// hello2.setName('Yanfeng'); 
// hello2.sayHello(); 


process.on('exit', function(code) {

  // 以下代码永远不会执行
  setTimeout(function() {
    console.log("该代码不会执行");
  }, 0);
  
  console.log('退出码为:', code);
});
console.log("程序执行结束");

console.log(process.execPath);

process.stdout.write("Hello World!" + "\n");

process.argv.forEach(function(val, index, array) {
   console.log(index + ': ' + val);
});
console.log('当前目录: ' + process.cwd());

// 输出内存使用情况
console.log(process.memoryUsage());