# 杂项

## 伪元素计数器

```
counter-increment 声明计数器名称 xxx

::after{
					计数器名称
	content: counter(xxx)":";
}
```

## 元素拖拽 api

```
  // 拖拽开始
  dom.ondragstart = (e)=>{e.target}

  // 拖拽到谁身上
  dom.ondragover = (e)=>{e.target}

  // 拖拽到元素身上 只触发一次 类似 mouseenter
  dom.ondragenter = (e)=>{e.target}

  // 拖拽释放触发 table td tr 默认行为禁止触发拖拽 ondragover 上禁止默认事件就可以了
  dom.ondrop = (e)=>{}


```

## 浏览器控制台 可以选择查看 ifram 具体网页 top 选择 console 左侧

## js Label for 跳出循环

```
  outer: for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 5; j++) {
      if (j == 1) {
        break outer;
      }
    }
  }

```

## 吸附滚动 css

```
 overflow-x:scroll;
 scroll-snap-type:x mandatory;

<!-- 子元素 -->
 scroll-snap-align : start;   //对齐方式
 scroll-snap-stop : always;   //结束控制


```

## 瀑布流

```
瀑布流

column-count: 4;
column-gap: 10px;
column-count：指定列数
column-gap：列之间的差距
```

## 杂项记录

```
点击弹窗其他位置 隐藏显示
https://github.com/vue-bulma/click-outside
组件案例
https://github.com/sunzsh/vue-el-demo

wow.js
aos.js github  https://github.com/michalsnik/aos/tree/v2

////实现文件切片
FILE
new File()
第一个参数就是一个字符串数组，你可以理解就是文件内存
第二个参数就是文件名字符串
new File(["First line text", "second line text"],FileName)

.repeat(m) 返回一个新字符串，标示将源字符串重复N次

File继承了所有Blob的属性
File对象可以看做一种特殊的Blob对象

oldBlob.slice([start[,end[,contentTyoe]]])
blob 对象可以通过.slice() 得到一个新的blob对象

FormData 为序列化表单
new FormData()
data.append("key","value")
把data作为传给服务器的数据

const size = 3;
function chunkUpfn(){
	for(let i = 0;i<file.size;i+=size){
	const chunk = file.slice(i,i+size)
	}
}
=========================================================
有时候思想不要那么 死板  换个角度试试
(B站的源码  实现 左右两侧滚动  一侧到底粘性)
  var scrollTop = document.documentElement.scrollTop,
      height = dom.clientHeight,
      innerHeight = window.innerHeight;

    scrollTop + innerHeight > height ?
      e.style.
        setProperty("top",
           "".concat(Math.min(0,innerHeight - height),"px")) :
      e.style.removeProperty("top")

起初一直在想 滚动条为什么要加上屏幕高度大于 元素高度  是我把问题想复杂了
其实非常的简单  ===>
	只要考虑 元素的高度 超出屏幕的部分就可以了
		这一部分 就是 超出后 粘性要设置的top 位置 也就可以实现元素始终在底部
		而判断条件就是 元素超出屏幕的部分 就是滚动条要滚动的距离
		而如果元素比屏幕小的话 就判断那部分更小 也就是 正常结果 比较 元素的原本top位置 就可以了


		=================================================================
css  class 权重 选择器是可以叠加的
	<div class="foo">
		<style>
		.foo{}
		.foo.foo{}
		</style>
	</div>

color 颜色
	currentColor  === color
	color 可以设置为基础颜色 默认颜色 包括 (border shadow text-shadow)

每个css 属性定义的概述都指出了这个属性是
	1 默认继承的 inherited : yes
	2 还是默认不继承的 inherited : no

	position : inherit;		//默认继承
	position : initial;		//initial 关键字用于设置 CSS 属性为它的默认值，可作用于任何 CSS 样式
	position : unset
unset : 1 如果这个属性本来有从父级继承的值 (这个属性默认可以继承，且父级有定义),则将该属性重新设置为继承的值
		2 如果没有继承父级样式,则将该属性重新设置为初始值


fixed 失效
	当元素组件的transform 属性 非 none 时  容器由视口改为祖先
	根因 == 堆叠上下文 Stacking Context
	堆叠上下文是 HTML 元素的三位概念, 这些HTML 元素在一条假象的相对于面向(电脑屏幕的)视窗或者网页的用户的Z轴上延伸,HTML元素一句其自身属性按照优先级顺序占用层叠上下文的空间
	生成 Stacking Context 的元素会影响该元素得层叠关系与定位关系
目前7种方式目前都会使得position : fixed 的基准元素改变
	1 transform 属性不为none
	2 设置了 transform-style : preserve-3d
	3 perspective 值不为none的元素
	4 在will-change 中指定了任意CSS属性
	5 设置了contain: paint
	6 filter 值不为none的元素
	7 backdrop-filter 值不为none
	当我们使用CSS混合模式 滤镜同理 的时候 堆叠上下文会重新对这个使用了混合模式的元素的根节点处创建了一个独立的渲染平面 但是很可惜 这个渲染平面不支持preserve-3d的所以我们看到是一个2D的平面效果
替换元素
伪元素
 img 如果图片加载失败 伪元素就会生效
 css attr 属性 att(标签上的属性 [alt])
 在CSS 世界中 有3个属性与排版顺序相关 互有关联但作用各异

 writing-mode 定义了文本水平或垂直排布以及在块级元素中文本的行进方向
 driection 设置文本排列的方向 rtl 表示从右到左 ltr 表示从左到右
 unicode-bidi 它与direction 非常类似 两个经常一起出现 在现代计算机应用中 最常用嘞处理双向文字的算法是Unicode 双向算法
 而unicode-bodo 这个属性是用来重写这个算法额


 https://chokcoco.github.io/demo/ppt/html/YOU_DONT_KNOW_CSS.html#/
 https://chokcoco.github.io/demo/ppt/html/MAGICCSS_Version2.html#/

 动画延迟 可以使负数  提前运动


```

## github 查看代码历史

```
github.com   github.githistory.xyz  替换
```

## VUE Render 函数

```vue
/** * render 是配置项的形式 参数是和 函数 createElement * @params { 'h1' , {attr
: {},on : {}} , '节点' } * 三个参数 要生成的标签 生成元素上得属性和方法
元素内的节点 可以使 => createElement(元素) */
<script>

export default {

    render(createElement){
        return  createElemment(
            'h1',
            attr : {
                class : "a",
                id : "x",
                data : "-xxxxx"
            },
            createElemment('span',{},"内元素")
        })
    }
}
</script>
```

## css 伪元素

### ::backdrop

```
所有处于全屏模式下的元素都被放在顶级渲染层中的一个后进先出（LIFO）栈里。在视区内容被绘制在屏幕上之前，这一特殊的渲染层总是最后被渲染（因此是最上层）。当一个元素在这个栈的栈顶时，::backdrop 伪元素允许我们遮盖，装饰或完全隐藏该元素的下层文档。
video::backdrop {
  background-color: #448;
}

示例 	大概就是list头部的 点 列表标示 1. 2. 3.
ul li::marker {
  color: red;
  font-size: 1.5em;
}
<ul>
  <li>Peaches</li>
  <li>Apples</li>
  <li>Plums</li>
</ul>

```

### ::marker

```
::marker CSS pseudo-element（CSS 伪元素）选中一个 list item 的 marker box，后者通常含有一个项目符号或者数字。它作用在任何设置了display: list-item的元素或伪元素上，例如<li>和<summary>。

::marker {
  color: blue;
  font-size: 1.2em;
}



```

### ::placeholder

```
 伪元素**::placeholder**可以选择一个表单元素的占位文本 (en-US)，它允许开发者和设计师自定义占位文本 (en-US)的样式。
::placeholder {
  color: red;
  font-size: 1.5em;
}
```

### ::selection

```
::selection CSS 伪元素应用于文档中被用户高亮的部分（比如使用鼠标或其他选择设备选中的部分）
::selection {
  background-color: cyan;
}
```

## vue 中显示代码块 vue-prism-editor

```
可输入代码，并且代码语法高亮
支持编辑和不可编辑模式
提交到后端到代码内容为字符串格式

npm install vue-prism-editor

npm install prismjs

import { PrismEditor } from "vue-prism-editor";
import "vue-prism-editor/dist/prismeditor.min.css";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism-tomorrow.css";

html
<prism-editor
   class="my-editor height-300"
    v-model="code"
    aria-disabled
    :highlight="highlighter"
    line-numbers
    :readonly="false"
    :tabSize="4"
    ></prism-editor>
.

js
export default {
	 components: {
	 		PrismEditor
	 },
	 data: () => ({
	 		code: ' ',
	 }),
	 methods: {
		 	highlighter(code) {
		 		return highlight(code, languages.js); //returns html
		 	}
	 }
};


csss
<style lang="scss">
	.my-editor {
	 background: #2d2d2d;
	 color: #ccc;
	 font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
	 font-size: 14px;
	 line-height: 1.5;
	 padding: 5px;
	}

	.prism-editor__textarea:focus {
	 outline: none;
	}

	/* 非必须 */
	.height-300 {
	 	height: 300px;
	}
</style>

```

## PNPM

```
npm install pnpm -g
// 查看源
pnpm config get registry
// 切换淘宝源
pnpm config set registry https://registry.npmmirror.com/
安装
pnpm install 包名称
pnpm i 包名称
pnpm add 包名称    // -S  默认写入dependencies
pnpm add -D    // -D devDependencies
pnpm add -g    // 全局安装
移除
pnpm remove 包名称  // 移除包
pnpm remove 包名称 --global  // 移除全局包
更新
pnpm up  // 更新所有依赖项
pnpm upgrade 包  // 更新包
pnpm upgrade 包 --global  // 更新全局包
设置存储路径
pnpm config set store-dir /path/to/.pnpm-store


# 以管理员身份运行power shell
set-executionpolicy remotesigned

```

## NPM 删除 node_modules

```npm
npm install rimraf -g
rimraf node_modules

第二种方法
npm install -g remove-node-modules
remove-node-modules

清理缓存命令：

npm cache clean --force
```

## vant 在微信小程序中 引入成功 但是未显示效果

```js
"lazyCodeLoading": "requiredComponents"			//关闭app的懒加载功能
//要是无样式  就直接重新安装构建


```

## 微信小程序 组件样式隔离

```
Component({
  options: {
    styleIsolation: 'isolated'
  }
})
isolated 表示启用样式隔离，在自定义组件内外，使用 class 指定的样式将不会相互影响（一般情况下的默认值）；
apply-shared 表示页面 wxss 样式将影响到自定义组件，但自定义组件 wxss 中指定的样式不会影响页面；
shared 表示页面 wxss 样式将影响到自定义组件，自定义组件 wxss 中指定的样式也会影响页面和其他设置了 apply-shared 或 shared 的自定义组件。（这个选项在插件中不可用。）

{
  "styleIsolation": "isolated"
}



```

### 全局变量

```
const {
    BaseUrl
} = getApp().globalData;
app js
App({
    globalData: {
        BaseUrl: "https://iot.meseequick.com/api/"
    }
})
```

### 启动插槽

```
//启动插槽
 options: {
    multipleSlots: true // 在组件定义时的选项中启用多 slot 支持
  }
```

## 获取 blob 文件格式方法

```javascript
fetch(document.querySelector("img").src).then(async (res) => {
  const blob = await res.blob();
  const file = new File([blob], "name");
  console.log(file);
});
```

## 滚动条 平滑滚动

```css
scroll-behavior: smooth;
```

# 编码字符集

```
gb2312 国家标准第2312条
gbk  扩展

UTF-8 (UCS Transformation Format 8) 是万维网上最常用的字符编码。每个字符由 1 到 4 个字节表示。UTF-8 与 ASCII 向后兼容，可以表示任何标准的 Unicode 字符。

前 128 个 UTF-8 字符与前 128 个 ASCII 字符 (编号为 0-127) 精确匹配，这意味着现有的 ASCII 文本已经是有效的 UTF-8。所有其他字符都使用 2 到 4 个字节。每个字节都有一些用于编码目的的保留位。由于非 ASCII 字符需要一个以上的字节来存储，如果字节被分隔而不重组，那么它们就会有损坏的风险。

```

# CSS

## 渐变

### linear-gradient 线性渐变

```
<side-or-corner>
描述渐变线的起始点位置。它包含 to 和两个关键词：第一个指出水平位置 left or right，第二个指出垂直位置 top or bottom。关键词的先后顺序无影响，且都是可选的。 to top, to bottom, to left 和 to right 这些值会被转换成角度 0 度、180 度、270 度和 90 度。其余值会被转换为一个以向顶部中央方向为起点顺时针旋转的角度。渐变线的结束点与其起点中心对称。

<angle>
用角度值指定渐变的方向（或角度）。角度顺时针增加。

<linear-color-stop>
由一个<color>值组成，并且跟随着一个可选的终点位置（可以是一个百分比值或者是沿着渐变轴的<length>）。CSS 渐变的颜色渲染采取了与 SVG 相同的规则。

<color-hint>
颜色中转点是一个插值提示，它定义了在相邻颜色之间渐变如何进行。长度定义了在两种颜色之间的哪个点停止渐变颜色应该达到颜色过渡的中点。如果省略，颜色转换的中点是两个颜色停止之间的中点。



```

### repeating-linear-gradient 重复线性渐变

```
background-image: repeating-linear-gradient(red, yellow 10%, green 20%);
```

### radial-gradient 径向渐变

```
 background-image: radial-gradient(shape size at position, start-color, ..., last-color);

 <position>
<position> 与 background-position 或者 transform-origin 类似。如果没有指定，默认为中心点。

<ending-shape>
渐变结束时的形状。圆形（渐变的形状是一个半径不变的正圆）或椭圆形（轴对称椭圆）。默认值为椭圆。

<size>
确定渐变结束形状的大小。如果省略，则默认为最远角。它可以显式给出，也可以通过关键字给出。出于关键字定义的目的，将梯度框边缘视为在两个方向上无限延伸，而不是有限线段。

对于它们的 <size>，圆形和椭圆渐变都接受以下关键字：
```

| 关键字            | 描述                                                                                                                 |
| ----------------- | -------------------------------------------------------------------------------------------------------------------- |
| `closest-side`    | 渐变结束的边缘形状与容器距离渐变中心点最近的一边相切（圆形）或者至少与距离渐变中心点最近的垂直和水平边相切（椭圆）。 |
| `closest-corner`  | 渐变结束的边缘形状与容器距离渐变中心点最近的一个角相交。                                                             |
| `farthest-side`   | 与 closest-side 相反，边缘形状与容器距离渐变中心点最远的一边相切（或最远的垂直和水平边）。                           |
| `farthest-corner` | 渐变结束的边缘形状与容器距离渐变中心点最远的一个角相交。                                                             |

## backgdrop-filter

| 属性<br /> `<filter-function>`数据类型由下列过滤器函数之一指定的。<br />每个函数需要一个参数，如果参数无效，结果不会被改变，如同没有使用过滤器一样。 | 描述                     |
| ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| blur()                                                                                                                                               | 模糊图像                 |
| brightness()                                                                                                                                         | 让图像更明亮或更暗淡     |
| contrast()                                                                                                                                           | 增加或减少图像的对比度   |
| drop-shadow()                                                                                                                                        | 在图像后方应用投影       |
| grayscale()                                                                                                                                          | 将图像转为灰度图         |
| hue-rotate() (en-US)                                                                                                                                 | 改变图像的整体色调       |
| invert() (en-US)                                                                                                                                     | 反转图像颜色             |
| opacity()                                                                                                                                            | 改变图像透明度           |
| saturate() (en-US)                                                                                                                                   | 超饱和或去饱和输入的图像 |
| sepia() (en-US)                                                                                                                                      | 将图像转为棕褐色         |

## background-clip

| 属性        | 描述                                                |
| ----------- | --------------------------------------------------- |
| border-box  | 背景延伸至边框外沿（但是在边框下层）。              |
| padding-box | 背景延伸至内边距（padding）外沿。不会绘制到边框处。 |
| content-box | 背景被裁剪至内容区（content box）外沿。             |
| text 实验性 | 背景被裁剪成文字的前景色。                          |

## 混合模式

```
mix-blend-mode: difference
使用混合模式
使用 background-blend-mode: lighten 改变图片颜色

mix-blend-mode: normal;
    mix-blend-mode: multiply;
    mix-blend-mode: screen;
    mix-blend-mode: overlay;
    mix-blend-mode: darken;
    mix-blend-mode: lighten;
    mix-blend-mode: color-dodge;
    mix-blend-mode: color-burn;
    mix-blend-mode: hard-light;
    mix-blend-mode: soft-light;
    mix-blend-mode: difference;
    mix-blend-mode: exclusion;
    mix-blend-mode: hue;
    mix-blend-mode: saturation;
    mix-blend-mode: color;
    mix-blend-mode: luminosity;

    mix-blend-mode: initial;
    mix-blend-mode: inherit;
    mix-blend-mode: unset;


```

## shape-outside

```
shape-outside 定义了一个可以使非矩形的形状 相邻的内联内容应围绕该形状进行排版
shape-outside 裁剪路径
缺点 必须使用浮动
参数可以使 路径裁剪 渐变
```

## contain

```
contain : paint
属性诞生的目的 即是为加快页面的渲染，在非必要的区域 不渲染元素
因此如果元素不在屏幕上或以其他方式设定位不可见 则其后代不可见不被渲染

/* 关键词值 */
contain: none;
contain: strict;
contain: content;
contain: size;
contain: layout;
contain: paint;

/* 支持指定多个关键词 */
contain: size paint;
contain: size layout paint;

/* 全局值 */
contain: inherit;
contain: initial;
contain: unset;

```

| 属性    | 描述                                                                                                                                           |
| ------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| none    | 表示元素将正常渲染，没有包含规则                                                                                                               |
| strict  | 表示除了 style 外的所有的包含规则应用于这个元素。等价于 contain: size layout paint。                                                           |
| content | 表示这个元素上有除了 size 和 style 外的所有包含规则。等价于 contain: layout paint                                                              |
| size    | 表示这个元素的尺寸计算不依赖于它的子孙元素的尺寸                                                                                               |
| layout  | 表示元素外部无法影响元素内部的布局，反之亦然                                                                                                   |
| style   | 表示那些同时会影响这个元素和其子孙元素的属性，都在这个元素的包含范围内。                                                                       |
| paint   | 表示这个元素的子节点不会在它边缘外显示。如果一个元素在视窗外或因其他原因导致不可见，那么用户代理就会忽略渲染这些元素，从而能更快的渲染其它内容 |

## height width 属性 (fit-content)

```
height: fit-content;

保护了元素原始的diaplay计算值，比如li元素设置display:inline-blcck，那么前面的符号失效，::marker伪元素失效
让元素尺寸有个确定的值。有个典型的场景：绝对定位，水平垂直居中
```

## contenteditable 属性

<div contenteditable="true">  可以让内容可编辑

## **TabIndex**

```
<div class="icon-change" tabindex="-1" @blur="colorShow"></div>

TabIndex 属性：
1. html中的tabIndex属性可以设置键盘中的TAB键在控件中的移动顺序,即焦点的顺序。把控件的tabIndex属性设成1到32767的一个值，就可以把这个控件加入到TAB键的序列中。
2. 当浏览者使用TAB键在网页控件中移动时，将首先移动到具有最小tabIndex属性值的控件上，最后在具有最大tabIndex属性值的控件上结束移动。
3. 如果有两个控件的tabIndex属性相同，则以控件在html代码中出现的顺序为准。
4. 默认的tabIndex属性为 0，将排列在在所有指定tabIndex的控件之后。
5. 而若把tabIndex属性设为一个负值（如tabIndex="-1"），那么这个链接将被排除在TAB键的序列之外。
6. 注意：如果使用-1值时，onfocus与onblur事件仍被启动。

```

## 文字换行属性

```
white-space
pre-wrap 保留空白符序列  但是正常的换行
pre-line 合并空白符序列 但是保留换行符
pre 空白会被浏览器保留 在遇到换行符或者 <br> 元素时才会换行 类似HEML中的 <pre> 标签
```

## Flex

```
flex-grow  flex-shrink   flex-basis


flex-basis
该属性来设置该元素的宽度。当然，width也可以用来设置元素宽度。如果元素上同时设置了width和flex-basis,那么flex-basis会覆盖width的值。

flex-grow
该属性来设置，当父元素的宽度大于所有子元素的宽度的和时（即父元素会有剩余空间），子元素如何分配父元素的剩余空间。

flex-grow的默认值为0，意思是该元素不索取父元素的剩余空间，如果值大于0，表示索取。值越大，索取的越厉害。

flex-shrink
定义项目的缩小比例，默认值为1，注意前提是空间不足的情况下，看例子。

该属性来设置，当父元素的宽度小于所有子元素的宽度的和时（即子元素会超出父元素），子元素如何缩小自己的宽度的。
flex-shrink的默认值为1，当父元素的宽度小于所有子元素的宽度的和时，子元素的宽度会减小。值越大，减小的越厉害。如果值为0，表示不减小。

```

## Grid

```
Ï*{

	display:grid;
place-items:center垂直 center水平
	place 等同于  align justify 简写


		display : grid;
		repeat()接受两个参数，第一个参数是重复的次数，第二个参数是所要重复的值
		auto-fill

		grid-template: auto auto / auto  auto ; // rows / colums 简写

		grid-template-columns : repeat(3,1fr);//分成三等分  每份 是1fr
		grid-template-columns : 20 repeat(xx) 20;
		grid-template-columns : repeat(5,1fr 2fr);
		grid-template-columns : minmax(0,100) 1fr 1fr;


		grid-template-colums :repeat(auto-fit, minmax(200,1fr));
		auto-fill:在轨道重复过程中，尽可能多的根据元素创建轨道，如果创建的轨道数量是小数比如6.5，那么0.5就被称为剩余空间，剩余的空间不够一个轨道了，就相当于每个轨道1fr进行分配这个0.5的剩余空间，没有元素填充的空轨道不会折叠依然保留（相当于留了空白）。

    auto-fit:在轨道重复过程中，尽可能多的根据元素创建轨道，并均分不到一个轨道的剩余空间。轨道分配完以后如果轨道中没有元素则将所有没有元素填充的空轨道折叠为0，即把没有元素填充的空轨道全被分配给有元素的轨道（相当于有元素填充的轨道全部为1fr）。最后没有空轨道剩余。


		grid-auto-rows : 100px;		//正常高度
		grid-auto-flow:dense;		//空白部分后面的元素补上
		grid-auto-row:minmax(50px,auto);	//最小高度到最大高度

		grid-column-start: 1;
		grid-column-end : 5;
		grid-column  : 1/5;	// 第一条线 到 第五条线
		grid-column  : 1 / span 4;	//四列

		align-item:center| stretch;//网格填充方式 居中 默认向上 stretch填满
		justify-item:stretch;

		justify-self  align-self //具体每个网格的设置
 		grid-template:
               [header-left] "head head" 50px [header-right]
               [main-left] "nav main" 1fr [main-right]
               [footer-left] "nav foot" 150px [footer-right]
                / 180px 1fr;


		grid-area: head;
}
```

## 背景毛玻璃

```
backdrop-filter: blur(3px);



background-image: radial-gradient(transparent 1px,var(--bg-color) 1px);
    background-size: 4px 4px;
    backdrop-filter: saturate(50%) blur(4px);
```

## Filter 属性

|                       Filter                       |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       描述                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| :------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|                        none                        |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                默认值，没有效果。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
|                     blur(_px_)                     |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                给图像设置高斯模糊。"radius"一值设定高斯函数的标准差，或者是屏幕上以多少像素融在一起， 所以值越大越模糊； 如果没有设定值，则默认是 0；这个参数可设置 css 长度值，但不接受百分比值。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
|                  brightness(_%_)                   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           给图片应用一种线性乘法，使其看起来更亮或更暗。如果值是 0%，图像会全黑。值是 100%，则图像无变化。其他的值对应线性乘数效果。值超过 100%也是可以的，图像会比原来更亮。如果没有设定值，默认是 1。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
|                   contrast(_%_)                    |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         调整图像的对比度。值是 0%的话，图像会全黑。值是 100%，图像不变。值可以超过 100%，意味着会运用更低的对比。若没有设置值，默认是 1。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| drop-shadow(_h-shadow v-shadow blur spread color_) | 给图像设置一个阴影效果。阴影是合成在图像下面，可以有模糊度的，可以以特定颜色画出的遮罩图的偏移版本。 函数接受(在 CSS3 背景中定义)类型的值，除了"inset"关键字是不允许的。该函数与已有的 box-shadow box-shadow 属性很相似；不同之处在于，通过滤镜，一些浏览器为了更好的性能会提供硬件加速。`<shadow>`参数如下：`` **`<offset-x>`** **`<offset-y>`** (必须) 这是设置阴影偏移量的两个 `<length>`值. **`<offset-x>`** 设定水平方向距离. 负值会使阴影出现在元素左边. **`<offset-y>`**设定垂直距离.负值会使阴影出现在元素上方。查看** `<length>`**可能的单位. **如果两个值都是 0**, 则阴影出现在元素正后面 (如果设置了 `<blur-radius>`and/or`<spread-radius>`，会有模糊效果). **`<blur-radius>`** (可选) 这是第三个 code>`<length>`值. 值越大，越模糊，则阴影会变得更大更淡.不允许负值 若未设定，默认是 0 (则阴影的边界很锐利). **`<spread-radius>`** (可选) 这是第四个 `<length>`值. 正值会使阴影扩张和变大，负值会是阴影缩小.若未设定，默认是 0 (阴影会与元素一样大小). 注意: Webkit, 以及一些其他浏览器 不支持第四个长度，如果加了也不会渲染。 **`<color>`** (可选) 查看 `<color>`该值可能的关键字和标记。若未设定，颜色值基于浏览器。在 Gecko (Firefox), Presto (Opera)和 Trident (Internet Explorer)中， 会应用 color**color**属性的值。另外, 如果颜色值省略，WebKit 中阴影是透明的 |
|                   grayscale(_%_)                   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              将图像转换为灰度图像。值定义转换的比例。值为 100%则完全转为灰度图像，值为 0%图像无变化。值在 0%到 100%之间，则是效果的线性乘子。若未设置，值默认是 0；                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
|                 hue-rotate(_deg_)                  |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       给图像应用色相旋转。"angle"一值设定图像会被调整的色环角度值。值为 0deg，则图像无变化。若值未设置，默认值是 0deg。该值虽然没有最大值，超过 360deg 的值相当于又绕一圈。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
|                    invert(_%_)                     |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   反转输入图像。值定义转换的比例。100%的价值是完全反转。值为 0%则图像无变化。值在 0%和 100%之间，则是效果的线性乘子。 若值未设置，值默认是 0。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
|                    opacity(_%_)                    |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  转化图像的透明程度。值定义转换的比例。值为 0%则是完全透明，值为 100%则图像无变化。值在 0%和 100%之间，则是效果的线性乘子，也相当于图像样本乘以数量。 若值未设置，值默认是 1。该函数与已有的 opacity 属性很相似，不同之处在于通过 filter，一些浏览器为了提升性能会提供硬件加速。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
|                   saturate(_%_)                    |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  转换图像饱和度。值定义转换的比例。值为 0%则是完全不饱和，值为 100%则图像无变化。其他值，则是效果的线性乘子。超过 100%的值是允许的，则有更高的饱和度。 若值未设置，值默认是 1。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
|                     sepia(_%_)                     |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                将图像转换为深褐色。值定义转换的比例。值为 100%则完全是深褐色的，值为 0%图像无变化。值在 0%到 100%之间，则是效果的线性乘子。若未设置，值默认是 0；                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
|                       url()                        |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    URL 函数接受一个 XML 文件，该文件设置了 一个 SVG 滤镜，且可以包含一个锚点来指定一个具体的滤镜元素。 例如：`filter: url(svg-url#element-id)`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
|                      initial                       |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          设置属性为默认值，可参阅：[CSS initial 关键字](https://www.runoob.com/cssref/css-initial.html)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
|                      inherit                       |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         从父元素继承该属性，可参阅：[CSS inherit 关键字](https://www.runoob.com/cssref/css-inherit.html)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |

## 媒体查询

```css
@media[not|only] type [and][expr] (medua feature){
    rules
}
and  //可以将多个媒体特性连接到一起  相当于且的意思
not  //排除某个媒体特性 相当于非 的意思可以省略

/* 屏幕尺寸小于等于320px*/
@media only screen and (max-wdith:320px){
    body{
        background-color:prink;
    }
}
/* 当所有设备的宽度小于 980px 时，才会使用 import 导入 CSS 文件 */
@import url("css/media.css") all and (max-width:980px);
<!-- 当所有设备的宽度小于 980px 时，才会使用 link 链接 CSS 文件 -->
<link rel="stylesheet" href="css/media.css" media="all and (max-width:980px)" />
```

### 响应式布局

```
响应式布局：指在同一页面在不同屏幕尺寸下有不同的布局。传统的开发方式是PC端开发一套，移动端再开发一套，pad端再开发一套，而使用响应式布局只要开发一套就够了。

响应式设计与自适应设计的区别：响应式开发一套界面，通过检测视口分辨率，针对不同客户端在客户端做代码处理，来展现不同的布局和内容；自适应需要开发多套界面，通过检测视口分辨率，来判断当前访问的设备是移动端、PC端、pad端，从而请求服务层，返回不同的页面。

CSS3媒体查询可以让我们针对不同的媒体类型定义不同的样式，当重置浏览器窗口大小的过程中，页面也会根据浏览器的宽度和高度重新渲染页面。

使用了响应式布局的网站有：Bootstrap中文网、Element Plus、稀土掘金
```

### 响应式实现方式

```
媒体查询（下面具体讲解）
流体布局（float）
弹性布局（flex）
通过 JavaScript、JQuery 进行判断来显示不同的布局页面
Bootstrap 等第三方框架
```

### 媒体查询

```
媒体查询（Media Query）是CSS3新语法。
使用 @media 查询，可以针对不同的媒体类型定义不同的样式
@media 可以针对不同的屏幕尺寸设置不同的样式
使用@media才能够实现页面响应式布局


```

### type 类型

| 值     | 描述                             |
| ------ | -------------------------------- |
| all    | 用于所有设备                     |
| print  | 用于打印机和打印预览             |
| screen | 用于电脑屏幕，平板电脑，智能手机 |

### media feature 媒体特性

| 值                  | 描述                                       |
| ------------------- | ------------------------------------------ |
| max-width           |                                            |
| device-wdith        | 定义输出设备的屏幕可见宽度                 |
| device-height       |                                            |
| aspect-ratio        | 定义输出设备的页面可见区域宽度与高度的比率 |
| device-aspect-ratio | 定义输出设备的屏幕可见看宽度与高度的比率   |

## 多行文本溢出隐藏

```css
//超出两行省略号
display: -webkit-box;
overflow: hidden;
-webkit-box-orient: vertical;
line-clamp: 2;
-webkit-line-clamp: 2; //显示几行
```

# JavaScript

## 监听器 MutationObserver

```
const ob = new MutationObserver();
ob.observer(dom)
ob.disconnect()
```

## 闭包内存泄露

```
1.持有了不再需要的函数引用，会导致函数关联的词法环境无法销毁 从而导致内存泄露
2.当多个函数共享词法环境时 会导致词法环境膨胀 从而导致出现无法触达也无法回收的内存空间
```

## 对象冻结

```
Object.freeze()
参数 : 需要冻结的对象  不可对对象进行操作修改 包括原型链

Object.isFrozen() ：判断一个对象是否被冻结
```

## 宏任务-微任务

### 宏任务是由宿主(浏览器、Node)发起

| 任务(代码)                                     | 宏任务 | 环境   |
| ---------------------------------------------- | ------ | ------ |
| script                                         | 宏任务 | 浏览器 |
| 事件                                           | 宏任务 | 浏览器 |
| 网络请求(Ajax/Fetch)                           | 宏任务 | 浏览器 |
| setTimeout() 一次性定时器/setInterval() 定时器 | 宏任务 | 浏览器 |

```
setTimeout / setInterval
script 代码块
```

### 微任务

```
process.nextTick   (node)
Promise.then() catch()
Async/Await
Object.observe
```

## 预编译

```javascript
console.log()
console.table()		//打印数组 对象
console.group(aa)		//显示分组
console.log(aaa);
console.groupEnd


 预编译

 1 创建 AO 对象 activation Object
 2 找形参和变量生命 将变量和形参名作为AO属性名   值 为undefined
 3 将实参值和形参同意
 4 在函数体里面找函数声明 值赋予函数体
```

## 拖拽上传

```javascript
document.addEventListener("dragover", (e) => {
  //阻止浏览器默认事件 ，打开文件
  e.stopPropagation();
  e.preventDefault();
});

let input = document.getElementById("input");
input.onchange = (e) => {
  console.log(e);
  let file = input.files[0];

  var reader = new FileReader();
  // 将文件加载进入
  reader.readAsDataURL(file);
  reader.onload = function (e) {
    // 转换完成输出该文件base64编码
    input.value = "";
    console.log(JSON.stringify(this.result));
  };
};

// 此处定义一个drop容器(省略),并取到该元素;
const dropBox = document.querySelector("#drop");
dropBox.addEventListener("dragenter", dragEnter);
dropBox.addEventListener("dragover", dragOver);
dropBox.addEventListener("drop", drop);

function dragEnter(e) {
  e.stopPropagation();
  e.preventDefault();
}

function dragOver(e) {
  e.stopPropagation();
  e.preventDefault();
}

function drop(e) {
  // 当文件拖拽到dropBox区域时,可以在该事件取到files
  console.log(e);
  const files = e.dataTransfer.files;

  e.stopPropagation();
  e.preventDefault();

  return false;
}
```

## Promise 状态

```javascript
pending 	(进行中)
fulfilled	(已成功)
rejected	(已失败)

async created(){		//绝对是一个一个执行的  不用再试了
    let a = await http.get({url : "/api1"})
    let b = await http.get({url : "/api2"})
    console.log(a,b)
}
```

## yield

```javascript
function* countAppleSales() {
  var reset = yield i;
  //
}
var myArr = countAppleSales(); //Generator函数
myArr.next(); //返回的值	第一个yield next 是启动器  给他传参是无意义的s
myArr.next(true); //传参将覆盖 上一次yield语句的返回值 《上一次返回值》
//作用域独立
//请求实例
function* getData() {
  yield http.get({ url: "/api1" });
  yield http.get({ url: "/api2" });
}

const n = getData();
n.next().value.then((resp) => {}); //一定是会第一次完成了 再执行第二次
n.next().value.then((resp) => {});
```

## Map

| Method    | Description                  |
| --------- | ---------------------------- |
| new Map() | 创建新的 Map 对象            |
| set()     | 为 Map 对象中的键设置值      |
| get()     | 获取 Map 对象中键的值        |
| entries() | 返回 Map 对象中键/值对的数组 |
| keys()    | 返回 Map 对象中键的数组      |
| values()  | 返回 Map 对象中值的数组      |
| clear()   | 删除 Map 中的所有元素        |
| delete()  | 删除由键指定的元素           |
| has()     | 如果键存在，则返回 true      |
| forEach() | 为每个键/值对调用回调        |

# TypeScript

## Omit 去除字段 Pick 仅保留

```
interface Todo {
title : string
description : string
completed : boolead
creatledAt : number

}
// 去除 对象中 这些字段
type TodoOmited = Omit<Todo,'desctiption' | 'completed'>
仅保留 对象中 这些字段
type TodoPreview = Pick<Todo,'title' | 'createdAt'>
{
  title : "asd",
  createdAt : 53435435
}

```

## Partial 可选

```
Paratail<{}>		把对象所有属性变为可选
```

## 基础语法

```typescript
let arr: [number, string, any] = [1, "1", 1];
let a: Array<number> = [0, 1, 2, 3];

let b: { name: string; age: number } = {
  name: "小名",
  age: 123
};
let c: { name: string; [PropName: string]: any } = {
  name: "小名",
  age: 123
};
type mytype = { name: string } | { age: number }; //类型的别名
let f: mytype = {
  age: 34
};
type mytype1 = { name: string; age?: 789 }; //类型的别名
type mytype2 = number | string; //类型的别名

let d: { name: string; age?: number } = {
  name: "小名"
};

let e: (propname: number, prop1: string) => number = function (a, b) {
  let c = Number(b) as number;
  return 123;
};
let g = function (a: string, b: number): number {
  return 123;
};
function h(a: number, b: boolean): boolean {
  return Boolean("") as boolean;
}
// e = function (){

//     return 123
// }
// function sleep(a:number){
//      new Promise((resolve, reject)=>{
//         resolve("你好")
//      })
// }
// async function awaitDemo() {
//     let result = await sleep(2000);
//     console.log(result);
//  }
//  awaitDemo();

// let prom: (resolve: any, reject: any) => any;

// prom = function (resolve, reject) {
//     resolve()
// }
let p = new Promise((resolve, reject) => {
  resolve(0);
});

class Animal {
  //类
  name: string;
  static age: number; //静态的
  constructor(name: string) {
    this.name = name;
    this.a();
  }
  a() {
    console.log(this);
  }
  static b() {
    //静态方法只给类本身使用 实例不可调用
    // 静态方法只给类本身 使用 实例不可调用
  }
}

let ani: Animal = new Animal("测试");

//抽象类就是专门用来给其他类继承的
//抽象类就是专门用来给其他类继承的
abstract class Animal1 {
  //抽象类 不可 实例化
  abstract sayHello(): void; //抽象方法  必须重写重写 没有方法体 只能定义在抽象类
}

class SmallAnimal extends Animal1 {
  //继承
  constructor() {
    //只写 constructor继承会覆盖重写为父类 的构造 需要执行父类的构造
    super(); ///代表父类的构造
  }
  sayHello(): void {
    console.log("Hello Word!");
  }
}

interface myInterface {
  //接口  用来定义一个类的机构 应该包含哪些属性和方法
  name: string;
  age: number;
}

interface myInterface {
  //接口 接口可以重复定义 两个会合并
  name: string;
  sayHello(): void; //所有接口不可有实际的值 只定义结构！！！！ 抽象方法
  sayBeyBey(): number;
}

// let test1 :Array<number>;        接口就是定义了规范对类的限制
enum Gernder { //枚举
  Male = 0, //枚举 默认 就是从0 一次往下 或者指定
  Female
}
class MyClass implements myInterface {
  //实现接口 使类满足接口的要求
  readonly name: string; //只读属性
  public age: number; //public 默认值 可任意位置随意更改
  protected _xx: string; //保护属性 只能在当前类和继承类可以使用
  private sax: Gernder; //私有 只能类访问
  static a: boolean; //静态的
  sayBeyBey(): number {
    return 123;
  }
  constructor(public zz: string) {
    //语法糖 等同意 上边 定义
  }
  sayHello(): void {}
  handSax(val: number): number {
    this.sax = val;
    return this.sax;
  }
  get xx() {
    return this._xx;
  }
}
//T 类型 ，具体什么类型不知道， 但是都相同引用  然后可以在调用的时候指定类型
function fna<T>(a: T): T {
  //泛型

  return a;
}
fna(10); //TS可以自动对类型推断
fna<number>(Number("false")); //  指定泛型

function fnb<T, K>(a: T, b: K): T {
  //泛型

  return a;
}

interface Inter {
  abc: number;
}

function fnc<T extends Inter>(a: T): string {
  // 泛型 实现类 接口 结构
  return "";
}
fnc({ a: 123, abc: 123 });
```

## 映射类型

```
type Item = {
    a : number;
    b : string;
    c : boolean;
}

type T1 = {
	[P in "key1" | "key2"] : numer
}
// {key1 : number , key2 : number}
type T2 = {
	[P in "key1" | "key2"] : P   ==>  KEY
}
// {key1 : key1 , key2 : key2}
type T3 = {
	[P in "key1" | "key2"] : P  ==>  或者 拿值 Item[P]
	[P in keyof Item] : Item[P]
}
// {a : nubmer , b : string, c: boolean}

type MyPartial<User> = {
[P in keyof User]? : User[P]
}

type User = {
name : string ;
password : string
}

type UserPartial = {
	name ? : string;
	password? : string;
}



```

## ts 字面量

|  类型   |       例子        |              描述              |
| :-----: | :---------------: | :----------------------------: |
| number  |     1,-33,2.5     |            任意数字            |
| string  |       "sss"       |           任意字符串           |
| boolean |    true, false    |             布尔值             |
| 字面量  |      其本身       |  限制变量的值就是该字面量的值  |
|   any   |        \*         |            任意类型            |
| unknow  |        \*         |         类型安全的 any         |
|  void   | 空值（undefined） |      没有值(或 undefined)      |
|  never  |      没有值       |          不能是任何值          |
| object  |  {name : 'xxx'}   |         任意的 js 对象         |
|  array  |      [1,2,3]      |          任意 js 数组          |
|  tuple  |       [4,5]       | 元素，TS 新增类型 固定长度数组 |
|  enum   |     enum(A,B)     |       枚举 TS 中新增类型       |

# 缓存

## 强缓存

```

强缓存
强缓存主要使用Expires、Cache-Control 两个头字段，两者同时存在Cache-Control 优先级更高。当命中强缓存的时候，客户端不会再求，直接从缓存中读取内容，并返回HTTP状态码200。

Expires
响应头，代表该资源的过期时间。是一个GMT 格式的标准时间。

当客户端请求服务器的时候，服务器会返回资源的同时还会带上响应头Expires，表示资源的过期具体时间，如果客户端在过期时间之前再次获取该资源，就不需要再请求我服务器了，可以直接在缓存里面拿。

使用Expires强缓存优点：

1.在过期时间以内，为用户省了很多流量。
2.减少了服务器重复读取磁盘文件的压力。

使用Expires强缓存缺点
1.缓存过期以后，服务器不管文件有没有变化会再次请求服务器。

2.缓存过期时间是一个具体的时间，这个时间依赖于客户端的时间，如果时间不准确或者被改动缓存也会随之受到影响。

Cache-Control
请求/响应头，缓存控制字段，精确控制缓存策略。

为了让强缓存更精确，HTTP1.1增加了Cache-Control字段。Cache-Control既能出现在请求头又能出现在响应头，其不同的值代表不同的意思，下面我们具体分析一下。

Cache-Control 服务端参数：

1.max-age: 在多少秒内有效，是一个相对时间，这样比Expires具体的时间就更精确了。
2.s-maxage: 就是用于表示 cache 服务器上（比如 cache CDN，缓存代理服务器）的缓存的有效时间的，并只对 public 缓存有效。
3.no-cache：不使用本地强缓存。需要使用缓存协商。
4.no-store：直接禁止浏览器缓存数据，每次用户请求该资源，都会向服务器发送一个请求，每次都会下载完整的资源。
5.public：可以被所有的用户缓存，包括终端用户和中间代理服务器。
6.private：只能被终端用户的浏览器缓存，不允许中间缓存代理进行缓存，默认的。
Cache-Control 客户端参数：

1.max-stale: 5 表示客户端到代理服务器上拿缓存的时候，即使代理缓存过期了也不要紧，只要过期时间在 5 秒之内，还是可以从代理中获取的。
2.min-fresh: 5 表示代理缓存需要一定的新鲜度，不要等到缓存刚好到期再拿，一定要在到期前 5 秒之前的时间拿，否则拿不到。
3.only-if-cached 这个字段加上后表示客户端只会接受代理缓存，而不会接受源服务器的响应。如果代理缓存无效，则直接返回 504（Gateway Timeout）。
```

## 协商缓存

```
协商缓存主要有四个头字段，它们两两组合配合使用，If-Modified-Since 和 Last-Modified一组，Etag 和 If-None-Match一组，当同时存在的时候会以Etag 和 If-None-Match为主。当命中协商缓存的时候，服务器会返回HTTP状态码304，让客户端直接从本地缓存里面读取文件。

If-Modified-Since

请求头，资源最近修改时间，由浏览器告诉服务器。其实就是第一次访问服务端返回的Last-Modified的值。

Last-Modified

响应头，资源最近修改时间，由服务器告诉浏览器。

Etag

响应头，资源标识，由服务器告诉浏览器。

If-None-Match

请求头，缓存资源标识，由浏览器告诉服务器。其实就是第一次访问服务端返回的Etag的值。

If-Modified-Since 和 Last-Modified

当客户端第一次请求服务器的时候，服务端会返回一个Last-Modified响应头，该字段是一个标准时间。客户端请求服务器的时候会带上If-Modified-Since请求头字段，该字段的值就是服务器返回的Last-Modified的值。

服务器接收到请求后会比较这两个值是否一样，一样就返回304，让客户端从缓存中读取，不一样就会返回新文件给客户端并更新Last-Modified响应头字段的值。

使用If-Modified-Since 和 Last-Modified的优点：

当缓存有效时服务器不会返回文件给客户端，而是直接返回304状态码，让客户端从缓存中获取文件。大大节省了流量和带宽以及服务器的压力。

使用If-Modified-Since 和 Last-Modified的缺点：

Last-Modified 过期时间只能精确到秒。如果在同一秒既修改了文件又获取文件，客户端是获取不到最新文件的。

Etag 和 If-None-Match

为了解决文件修改时间只能精确到秒带来的问题，我们引入 Etag 响应头。Etag 是由文件修改时间与文件大小计算而成，只有当文件文件内容或修改时间变了Etag的值才会发生变化。

当客户端第一次请求服务器的时候，服务端会返回一个Etag响应头。客户端请求服务器的时候会带上If-None-Match请求头字段，该字段的值就是服务器返回的Etag的值。服务器接收到请求后会比较这两个值是否一样，一样就返回304，让客户端从缓存中读取，不一样就会返回新文件给客户端并更新Etag响应头字段的值。

使用Etag 和 If-None-Match的优点：

当缓存有效时服务器不会返回文件给客户端，而是直接返回304状态码，让客户端从缓存中获取文件。大大节省了流量和带宽以及服务器的压力。
并且解决了一秒内修改并读取的问题。
```

# VScode

## vue 文件生成模板

vscode -> 文件首选项 -> vue vue.json

ctrl + shift + p 输入 >snippets 点击 configure User Snippets 用户代码片段 javasscript.json

```vue.json
{
	"Print to console": {
		"prefix": "vue",
		"body": [
				"",
				"<template>",
				"  <div></div>",
				"</template>",
				"",
				// "<script>",
				// "export default {",
				// "  data () {",
				// "    return {",
				// "",
				// "    };",
				// "  },",
				// "",
				// "  components: {},",
				// "",
				// "  computed: {},",
				// "",
				// "  methods: {}",
				// "}",
				// "</script>",
				"<script setup>",
				"import {  } from 'vue';",
				"",
				"",
				"</script>",
				"",
				"<style lang='less' scoped>",
				"",
				"</style>"
		],
		"description": "Log output to console"
	}
}
```

## 格式化配置

```
settings.json

"vetur.format.defaultFormatter.html": "prettyhtml",

  "vetur.format.defaultFormatterOptions": {
    // prettyhtml格式化HTML；
    // prettier格式化css/less/scss/postcss/ts；
    // stylus-supremacy格式化stylus；
    // vscode自带格式化插件格式化js；
    // vetur格式化.vue文件；让不同块使用不同的格式化方案
    // ESlint：新版的ESlint支持了对.vue文件的校验。
    "js-beautify-html": {
      // "wrap_attributes": "force-expand-multiline"
      "wrap_line_length": 120, //换行长度
      "wrap_attributes": "force" //属性换行设置[auto|force|force-aligned|force-expand-multiline] ["auto"]
      // "end_with_newline": true
    }
    // "prettyhtml": {
    //     "printWidth": 900,
    //     "wrapAttributes": false,
    //     "sortAttributes": false,
    // },
  },


  /**************************************/
  /*
 * 安装插件
 * prettier、eslint、Vetur
 */
{
    "search.followSymlinks": false,
    // vscode默认启用了根据文件类型自动设置tabsize的选项
    "editor.detectIndentation": false,
    // 重新设定tabsize
    "editor.tabSize": 2,
    // 显示 markdown 中英文切换时产生的特殊字符
    "editor.renderControlCharacters": true,
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
    },
    // #让函数(名)和后面的括号之间加个空格
    "javascript.format.insertSpaceBeforeFunctionParenthesis": true,
    "javascript.format.insertSpaceAfterConstructor": true,
    // #这个按用户自身习惯选择
    // "vetur.format.defaultFormatter.html": "js-beautify-html",
    // 选择 vue 文件中 template 的格式化工具
    "vetur.format.defaultFormatter.html": "prettyhtml",
    // #让vue中的js按编辑器自带的ts格式进行格式化
    "vetur.format.defaultFormatter.js": "vscode-typescript",
    // vetur 的自定义设置
    "vetur.format.defaultFormatterOptions": {
        "prettier": {
            "singleQuote": true, //用单引号
            "semi": false //不加分号
        },
        "js-beautify-html": {
            "wrap_attributes": "force-aligned"
        }
    },
    /*  prettier的配置 */
    "prettier.printWidth": 1000, // 超过最大值换行
    "prettier.tabWidth": 4, // 缩进字节数
    "prettier.useTabs": false, // 缩进不使用tab，使用空格
    "prettier.semi": true, // 句尾添加分号
    "prettier.singleQuote": true, // 使用单引号代替双引号
    "prettier.proseWrap": "preserve", // 默认值。因为使用了一些折行敏感型的渲染器（如GitHub comment）而按照markdown文本样式进行折行
    "prettier.arrowParens": "avoid", //  (x) => {} 箭头函数参数只有一个时是否要有小括号。avoid：省略括号
    "prettier.bracketSpacing": true, // 在对象，数组括号与文字之间加空格 "{ foo: bar }"
    // "prettier.disableLanguages": ["vue"], // 不格式化vue文件，vue文件的格式化单独设置
    "prettier.endOfLine": "auto", // 结尾是 \n \r \n\r auto
    "prettier.eslintIntegration": true, //不让prettier使用eslint的代码格式进行校验
    "prettier.htmlWhitespaceSensitivity": "ignore",
    "prettier.ignorePath": ".prettierignore", // 不使用prettier格式化的文件填写在项目的.prettierignore文件中
    "prettier.jsxBracketSameLine": false, // 在jsx中把'>' 是否单独放一行
    "prettier.jsxSingleQuote": false, // 在jsx中使用单引号代替双引号
    "prettier.parser": "babylon", // 格式化的解析器，默认是babylon
    "prettier.requireConfig": false, // Require a 'prettierconfig' to format prettier
    "prettier.stylelintIntegration": false, //不让prettier使用stylelint的代码格式进行校验
    "prettier.trailingComma": "es5", // 在对象或数组最后一个元素后面是否加逗号（在ES5中加尾逗号）
    "prettier.tslintIntegration": false,
    "[vue]": {
        "editor.defaultFormatter": "Vue.volar"
    },
    "[js]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[html]": {
        "editor.defaultFormatter": "vscode.html-language-features" // 使用功能vscode 自带的格式化功能
    },
    "[json]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[javascript]": {
        "editor.formatOnSave": true,
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "editor.quickSuggestions": {
        "strings": true
    },
    "workbench.editor.enablePreview": false,
    "editor.fontFamily": "Consolas",
    "editor.fontSize": 14,
    "git.enableSmartCommit": true,
    "git.confirmSync": false,
    "git.autofetch": true,
    "explorer.confirmDelete": false,
    "security.workspace.trust.untrustedFiles": "open",
    "editor.fontLigatures": false,
    "[css]": {
        "editor.defaultFormatter": "vscode.css-language-features"
    },
    "editor.unicodeHighlight.ambiguousCharacters": false,
    "workbench.startupEditor": "none",
    "settingsSync.ignoredExtensions": []
}

```

## 在编辑器顶部的滚动过程中显示嵌套的当前作用域

```

文件 => 首选项 => 设置 =>  搜索 sticky scroll  打开

```

# vite

## 热更新 加载 缓慢

```
  -D vite-plugin-optimize-persist vite-plugin-package-config
  //只适用于2.9.1
  // vite.config.ts
import OptimizationPersist from 'vite-plugin-optimize-persist'
import PkgConfig from 'vite-plugin-package-config'

export default {
  plugins: [
    PkgConfig(),
    OptimizationPersist()
  ]
}

```

## 打包 资源分类

```
//由于是处理打包以后的资源，所以需要配置build选项
export default defineConfig({
  plugins: [
    vue(),
    styleImport({
      resolves: [VantResolve()]
    })
  ],
  resolve: {
    alias: [
      { find: '@', replacement: resolve(__dirname, 'src') }
    ]
  },
  build: {
    assetsDir: 'static',
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        project:resolve(__dirname,"project.html")
      },
      output: {
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/name-[hash].[ext]'
      }
    }
  }
})
```

## hooksuseCurrentInstance.ts // utils

```
import { ComponentInternalInstance, getCurrentInstance } from "vue";
export default function useCurrentInstance() {
  const { appContext } = getCurrentInstance() as ComponentInternalInstance;
  const proxy = appContext.config.globalProperties;
  return {
    proxy
  };
}



import hooksuseCurrentInstance from "@/utils/hooksuseCurrentInstance"
 const { proxy } =  hooksuseCurrentInstance()


```

## 引入静态资源

```
new URL(url, import.meta.url);

// Vite 不会转换这个
const imgUrl = new URL(imagePath, import.meta.url).href


/*** https://cn.vitejs.dev/guide/assets.html#importing-asset-as-url ***/
```

## 引入 path 添加别名路径引用地址

```
import path from "path"

vite.config.ts

import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import path from "path"
import { resolve } from "path"
// const path = require('path');


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  base: "./", //打包路径
  resolve: {
    // 配置路径别名
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});




```

## vite 引入全局 less 变量

```vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { TDesignResolver } from 'unplugin-vue-components/resolvers';

const path = require('path');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({		//按需引入 TD腾讯框架
      resolvers: [TDesignResolver({
        library: 'vue-next'
      })],
    }),
    Components({
      resolvers: [TDesignResolver({
        library: 'vue-next'
      })],
    })
  ],
  base: './',    //打包路径
  resolve: {
    // 配置路径别名
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {		//引入全局less变量
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        additionalData: `@import "${path.resolve(__dirname, './src/style/theme/variables.less')}";`
      }
    }
  }
})

```

## Network: use `--host` to expose

```vite.config.js
Network: use `--host` to expose
  server: {                // ← ← ← ← ← ←		添加这段代码到 vite.config.js
    host: '0.0.0.0'    // ← 新增内容 ←
  } ,
```

```package.json
--host 0.0.0.0
//在启动命令后添加这段代码
"scripts": {
  "dev": "vite --host 0.0.0.0",
  "build": "vite build",
  "serve": "vite preview --host 0.0.0.0"
}
```

## 安装

```
Vite 需要 Node.js 版本 >= 12.0.0。
Vite2
$ npm init vite@latest
$ yarn create vite
$ pnpm create vite

Vite 需要 Node.js 版本 14.18+，16+。然而，有些模板需要依赖更高的 Node 版本才能正常运行，当你的包管理器发出警告时，请注意升级你的 Node 版本。
vite3
$ npm create vite@latest
$ yarn create vite

# npm 6.x
npm create vite@latest my-vue-app --template vue

# npm 7+, extra double-dash is needed:
npm create vite@latest my-vue-app -- --template vue

# yarn
yarn create vite my-vue-app --template vue

# pnpm
pnpm create vite my-vue-app --template vue
```

# git 冲突

```
git stash
```

# React

## 扩展

### 1. setState

```
1. setState(stateChange,[callback])
	stateChange为状态改变对象 该对象可以体现出状态的更改
	callback 是可选的回调函数胡 他在状态更新完毕 界面也更新后render调用后才被调用
2. setState(updater,[callback])   函数式的setState
 	updater为返回statechange对象的函数
 	updater可以接收到state props
 	callback 是可选的回调函数 他在状态更新 界面也更新后render调用后才被调用

 如果新状态不依赖于原状态 使用对象方式
 如果状态依赖于原状态  使用函数方式
 如果需要在setState执行后获取最新的状态数据
 	要在第二个calback函数中读取
```

### 2. lazyLoad

```
路由组件的lazyLoad
通过React的lazy函数配合import() 函数动态加载路由组件  路由组件代码会被分开打包
 const login == lazy(()=>import('@/page/文件'))
通过suspense 指定加载得到路由打包文件前显示在一个自定义loading界面

import { Component, Suspense ,lazy} from 'react'

const Home = lazy(()=>import("@/page/home"))
<Suspense fallback={<h1>loading......</h1>}>
              <Switch>
                <Route path="/" exact component={Index}></Route>
                <Route path="/home" component={Home}></Route>

   				 <Redirect to="/"></Redirect>
              </Switch>
</Suspense>
```

### 3. Hook

#### 1.React Hook/Hooks

```
Hook是 react 16.8.0版本增加的新特性/新语法
可以在函数组件中使用state 以及其他的React特性
```

#### 2.三个常用

```
State Hook React.useState()
Effect Hook React.useEffect()
Ref Hook React.useRef()
```

#### Stete Hook

```
 !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 React默认组件是使用的大写字母开头，而自定义Hook函数使用的是use开头，所以我们这里需要修改有两种办法，就是将loadData修改为LoadData或者useLoadData，或者useData，这样就不会报错了。
 !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 const [value, setValue] = useState(initValue)
 useState
 	参数 第一次初始化的值 内部作缓存
 	返回值 包含2个元素数组 第一个为当前值 第二个为更新函数
 setValue 两种协防
  	setValue 参数为非函数值 直接指定新的状态值 内部用其覆盖原来的状态值
  	setValue (value=> newValue)  参数为函数 接收原来的状态值 返回新的状态值 内部用其覆盖原来的状态值

```

#### Effect Hook

```
Effect Hook 可以让你在函数组件中执行副作用操作 用于模拟类组件中的生命周期钩子
React中副作用操作
	发ajax请求数据获取
	设置订阅 启动定时器
	手动更改真是DOM
语法说明
	 useEffect(()=>{
    // 在此可以执行任何带副作用操作
    console.log('componentDidMount')
    return ()=>{ //组件卸载前执行
      // 在此做一些收尾
      console.log('componentWillUnmount')
    }
  },[value])  //这里指定的是 监听的值 回调函数只会在第一次render()后执行
```

#### Ref Hook

```
Ref Hook 可以在函数组件中存储/查找组件内的标签或任意其他数据
语法 const refContainer = useRef()
保存标签对象 React.createRef() 一样

  const inputDom = useRef()
  获取元素
```

### 4.Fragment

```
<Fragment></Fragment>
<></>
可以不用必须有一个真是的DOM跟标签    类似 template
```

### 5.Context

```
组件通信方式
创建context容器对象  必须卸载公共区域
 	const context = React.createContext()
 渲染子组件 外面包裹context.Provider
 <context.Provider value={传递数据}>这里在是子组件</context.Provider>


 后代读取数据
 类式组件
 statuc contextType = xxxContext 声明接收context
 this.context 读取context的value

 函数 类 组件都可以
 <context.Consumer>
 	{
 	value => {
 	显示的内容
 	}
 	}
 </context.Consumer>

```

6.优化 组件是否渲染

```
 shouldComponentUpdate(nextProps,nextState){

 	在这里判断值 是否改变
 	不改变的话 可以不进行 重复渲染
    return true
  }
```

# VUE

## 获取全部报错信息 定位报错位置 errorCaptured

```
生命周期
errorCaptured(err,vm,info){}
```

## VUE 内置属性 内置变量

### $data

```
vue的实例属性$data是用于获取data里数据的相当于用this获取。

//https://blog.csdn.net/letianxf/article/details/128426164
```

### $watch

```
$watch 函数实际上和配置项watch的作用是一样的，都是用来监听一个变量，区别在于：
	$watch 函数更加灵活，可以随时随地添加监听
	$watch 函数需要手动销毁，配置项watch会随组件的生命周期结束而自动销毁

 data() {
    return {
      demo: {
        num: 0
      },
      unwatch: null
    };
  },
  mounted() {
    this.unwatch = this.$watch('demo', () => {
      console.log(this.demo.num);
    }, {
      deep: true
    })
  },

   destroyed() {
    this.unwatch && this.unwatch();
  },


  第一个参数两种可能：
        传入被观察对象表达式（字符串），比如demo , demo.num
        如果表达式无法表示需要观察的内容，可以通过函数返回，比如: () => this.demo.num
        在需要取消的时候，执行 unwatch() 即可取消
```

### $el

```
获取Vue实例关联的DOM元素，$el指向当前组件template模板中的根标签
```

### $set

```
1 vue中双向数据绑定存在的问题
    受 ES5 的限制，Vue 不能检测到对象属性的添加或删除。因为 Vue 在初始化实例时将属性转为 getter/setter，所以属性必须在data 对象上 才能让 Vue.js 转换		它，才能让它是响应的。
    就像下面这样， vue并不能察觉到data上的demo对象多了一个属性add：


 解决数据没有被双向绑定我们可以使用 vm.$set 实例方法，该方法是全局方法 Vue.set 的一个别名。

1. 当你利用索引直接设置一个数组项时，例如：vm.items[indexOfItem] = newValue
2. 当你修改数组的长度时，例如：vm.items.length = newLength
3. 由于 JavaScript 的限制，Vue不能检测对象属性的添加或删除
```

### $options

```
vue实例属性$options是一个对象,可以调用vue的各个组件下的方法和数据，即new vue({})大括号内的东西，统称为options。

获取、调用data外定义的属性，this.$options.name
复用过滤器filters中的方法，this.$options.filters.xxx
一键搞定之重置data中的数据：this.xxxx= this.$options.data().xxxx; this.data = this.$options.data();

 	  // 重置某一个数据
      this.demo = this.$options.data().demo;
      // 重置整个$data
      this.data = this.$options.data();
```

### $refs

```
在vue2中，我们可以直接使用ref获取元素，也就是直接在元素上绑定ref属性，在直接使用this.$refs['自定义属性名'] 就能直接获取。$refs 是所有注册过的ref的一个集合。

 ●$refs的基本用法
    1.ref属性 加在普通元素上，用 this.refs.(ref值) 获取到的是dom元素
    2.ref属性加在子组件上，用 this.refs.(ref值) 获取到的是组件实例 ，可以使用组件的所有方法 。
    3.如果ref 是循环出来的，有多个重名，那么ref的值会是一个数组
 ●vue里的$refs属性要注意的点
    1.ref 需要在dom渲染完成后才会有，在使用的时候确保dom已经渲染完成。比如在生命周期 mounted(){} 钩子中调用，或者在 this.$nextTick(()=>{}) 中调用。
    2.$ref本身作为渲染结果被创建，在初始渲染的时候不能访问他们，是不存在的
    3.$refs不是响应式的，只在组件渲染完成后才填充

```

### $event

```
$event有下面两个作用：
	●获取原生DOM事件的事件对象
	●事件注册所传的参数(子组件向父组件传值)
```

### $emit

```
$emit实际上是发送了一个广播事件，$emit调用时可以传递两个参数$emit('eventname', data)：
    eventname：事件名称
    data：跟随事件一起传递的数据
对于如何接受$emit的广播事件有两种方案：
    使用$on方法接收广播事件：vm.$on( 'eventname', fn )
    使用自定义事件：<CT @eventname="fn($event)"></CT>。实际上自定义事件就是vue自动帮我们调用了一下vm.$on( 'eventname', fn )函数
```

### $router

```
全局的 router 实例。通过 vue 根实例中注入 router 实例，然后再注入到每个子组件，从而让整个应用都有路由功能。其中包含了很多属性和对象（比如 history 对象），任何页面也都可以调用其push(), replace(), go()等方法。
```

### $route

```
当前激活的路由的信息对象。每个对象都是局部的，可以获取当前路由的 path, name, params, query 等属性。
```

### $nextTick

```
在下次DOM更新循环结束后执行延迟回调，在修改数据之后立即使用这个方法，获取更新后的DOM。
```

# vue3

## vue-router

```router.js
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import route from './route'
/**
 * RouteRecordRaw  vueTS 的泛型 用于声明 路由配置的地方
 */

// 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单


const router = createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHashHistory(),
    routes: route, // `routes: routes` 的缩写
})


export default router




 export default [
    {
        path: '/',
        name : 'Administration',
        component: () => import('@/page/administration/administration.vue'),
        meta : {
            routeName : '项目管理'
        }
    },
]
```

## vuex

```store.js
import { createStore } from 'vuex'

// 创建一个新的 store 实例
const store = createStore({
    state() {
        return {
            minMode: 'default'
        }
    },
    actions: {     //dispatch

    },
    mutations: {		//commit

    },
    getters: {
        getMinMode(state) {
            return state.minMode
        }
    }
})

export default store



script
import {useStore} from "vuex"
cont store = useStore()
```

# Vue3 快速上手

<img src="https://user-images.githubusercontent.com/499550/93624428-53932780-f9ae-11ea-8d16-af949e16a09f.png" style="width:200px" />

## 1.Vue3 简介

- 2020 年 9 月 18 日，Vue.js 发布 3.0 版本，代号：One Piece（海贼王）
- 耗时 2 年多、[2600+次提交](https://github.com/vuejs/vue-next/graphs/commit-activity)、[30+个 RFC](https://github.com/vuejs/rfcs/tree/master/active-rfcs)、[600+次 PR](https://github.com/vuejs/vue-next/pulls?q=is%3Apr+is%3Amerged+-author%3Aapp%2Fdependabot-preview+)、[99 位贡献者](https://github.com/vuejs/vue-next/graphs/contributors)
- github 上的 tags 地址：https://github.com/vuejs/vue-next/releases/tag/v3.0.0

## 2.Vue3 带来了什么

### 1.性能的提升

- 打包大小减少 41%
- 初次渲染快 55%, 更新渲染快 133%
- 内存减少 54%

  ......

### 2.源码的升级

- 使用 Proxy 代替 defineProperty 实现响应式
- 重写虚拟 DOM 的实现和 Tree-Shaking

  ......

### 3.拥抱 TypeScript

- Vue3 可以更好的支持 TypeScript

### 4.新的特性

1. Composition API（组合 API）

   - setup 配置
   - ref 与 reactive
   - watch 与 watchEffect
   - provide 与 inject
   - ......

2. 新的内置组件

   - Fragment
   - Teleport
   - Suspense

3. 其他改变

   - 新的生命周期钩子
   - data 选项应始终被声明为一个函数
   - 移除 keyCode 支持作为 v-on 的修饰符
   - ......

# 一、创建 Vue3.0 工程

## 1.使用 vue-cli 创建

官方文档：https://cli.vuejs.org/zh/guide/creating-a-project.html#vue-create

```bash
## 查看@vue/cli版本，确保@vue/cli版本在4.5.0以上
vue --version
## 安装或者升级你的@vue/cli
npm install -g @vue/cli
## 创建
vue create vue_test
## 启动
cd vue_test
npm run serve
```

## 2.使用 vite 创建

官方文档：https://v3.cn.vuejs.org/guide/installation.html#vite

vite 官网：https://vitejs.cn

- 什么是 vite？—— 新一代前端构建工具。
- 优势如下：
  - 开发环境中，无需打包操作，可快速的冷启动。
  - 轻量快速的热重载（HMR）。
  - 真正的按需编译，不再等待整个应用编译完成。
- 传统构建 与 vite 构建对比图

<img src="https://cn.vitejs.dev/assets/bundler.37740380.png" style="width:500px;height:280px;float:left" /><img src="https://cn.vitejs.dev/assets/esm.3070012d.png" style="width:480px;height:280px" />

```bash
## 创建工程
npm init vite-app <project-name>
## 进入工程目录
cd <project-name>
## 安装依赖
npm install
## 运行
npm run dev
```

# 二、常用 Composition API

官方文档: https://v3.cn.vuejs.org/guide/composition-api-introduction.html

## 1.拉开序幕的 setup

1. 理解：Vue3.0 中一个新的配置项，值为一个函数。
2. setup 是所有 `<strong style="color:#DD5145">`Composition API（组合 API）`</strong><i style="color:gray;font-weight:bold">`“ 表演的舞台 ”`</i>`。
3. 组件中所用到的：数据、方法等等，均要配置在 setup 中。
4. setup 函数的两种返回值：
   1. 若返回一个对象，则对象中的属性、方法, 在模板中均可以直接使用。（重点关注！）
   2. `<span style="color:#aad">`若返回一个渲染函数：则可以自定义渲染内容。（了解）
5. 注意点：
   1. 尽量不要与 Vue2.x 配置混用
      - Vue2.x 配置（data、methos、computed...）中 `<strong style="color:#DD5145">`可以访问到 `</strong>`setup 中的属性、方法。
      - 但在 setup 中 `<strong style="color:#DD5145">`不能访问到 `</strong>`Vue2.x 配置（data、methos、computed...）。
      - 如果有重名, setup 优先。
   2. setup 不能是一个 async 函数，因为返回值不再是 return 的对象, 而是 promise, 模板看不到 return 对象中的属性。（后期也可以返回一个 Promise 实例，但需要 Suspense 和异步组件的配合）

## 2.ref 函数

- 作用: 定义一个响应式的数据
- 语法: `const xxx = ref(initValue)`
  - 创建一个包含响应式数据的 `<strong style="color:#DD5145">`引用对象（reference 对象，简称 ref 对象）`</strong>`。
  - JS 中操作数据： `xxx.value`
  - 模板中读取数据: 不需要.value，直接：`<div>{{xxx}}</div>`
- 备注：
  - 接收的数据可以是：基本类型、也可以是对象类型。
  - 基本类型的数据：响应式依然是靠 `Object.defineProperty()`的 `get`与 `set`完成的。
  - 对象类型的数据：内部 `<i style="color:gray;font-weight:bold">`“ 求助 ”`</i>` 了 Vue3.0 中的一个新函数—— `reactive`函数。

## 3.reactive 函数

- 作用: 定义一个 `<strong style="color:#DD5145">`对象类型 `</strong>`的响应式数据（基本类型不要用它，要用 `ref`函数）
- 语法：`const 代理对象= reactive(源对象)`接收一个对象（或数组），返回一个 `<strong style="color:#DD5145">`代理对象（Proxy 的实例对象，简称 proxy 对象）`</strong>`
- reactive 定义的响应式数据是“深层次的”。
- 内部基于 ES6 的 Proxy 实现，通过代理对象操作源对象内部数据进行操作。

## 4.Vue3.0 中的响应式原理

### vue2.x 的响应式

- 实现原理：

  - 对象类型：通过 `Object.defineProperty()`对属性的读取、修改进行拦截（数据劫持）。
  - 数组类型：通过重写更新数组的一系列方法来实现拦截。（对数组的变更方法进行了包裹）。

    ```js
    Object.defineProperty(data, "count", {
      get() {},
      set() {}
    });
    ```

- 存在问题：

  - 新增属性、删除属性, 界面不会更新。
  - 直接通过下标修改数组, 界面不会自动更新。

### Vue3.0 的响应式

- 实现原理:

  - 通过 Proxy（代理）: 拦截对象中任意属性的变化, 包括：属性值的读写、属性的添加、属性的删除等。
  - 通过 Reflect（反射）: 对源对象的属性进行操作。
  - MDN 文档中描述的 Proxy 与 Reflect：

    - Proxy：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy
    - Reflect：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect

      ```js
      new Proxy(data, {
        // 拦截读取属性值
        get(target, prop) {
          return Reflect.get(target, prop);
        },
        // 拦截设置属性值或添加新属性
        set(target, prop, value) {
          return Reflect.set(target, prop, value);
        },
        // 拦截删除属性
        deleteProperty(target, prop) {
          return Reflect.deleteProperty(target, prop);
        }
      });

      proxy.name = "tom";
      ```

## 5.reactive 对比 ref

- 从定义数据角度对比：
  - ref 用来定义：`<strong style="color:#DD5145">`基本类型数据 `</strong>`。
  - reactive 用来定义：`<strong style="color:#DD5145">`对象（或数组）类型数据 `</strong>`。
  - 备注：ref 也可以用来定义 `<strong style="color:#DD5145">`对象（或数组）类型数据 `</strong>`, 它内部会自动通过 `reactive`转为 `<strong style="color:#DD5145">`代理对象 `</strong>`。
- 从原理角度对比：
  - ref 通过 `Object.defineProperty()`的 `get`与 `set`来实现响应式（数据劫持）。
  - reactive 通过使用 `<strong style="color:#DD5145">`Proxy `</strong>`来实现响应式（数据劫持）, 并通过 `<strong style="color:#DD5145">`Reflect `</strong>`操作 `<strong style="color:orange">`源对象 `</strong>`内部的数据。
- 从使用角度对比：
  - ref 定义的数据：操作数据 `<strong style="color:#DD5145">`需要 `</strong>.value`，读取数据时模板中直接读取 `<strong style="color:#DD5145">`不需要 `</strong>.value`。
  - reactive 定义的数据：操作数据与读取数据：`<strong style="color:#DD5145">`均不需要 `</strong>.value`。

## 6.setup 的两个注意点

- setup 执行的时机
  - 在 beforeCreate 之前执行一次，this 是 undefined。
- setup 的参数
  - props：值为对象，包含：组件外部传递过来，且组件内部声明接收了的属性。
  - context：上下文对象
    - attrs: 值为对象，包含：组件外部传递过来，但没有在 props 配置中声明的属性, 相当于 `this.$attrs`。
    - slots: 收到的插槽内容, 相当于 `this.$slots`。
    - emit: 分发自定义事件的函数, 相当于 `this.$emit`。

## 7.计算属性与监视

### 1.computed 函数

- 与 Vue2.x 中 computed 配置功能一致
- 写法

  ```js
  import {computed} from 'vue'

  setup(){
      ...
  	//计算属性——简写
      let fullName = computed(()=>{
          return person.firstName + '-' + person.lastName
      })
      //计算属性——完整
      let fullName = computed({
          get(){
              return person.firstName + '-' + person.lastName
          },
          set(value){
              const nameArr = value.split('-')
              person.firstName = nameArr[0]
              person.lastName = nameArr[1]
          }
      })
  }
  ```

### 2.watch 函数

- 与 Vue2.x 中 watch 配置功能一致
- 两个小“坑”：

  - 监视 reactive 定义的响应式数据时：oldValue 无法正确获取、强制开启了深度监视（deep 配置失效）。
  - 监视 reactive 定义的响应式数据中某个属性时：deep 配置有效。

  ```js
  //情况一：监视ref定义的响应式数据
  watch(
    sum,
    (newValue, oldValue) => {
      console.log("sum变化了", newValue, oldValue);
    },
    { immediate: true }
  );

  //情况二：监视多个ref定义的响应式数据
  watch([sum, msg], (newValue, oldValue) => {
    console.log("sum或msg变化了", newValue, oldValue);
  });

  /* 情况三：监视reactive定义的响应式数据
  			若watch监视的是reactive定义的响应式数据，则无法正确获得oldValue！！
  			若watch监视的是reactive定义的响应式数据，则强制开启了深度监视 
  */
  watch(
    person,
    (newValue, oldValue) => {
      console.log("person变化了", newValue, oldValue);
    },
    { immediate: true, deep: false }
  ); //此处的deep配置不再奏效

  //情况四：监视reactive定义的响应式数据中的某个属性
  watch(
    () => person.job,
    (newValue, oldValue) => {
      console.log("person的job变化了", newValue, oldValue);
    },
    { immediate: true, deep: true }
  );

  //情况五：监视reactive定义的响应式数据中的某些属性
  watch(
    [() => person.job, () => person.name],
    (newValue, oldValue) => {
      console.log("person的job变化了", newValue, oldValue);
    },
    { immediate: true, deep: true }
  );

  //特殊情况
  watch(
    () => person.job,
    (newValue, oldValue) => {
      console.log("person的job变化了", newValue, oldValue);
    },
    { deep: true }
  ); //此处由于监视的是reactive素定义的对象中的某个属性，所以deep配置有效
  ```

### 3.watchEffect 函数

- watch 的套路是：既要指明监视的属性，也要指明监视的回调。
- watchEffect 的套路是：不用指明监视哪个属性，监视的回调中用到哪个属性，那就监视哪个属性。
- watchEffect 有点像 computed：

  - 但 computed 注重的计算出来的值（回调函数的返回值），所以必须要写返回值。
  - 而 watchEffect 更注重的是过程（回调函数的函数体），所以不用写返回值。

  ```js
  //watchEffect所指定的回调中用到的数据只要发生变化，则直接重新执行回调。
  watchEffect(() => {
    const x1 = sum.value;
    const x2 = person.age;
    console.log("watchEffect配置的回调执行了");
  });
  ```

## 8.生命周期

<div style="border:1px solid black;width:380px;float:left;margin-right:20px;"><strong>vue2.x的生命周期</strong><img src="https://cn.vuejs.org/images/lifecycle.png" alt="lifecycle_2" style="zoom:33%;width:1200px" /></div><div style="border:1px solid black;width:510px;height:985px;float:left"><strong>vue3.0的生命周期</strong><img src="https://v3.cn.vuejs.org/images/lifecycle.svg" alt="lifecycle_2" style="zoom:33%;width:2500px" /></div>

1

- Vue3.0 中可以继续使用 Vue2.x 中的生命周期钩子，但有有两个被更名：
  - `beforeDestroy`改名为 `beforeUnmount`
  - `destroyed`改名为 `unmounted`
- Vue3.0 也提供了 Composition API 形式的生命周期钩子，与 Vue2.x 中钩子对应关系如下：
  - `beforeCreate`===>`setup()`
  - `created`=======>`setup()`
  - `beforeMount` ===>`onBeforeMount`
  - `mounted`=======>`onMounted`
  - `beforeUpdate`===>`onBeforeUpdate`
  - `updated` =======>`onUpdated`
  - `beforeUnmount` ==>`onBeforeUnmount`
  - `unmounted` =====>`onUnmounted`

## 9.自定义 hook 函数

- 什么是 hook？—— 本质是一个函数，把 setup 函数中使用的 Composition API 进行了封装。
- 类似于 vue2.x 中的 mixin。
- 自定义 hook 的优势: 复用代码, 让 setup 中的逻辑更清楚易懂。

## 10.toRef

- 作用：创建一个 ref 对象，其 value 值指向另一个对象中的某个属性。
- 语法：`const name = toRef(person,'name')`
- 应用: 要将响应式对象中的某个属性单独提供给外部使用时。
- 扩展：`toRefs` 与 `toRef`功能一致，但可以批量创建多个 ref 对象，语法：`toRefs(person)`

# 三、其它 Composition API

## 1.shallowReactive 与 shallowRef

- shallowReactive：只处理对象最外层属性的响应式（浅响应式）。
- shallowRef：只处理基本数据类型的响应式, 不进行对象的响应式处理。
- 什么时候使用?

  - 如果有一个对象数据，结构比较深, 但变化时只是外层属性变化 ===> shallowReactive。
  - 如果有一个对象数据，后续功能不会修改该对象中的属性，而是生新的对象来替换 ===> shallowRef。

## 2.readonly 与 shallowReadonly

- readonly: 让一个响应式数据变为只读的（深只读）。
- shallowReadonly：让一个响应式数据变为只读的（浅只读）。
- 应用场景: 不希望数据被修改时。

## 3.toRaw 与 markRaw

- toRaw：
  - 作用：将一个由 `reactive`生成的 `<strong style="color:orange">`响应式对象 `</strong>`转为 `<strong style="color:orange">`普通对象 `</strong>`。
  - 使用场景：用于读取响应式对象对应的普通对象，对这个普通对象的所有操作，不会引起页面更新。
- markRaw：
  - 作用：标记一个对象，使其永远不会再成为响应式对象。
  - 应用场景:
    1. 有些值不应被设置为响应式的，例如复杂的第三方类库等。
    2. 当渲染具有不可变数据源的大列表时，跳过响应式转换可以提高性能。

## 4.customRef

- 作用：创建一个自定义的 ref，并对其依赖项跟踪和更新触发进行显式控制。
- 实现防抖效果：

  ```vue
  <template>
    <input type="text" v-model="keyword" />
    <h3>{{ keyword }}</h3>
  </template>

  <script>
  import { ref, customRef } from "vue";
  export default {
    name: "Demo",
    setup() {
      // let keyword = ref('hello') //使用Vue准备好的内置ref
      //自定义一个myRef
      function myRef(value, delay) {
        let timer;
        //通过customRef去实现自定义
        return customRef((track, trigger) => {
          return {
            get() {
              track(); //告诉Vue这个value值是需要被“追踪”的
              return value;
            },
            set(newValue) {
              clearTimeout(timer);
              timer = setTimeout(() => {
                value = newValue;
                trigger(); //告诉Vue去更新界面
              }, delay);
            }
          };
        });
      }
      let keyword = myRef("hello", 500); //使用程序员自定义的ref
      return {
        keyword
      };
    }
  };
  </script>
  ```

## 5.provide 与 inject

<img src="https://v3.cn.vuejs.org/images/components_provide.png" style="width:300px" />

- 作用：实现 `<strong style="color:#DD5145">`祖与后代组件间 `</strong>`通信
- 套路：父组件有一个 `provide` 选项来提供数据，后代组件有一个 `inject` 选项来开始使用这些数据
- 具体写法：

  1. 祖组件中：

     ```js
     setup(){
     	......
         let car = reactive({name:'奔驰',price:'40万'})
         provide('car',car)
         ......
     }
     ```

  2. 后代组件中：

     ```js
     setup(props,context){
     	......
         const car = inject('car')
         return {car}
     	......
     }
     ```

## 6.响应式数据的判断

- isRef: 检查一个值是否为一个 ref 对象
- isReactive: 检查一个对象是否是由 `reactive` 创建的响应式代理
- isReadonly: 检查一个对象是否是由 `readonly` 创建的只读代理
- isProxy: 检查一个对象是否是由 `reactive` 或者 `readonly` 方法创建的代理

# 四、Composition API 的优势

## 1.Options API 存在的问题

使用传统 OptionsAPI 中，新增或者修改一个需求，就需要分别在 data，methods，computed 里修改 。

<div style="width:600px;height:370px;overflow:hidden;float:left">
    <img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f84e4e2c02424d9a99862ade0a2e4114~tplv-k3u1fbpfcp-watermark.image" style="width:600px;float:left" />
</div>
<div style="width:300px;height:370px;overflow:hidden;float:left">
    <img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e5ac7e20d1784887a826f6360768a368~tplv-k3u1fbpfcp-watermark.image" style="zoom:50%;width:560px;left" /> 
</div>

## 2.Composition API 的优势

我们可以更加优雅的组织我们的代码，函数。让相关功能的代码更加有序的组织在一起。

<div style="width:500px;height:340px;overflow:hidden;float:left">
    <img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bc0be8211fc54b6c941c036791ba4efe~tplv-k3u1fbpfcp-watermark.image"style="height:360px"/>
</div>
<div style="width:430px;height:340px;overflow:hidden;float:left">
    <img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6cc55165c0e34069a75fe36f8712eb80~tplv-k3u1fbpfcp-watermark.image"style="height:360px"/>
</div>

# 五、新的组件

## 1.Fragment

- 在 Vue2 中: 组件必须有一个根标签
- 在 Vue3 中: 组件可以没有根标签, 内部会将多个标签包含在一个 Fragment 虚拟元素中
- 好处: 减少标签层级, 减小内存占用

## 2.Teleport

- 什么是 Teleport？—— `Teleport` 是一种能够将我们的 `<strong style="color:#DD5145">`组件 html 结构 `</strong>`移动到指定位置的技术。

  ```vue
  <teleport to="移动位置">
  	<div v-if="isShow" class="mask">
  		<div class="dialog">
  			<h3>我是一个弹窗</h3>
  			<button @click="isShow = false">关闭弹窗</button>
  		</div>
  	</div>
  </teleport>
  ```

## 3.Suspense

- 等待异步组件时渲染一些额外内容，让应用有更好的用户体验
- 使用步骤：

  - 异步引入组件

    ```js
    import { defineAsyncComponent } from "vue";
    const Child = defineAsyncComponent(() => import("./components/Child.vue"));
    ```

  - 使用 `Suspense`包裹组件，并配置好 `default` 与 `fallback`

    ```vue
    <template>
      <div class="app">
        <h3>我是App组件</h3>
        <Suspense>
          <template v-slot:default>
            <Child />
          </template>
          <template v-slot:fallback>
            <h3>加载中.....</h3>
          </template>
        </Suspense>
      </div>
    </template>
    ```

# 六、其他

## 1.全局 API 的转移

- Vue 2.x 有许多全局 API 和配置。

  - 例如：注册全局组件、注册全局指令等。

    ```js
    //注册全局组件
    Vue.component('MyButton', {
      data: () => ({
        count: 0
      }),
      template: '<button @click="count++">Clicked {{ count }} times.</button>'
    })

    //注册全局指令
    Vue.directive('focus', {
      inserted: el => el.focus()
    }
    ```

- Vue3.0 中对这些 API 做出了调整：

  - | 将全局的 API，即：`Vue.xxx`调整到应用实例（`app`）上 | 2.x 全局 API（`Vue`）                            | 3.x 实例 API (`app`) |
    | ---------------------------------------------------- | ------------------------------------------------ | -------------------- |
    | Vue.config.xxxx                                      | app.config.xxxx                                  |
    | Vue.config.productionTip                             | `<strong style="color:#DD5145">`移除 `</strong>` |
    | Vue.component                                        | app.component                                    |
    | Vue.directive                                        | app.directive                                    |
    | Vue.mixin                                            | app.mixin                                        |
    | Vue.use                                              | app.use                                          |
    | Vue.prototype                                        | app.config.globalProperties                      |

## 2.其他改变

- data 选项应始终被声明为一个函数。
- 过度类名的更改：

  - Vue2.x 写法

    ```css
    .v-enter,
    .v-leave-to {
      opacity: 0;
    }
    .v-leave,
    .v-enter-to {
      opacity: 1;
    }
    ```

  - Vue3.x 写法

    ```css
    .v-enter-from,
    .v-leave-to {
      opacity: 0;
    }

    .v-leave-from,
    .v-enter-to {
      opacity: 1;
    }
    ```

- `<strong style="color:#DD5145">`移除 `</strong>`keyCode 作为 v-on 的修饰符，同时也不再支持 `config.keyCodes`
- `<strong style="color:#DD5145">`移除 `</strong>v-on.native`修饰符

  - 父组件中绑定事件

    ```vue
    <my-component
      v-on:close="handleComponentEvent"
      v-on:click="handleNativeClickEvent"
    />
    ```

  - 子组件中声明自定义事件

    ```vue
    <script>
    export default {
      emits: ["close"]
    };
    </script>
    ```

- `<strong style="color:#DD5145">`移除 `</strong>`过滤器（filter）

  > 过滤器虽然这看起来很方便，但它需要一个自定义语法，打破大括号内表达式是 “只是 JavaScript” 的假设，这不仅有学习成本，而且有实现成本！建议用方法调用或计算属性去替换过滤器。

- ......
