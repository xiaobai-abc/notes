/**
 *  @param {File} file
 *  @param {Number} chunkSize
 *  文件切块
 */
function createChunk(file, chunkSize) {
  const result = [];
  for (let i = 0; i < file.size; i += chunkSize) {
    result.push(file.slice(i, i + chunkSize));
  }
  return result;
}

/**
 *  控制异步并发
 * @param {promise[]} ps
 * @param {number} limt    并发数量
 *  原型测试  尝试添加任务
 *  ps: 当前是一组完整的异步任务  修改为追加任务
 */

async function concurrency(ps, limt = 3) {
  const taskPool = new Set();
  const type = Object.prototype.toString.call(ps);
  if (type == "[object Array]") {
    for (const task of ps) {
      const promise = Promise.resolve(task());
      taskPool.add(promise);
      promise.then((e) => {
        taskPool.delete(promise);
      });
      if (taskPool.size >= limt) {
        await Promise.race(taskPool);
      }
    }
    return Promise.allSettled(taskPool);
  } else {
    return Promise.reject("不是数组");
  }
}

// 并发控制
function paralleTask(tasks, limt = 2) {
  return new Promise((resolve, reject) => {
    if (tasks.length === 0) {
      // 空数组
      resolve();
      return;
    }
    let nextIndex = 0; //取每个任务
    let finishTask = 0; //完成任务数量
    function _run() {
      const task = tasks[nextIndex];
      nextIndex++;
      task().then(() => {
        finishTask++;
        if (nextIndex < task.length) {
          _run();
        } else if (finishTask == task.length) {
          resolve();
        }
      });
    }

    for (let i = 0; i < limt && i < tasks.length; i++) {
      _run();
    }
  });
}

/**
 * @param {Array} list - 要迭代的数组
 * @param {Number} limit - 并发数量控制数
 * @param {Function} asyncHandle - 对`list`的每一个项的处理函数，参数为当前处理项，必须 return 一个Promise来确定是否继续进行迭代
 * @return {Promise} - 返回一个 Promise 值来确认所有数据是否迭代完成
 */
// asyncHandle 不用处理函数
let mapLimit = (list = [], limit = 3, asyncHandle) => {
  let recursion = (arr) => {
    return Promise.resolve(arr.pop()).then(() => {
      if (arr.length !== 0)
        return recursion(arr); // 数组还未迭代完，递归继续进行迭代
      else return "finish";
    });
    // return asyncHandle(arr.shift()).then(() => {
    //   if (arr.length !== 0)
    //     return recursion(arr); // 数组还未迭代完，递归继续进行迭代
    //   else return "finish";
    // });
  };

  let asyncList = []; // 正在进行的所有并发异步操作
  while (limit--) {
    asyncList.push(recursion(list));
  }
  return Promise.all(asyncList); // 所有并发异步操作都完成后，本次并发控制迭代完成
};

// 迭代
let iterobj = {
  [Symbol.iterator]() {
    // const arr = Object.keys(this);    // ==> 键
    const arrValues = Object.values(this); //value
    const iter = arr[Symbol.iterator]();
    return iter;
  },
};

/**
 * 分时函数  利用剩余空间
 *
 *
 */

{
  requestIdleCallback((idle) => {
    // idle.timeRemaining() ===> 剩余空闲时间
    // 场景 循环使用 块索引 区每一块执行
    // if(i < arr.length)
    while (idle.timeRemaining() > 0) {
      // 有剩余空间
      // 执行代码块
    }
  });
  performChunk([1, 2, 3], (task) => {
    task();
  });
  function performChunk(datas, chunkSplitor) {
    if (datas.length === 0) {
      return;
    }
    let i = 0;

    // 执行一块任务
    function _run() {
      // requestIdleCallback((idle)=>{
      //   while(idle.timeRemaining() > 0 && i < datas.length){
      //   }
      // })
      // chunkSplitor(() => {
      //   let now = new Date(); //每次执行剩余时间
      //   new Date() - now > 16;
      // });
    }
  }
}

{
  function _runTask(task) {
    const start = Date.now();
    requestAnimationFrame(() => {
      if (Date.now() - start < 16.6) {
        task();
      } else {
        _runTask(task);
      }
    });
  }
}

// test
{
  /**
   * @Description 跳出循环 跳出指定循环
   *
   */
  outer: for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 5; j++) {
      if (j == 1) {
        break outer;
      }
    }
  }
}

{
  // 从离线转为在线
  window.addEventListener("online", () => {});
  // 从在线转为离线
  window.addEventListener("offline", () => {});
  // 网络类型 兼容性很差
  navigator.connection.addEventListener("change");
}

{
  const dom = document.createElement("div");

  // 拖拽开始
  dom.ondragstart = (e) => {
    e.target;
  };

  // 拖拽到谁身上
  dom.ondragover = (e) => {
    e.target;
  };

  // 拖拽到元素身上 只触发一次 类似 mouseenter
  dom.ondragenter = (e) => {
    e.target;
  };

  // 拖拽释放触发 table td tr 默认行为禁止触发拖拽 ondragover 上禁止默认事件就可以了
  dom.ondrop = (e) => {};
}

{
  // 标签模版
  let user = {
    name: "名字",
    age: "18",
  };

  const hi = tag`xxxxx${user.name},asdasd${user.age}`;
  function tag(...arg) {
    console.log(arg); // ==> 0 ['xxxx','asdasd',''] 1 name 2 age
  }
}

{
  // 比例计算
  let range = [-10, 10];
  /**
   *
   * @param {Array} range 取值范围
   * @param {Number} value 位置数据
   * @param {Number} max 要计算的长度 length
   */
  function getRoutate(range, value, max) {
    return (value / max) * (range[1] - range[0]) + range[0];
  }
}
