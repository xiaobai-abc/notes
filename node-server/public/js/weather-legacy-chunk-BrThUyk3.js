System.register(["./vendor-legacy-chunk-Ba7V9gec.js","./index-legacy-lGRKL1i3.js"],(function(e,n){"use strict";var r,t,a,i,s,c;return{setters:[e=>{r=e.r,t=e.j,a=e.S,i=e.p,s=e.B},e=>{c=e.a}],execute:function(){var n=document.createElement("style");n.textContent=".weatherContainer{border:1px solid red;padding:20px;height:100%}.weatherContainer .showView{margin-top:30px;background-color:#fafafa}.weatherContainer .showView .pre{white-space:pre;padding:10px;color:rgba(0,0,0,.35);line-height:1.4}\n",document.head.appendChild(n),e("default",(function(){const[e,n]=r.useState({});return t.jsxs("div",{className:"weatherContainer",children:[t.jsxs(a,{children:[t.jsx(i,{color:"arcoblue",children:"测试按钮"}),t.jsx(s,{type:"primary",onClick:function(){console.log("click"),c.get("/weather").then((e=>{c.get("/json/weather.json").then((e=>{n(e)}))}))},children:"单次测试 获取天气数据"}),t.jsx(s,{type:"primary",children:"Item2"})]}),t.jsx("div",{className:"showView",children:t.jsx("pre",{className:"pre",children:JSON.stringify(e,null,4)})})]})}))}}}));