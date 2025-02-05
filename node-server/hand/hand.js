const fs = require("fs");
const path = require("path");

// 定义文件夹路径和输出文件路径
const folderPath = "./h"; // 替换为你的文件夹路径
const outputFilePath = "./output.txt"; // 替换为你的输出文件路径

// 创建一个可写流来写入输出文件（在函数外部创建）
const outputStream = fs.createWriteStream(outputFilePath, { flags: 'a' }); // 'a' 表示追加模式

function readFolderSync(dir) {
  const items = fs.readdirSync(dir);

  items.forEach((item) => {
    const itemPath = path.join(dir, item);
    const stats = fs.statSync(itemPath);

    if (stats.isDirectory()) {
      // 如果是文件夹，递归读取
      readFolderSync(itemPath);
    } else if (stats.isFile()) {
      // 如果是文件，打印文件名
      console.log('读取到的文件:', itemPath);

      // 同步读取文件内容
      const data = fs.readFileSync(itemPath, 'utf8');

      // 将文件内容写入输出文件
      outputStream.write(data + '\n');
    }
  });
}

// 开始读取文件夹
readFolderSync(folderPath);

// 关闭输出流
outputStream.end();
console.log('所有文件内容已写入到', outputFilePath);