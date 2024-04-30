# react

## 路由组件

| 组件名        | 作用           | 说明                                                            |
| ------------- | -------------- | --------------------------------------------------------------- |
| `<Routers>` | 一组路由       | 代替原有 `<Switch> `所有子路由都用基础的Router children来表示 |
| `<Router>`  | 基础路由       | Router是可以嵌套的，解决原有V5中严格模式                        |
| `<Link>`    | 导航组件       | 在实际页面中跳转使用                                            |
| `<Outlet/>` | 自适应渲染组件 | 根据实际路由url自动选择组件, 一般用来实现嵌套路由。             |


## hooks

| hooks名         | 作用                      | 说明                        |
| --------------- | ------------------------- | --------------------------- |
| useParams       | 返回当前参数              | 根据路径读取参数            |
| useNavigate     | 但会当前路由              | 替代useHistor,页面跳转      |
| useOutlet       | 返回根据路由生成的element |                             |
| useLocation     | 返回当前location对象      | 可以获取useNavigate里的参数 |
| useRoutes       | 同Routesa组件一样         | 生成路由配置列表            |
| useSearchParams | 同来匹配url后的参数       | queryjson                   |

## 重定向 notfound

```
 <Routes>
      <Route path="/" element={<Home />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="*" element={<NotFound />} />
    </Routes>

 
```


## 获取参数 useParams 和useSearchParams

```jsx
<Routes>
     <Route path="user" element={<Users />}>
       <Route path=":id" element={<UserDetail />} />
       <Route path="create" element={<NewUser />} />
     </Route>
   </Routes>

import { useParams } from "react-router-dom";

export default function UserDetail() {
  let params = useParams();
  return <h2>User: {params.id}</h2>;
}

 
```

### useSearchParams

```
useSearchParams 设置参数
 let [searchParams, setSearchParams] = useSearchParams();
```


### useNavigate

```jsx
 //js写法
  let navigate = useNavigate();
  function handleClick() {
    navigate("/home");
  }
  //组件写法
  function App() {
     return <Navigate to="/home" replace state={state} />;
  }
  //替代原有的go goBack和goForward
 <button onClick={() => navigate(-2)}>
    Go 2 pages back
  </button>

 
```


## 动态路由

```javascript
 function LazyElement({ routeElement }) {
   const LazyComponent = lazy(routeElement);
   return <LazyComponent />;
 }

 function wrapRoutesWithLazy(route) {
   return route.map((item, index) => {
     const tempItem = Object.assign({}, item);
     tempItem.element = <LazyElement routeElement={item.element} />;
     if (item.children) {
       tempItem.children = wrapRoutesWithLazy(item.children);
     }
    return tempItem;
   });
 }
//====================================
 function getRouter(){
	return useRoutes([])
 }
// 包装 React.lazy函数
function LazyWrapper(path) {
  const Component = lazy(() => import(`../pages${path}`))
  return (
    <Suspense fallback={<div>loading</div>}>
      <Component/>
    </Suspense>
  );
}

// 收集所有的叶子节点，生成路由信息
function genRouter(menuConfig, router) {
  menuConfig.forEach(menuItem => {
    if(!menuItem.children) {
      router.push({
        path: menuItem.path,
        element: LazyWrapper(convertPath(menuItem.path))
      })
    }else {
      genRouter(menuItem.children, router)
    }
  })
}

 


```
