const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// 设置坐标系中心点
const originX = canvas.width / 2;
const originY = canvas.height / 2;

// 清除画布
ctx.clearRect(0, 0, canvas.width, canvas.height);

// 画坐标轴
function drawAxes() {
    ctx.beginPath();
    ctx.moveTo(0, originY); // Y轴
    ctx.lineTo(canvas.width, originY);
    ctx.moveTo(originX, 0); // X轴
    ctx.lineTo(originX, canvas.height);
    ctx.strokeStyle = 'black';
    ctx.stroke();
}

// 画单个驼峰
function drawSingleHump() {
    ctx.beginPath();

    const A = 100;  // 振幅，控制驼峰的高度
    const B = Math.PI / 200; // 控制驼峰的宽度

    ctx.moveTo(originX, originY);  // 从 x=0 开始

    for (let x = 0; x <= 200; x += 1) {  // 绘制从 0 到 200 的部分
        const y = A * Math.sin(B * x);  // 计算 y = A * sin(Bx)
        ctx.lineTo(originX + x, originY - y);
    }

    ctx.strokeStyle = 'red';
    ctx.stroke();
}

// 调用函数来画出坐标轴和单个驼峰
drawAxes();
drawSingleHump();
