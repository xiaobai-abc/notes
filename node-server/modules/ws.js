const WebSocket = require("ws");

function initWs() {
  console.log("init ws");

  // 创建一个 WebSocket 服务器
  const wss = new WebSocket.Server({ port: 8889 });

  console.log("WebSocket server started on port 8889.");

  // 处理连接事件
  wss.on("connection", (ws,incoming_request) => {
    console.log(incoming_request.url);
   

    // 向客户端发送欢迎消息
    ws.send("Welcome to the WebSocket server!");

    // 处理客户端发送的消息
    ws.on("message", (message) => {
      console.log("Received: %s", message);

      // 回传收到的消息给客户端
      ws.send(`Echo: ${message}`);

      // 模拟延迟后再发送消息给客户端
      setTimeout(() => {
        ws.send("Goodbye, server!");
      }, 3000);
    });
  });
}

module.exports = {
  initWs
};
