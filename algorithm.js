{
  // 表驱动法

  const subtitleMap = new Map([
    ["表驱动法", "date0"],
    ["提早返回", "date1"],
    ["面向对象", "date2"],
    ["高阶函数", "date3"],
    ["空值判断", "date4"],
  ]);

  function choose(subtitle) {
    subtitleMap.get(subtitle);
  }
}

{
  // 后去星级
  const rate = (r) => "★★★★★☆☆☆☆☆".slice(5 - r, 10 - r);
  rate(1);
}

